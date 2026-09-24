'use client';

import { useMemo, useState } from 'react';
import {
  ArrowLeft, CheckCircle2, ChevronRight, CloudUpload, Copy, FileArchive,
  FileAudio2, FileImage, FileText, FileVideo2, Loader2, ShieldCheck, Trash2, UploadCloud
} from 'lucide-react';

type UploadState = 'queued' | 'uploading' | 'done' | 'error';

type UploadItem = {
  file: File;
  state: UploadState;
  progress: number;
  error?: string;
};

const CHUNK_SIZE = 3 * 1024 * 1024;

function formatBytes(value: number) {
  if (!value) return '0 B';
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  const index = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
  return `${(value / 1024 ** index).toFixed(index ? 1 : 0)} ${units[index]}`;
}

function fileIcon(file: File) {
  if (file.type.startsWith('image/')) return FileImage;
  if (file.type.startsWith('video/')) return FileVideo2;
  if (file.type.startsWith('audio/')) return FileAudio2;
  if (file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) return FileText;
  return FileArchive;
}

export default function NewProjectPage() {
  const [form, setForm] = useState({
    title: '',
    clientName: '',
    clientEmail: '',
    price: '',
    whatsapp: '',
  });
  const [items, setItems] = useState<UploadItem[]>([]);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [reviewUrl, setReviewUrl] = useState('');
  const [dragging, setDragging] = useState(false);

  const totalSize = useMemo(() => items.reduce((sum, item) => sum + item.file.size, 0), [items]);
  const uploadedCount = items.filter((item) => item.state === 'done').length;

  function addFiles(files: FileList | File[]) {
    const next = Array.from(files).map((file) => ({
      file,
      state: 'queued' as UploadState,
      progress: 0,
    }));
    setItems((current) => [...current, ...next]);
  }

  function removeFile(index: number) {
    if (busy) return;
    setItems((current) => current.filter((_, i) => i !== index));
  }

  async function jsonFetch(url: string, init?: RequestInit) {
    const response = await fetch(url, init);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.error || `Request failed (${response.status})`);
    return data;
  }

  async function uploadFile(itemIndex: number, file: File, parentId: string, slug: string) {
    setItems((current) => current.map((item, i) => i === itemIndex ? { ...item, state: 'uploading', progress: 0, error: undefined } : item));

    const session = await jsonFetch('/api/studio/upload-session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        name: file.name,
        mimeType: file.type || 'application/octet-stream',
        size: file.size,
        parentId,
      }),
    });

    const ticket = session.uploadTicket as string;
    let start = 0;
    let completed = false;

    while (start < file.size && !completed) {
      const end = Math.min(start + (session.chunkSize || CHUNK_SIZE), file.size) - 1;
      let attempt = 0;
      let advanced = false;

      while (!advanced && attempt < 3) {
        attempt += 1;
        try {
          const chunk = file.slice(start, end + 1);
          const response = await fetch('/api/studio/upload-chunk', {
            method: 'PUT',
            headers: {
              'content-type': 'application/octet-stream',
              'x-upload-ticket': ticket,
              'x-chunk-start': String(start),
              'x-chunk-end': String(end),
            },
            body: chunk,
          });

          const data = await response.json().catch(() => ({}));
          if (!response.ok) throw new Error(data.error || `Chunk failed (${response.status})`);

          start = Number(data.nextStart ?? end + 1);
          completed = Boolean(data.complete);
          advanced = true;

          setItems((current) => current.map((item, i) => i === itemIndex ? {
            ...item,
            state: completed ? 'done' : 'uploading',
            progress: Math.min(100, (start / file.size) * 100),
          } : item));
        } catch (error) {
          if (attempt >= 3) {
            try {
              const status = await jsonFetch('/api/studio/upload-status', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ uploadTicket: ticket }),
              });
              start = Number(status.nextStart || 0);
              completed = Boolean(status.complete);
              advanced = completed || start > 0;
            } catch {
              throw error;
            }
          }
        }
      }

      if (!advanced && !completed) {
        throw new Error('Could not continue this upload.');
      }
    }

    if (!completed) {
      const status = await jsonFetch('/api/studio/upload-status', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ uploadTicket: ticket }),
      });
      if (!status.complete) throw new Error('Drive upload did not finish.');
    }

    await jsonFetch('/api/studio/files', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ projectSlug: slug, fileId: (await jsonFetch('/api/studio/upload-status', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ uploadTicket: ticket }),
      })).file?.id }),
    });
  }

  async function createProject(event: React.FormEvent) {
    event.preventDefault();
    if (!form.title || !form.clientName || !form.clientEmail || !form.price) {
      setMessage('Please complete the required project details.');
      return;
    }
    if (!items.length) {
      setMessage('Add at least one client-ready file.');
      return;
    }

    setBusy(true);
    setMessage('Creating project…');
    setReviewUrl('');

    try {
      const project = await jsonFetch('/api/studio/projects', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(form),
      });

      for (let index = 0; index < items.length; index += 1) {
        setMessage(`Uploading ${index + 1} of ${items.length}: ${items[index].file.name}`);
        await uploadFile(index, items[index].file, project.driveFolderId, project.slug);
      }

      setReviewUrl(project.reviewUrl);
      setMessage('Project ready. All files are in Google Drive and the client link is ready to share.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Project creation failed.');
    } finally {
      setBusy(false);
    }
  }

  function copyLink() {
    if (reviewUrl) navigator.clipboard.writeText(reviewUrl);
  }

  return (
    <main className="page">
      <div className="glow glow-a" />
      <div className="glow glow-b" />

      <header className="topbar">
        <button className="back" onClick={() => window.location.href = '/studio'}><ArrowLeft size={16} /> Studio</button>
        <div className="brand"><span className="logo">T</span><div><b>tometu<span>.</span>studio</b><small>CLIENT DELIVERY OS</small></div></div>
        <div className="secure"><ShieldCheck size={14}/> Private workspace</div>
      </header>

      <div className="wrap">
        <div className="intro">
          <div>
            <span className="eyebrow">NEW PROJECT</span>
            <h1>Send work.<br /><em>Get it approved.</em></h1>
            <p>Create a secure client review link, upload the final assets, set the price, and let Studio handle approval, payment and delivery.</p>
          </div>
          <div className="stepper">
            {['Project','Files','Share'].map((step, index) => <div className="step" key={step}><span>{index + 1}</span><b>{step}</b>{index < 2 && <ChevronRight size={14}/>}</div>)}
          </div>
        </div>

        <form onSubmit={createProject} className="grid">
          <section className="panel details">
            <div className="panel-head"><div><span>01</span><h2>Project details</h2></div><p>What the client sees</p></div>
            <div className="fields">
              <label>Project name<input required value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. MadeSiho — Summer Drop" /></label>
              <label>Client / company<input required value={form.clientName} onChange={e=>setForm({...form,clientName:e.target.value})} placeholder="Client name" /></label>
              <label>Client email<input required type="email" value={form.clientEmail} onChange={e=>setForm({...form,clientEmail:e.target.value})} placeholder="client@example.com" /></label>
              <div className="two">
                <label>Project price<input required inputMode="decimal" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="15000" /></label>
                <label>WhatsApp number<input value={form.whatsapp} onChange={e=>setForm({...form,whatsapp:e.target.value})} placeholder="8801XXXXXXXXX" /></label>
              </div>
            </div>
          </section>

          <section className="panel files">
            <div className="panel-head"><div><span>02</span><h2>Final files</h2></div><p>{items.length} files · {formatBytes(totalSize)}</p></div>

            <label
              className={`dropzone ${dragging ? 'dragging' : ''}`}
              onDragOver={(e)=>{e.preventDefault();setDragging(true)}}
              onDragLeave={()=>setDragging(false)}
              onDrop={(e)=>{e.preventDefault();setDragging(false);if(!busy)addFiles(e.dataTransfer.files)}}
            >
              <input type="file" multiple disabled={busy} onChange={e=>e.target.files && addFiles(e.target.files)} />
              <div className="upload-icon"><CloudUpload size={24}/></div>
              <strong>Drop your final files here</strong>
              <span>or click to browse · images, PDF, MP3, MP4, PSD, PSB, AI, ZIP and more</span>
              <small>Large files upload in small resumable chunks — your browser never talks directly to Google Drive.</small>
            </label>

            {items.length > 0 && <div className="file-list">
              {items.map((item,index)=>{const Icon=fileIcon(item.file);return <div className="file-row" key={item.file.name+'-'+index}>
                <div className="file-type"><Icon size={18}/></div>
                <div className="file-info"><strong>{item.file.name}</strong><span>{formatBytes(item.file.size)} · {item.state === 'uploading' ? `Uploading ${Math.round(item.progress)}%` : item.state}</span>{item.state==='uploading'&&<div className="mini-track"><i style={{width:`${item.progress}%`}}/></div>}{item.error&&<small className="error">{item.error}</small>}</div>
                {item.state==='done'?<CheckCircle2 className="done" size={18}/>:<button type="button" className="remove" disabled={busy} onClick={()=>removeFile(index)}><Trash2 size={16}/></button>}
              </div>})}
            </div>}
          </section>

          <section className="panel share">
            <div className="share-icon"><UploadCloud size={20}/></div>
            <div><span className="eyebrow">03 · CLIENT LINK</span><h2>Ready to share</h2><p>After upload, Studio generates the review URL. The client can preview, request revisions or approve the final version.</p></div>
            {reviewUrl && <div className="link-box"><code>{reviewUrl}</code><button type="button" onClick={copyLink}><Copy size={15}/></button></div>}
            {message && <div className={`status ${reviewUrl ? 'success' : ''}`}>{busy && <Loader2 size={15} className="spin"/>}{!busy && reviewUrl && <CheckCircle2 size={15}/>}<span>{message}</span></div>}
            <button className="submit" disabled={busy}>{busy ? 'Uploading final files…' : 'Create project & upload'} <ChevronRight size={17}/></button>
          </section>
        </form>
      </div>

      <style jsx>{`
        .page{min-height:100vh;background:#07080a;color:#f7f7f8;font-family:Arial,sans-serif;position:relative;overflow:hidden}.glow{position:fixed;width:420px;height:420px;filter:blur(100px);opacity:.12;pointer-events:none}.glow-a{background:#ff6a2b;top:-180px;right:-100px}.glow-b{background:#5f5cff;bottom:-220px;left:-150px}.topbar{height:72px;border-bottom:1px solid #202126;display:flex;align-items:center;justify-content:space-between;padding:0 30px;position:relative;z-index:2;background:rgba(7,8,10,.72);backdrop-filter:blur(20px)}.back{border:1px solid #292a31;background:#111216;color:#c9cad0;border-radius:9px;height:36px;padding:0 12px;display:flex;align-items:center;gap:7px;cursor:pointer}.brand{display:flex;align-items:center;gap:10px}.logo{width:32px;height:32px;border-radius:9px;background:#f3f3f3;color:#090909;display:grid;place-items:center;font-weight:900}.brand b{font-size:13px}.brand b span{color:#ff6a2b}.brand small{display:block;color:#60626b;font-size:8px;letter-spacing:1.5px;margin-top:3px}.secure{font-size:10px;color:#6f717a;display:flex;align-items:center;gap:6px}.wrap{max-width:1180px;margin:auto;padding:54px 28px 90px;position:relative;z-index:1}.intro{display:flex;justify-content:space-between;gap:40px;align-items:flex-end;margin-bottom:30px}.eyebrow{font-size:8px;letter-spacing:2px;color:#747781;font-weight:800}.intro h1{font-size:clamp(42px,6vw,70px);line-height:.94;letter-spacing:-4px;margin:12px 0 16px}.intro h1 em{font-style:normal;color:#ff6a2b}.intro p{max-width:610px;color:#777984;font-size:13px;line-height:1.8;margin:0}.stepper{display:flex;align-items:center;gap:8px;color:#666873;white-space:nowrap}.step{display:flex;align-items:center;gap:7px;font-size:10px}.step span{width:24px;height:24px;border-radius:50%;border:1px solid #303138;display:grid;place-items:center}.step:first-child{color:#fff}.step:first-child span{background:#fff;color:#08090b;border-color:#fff}.grid{display:grid;grid-template-columns:1fr 1.18fr;gap:14px}.panel{border:1px solid #23242b;background:linear-gradient(180deg,rgba(19,20,24,.94),rgba(12,13,16,.94));border-radius:18px;padding:24px;box-shadow:0 18px 60px rgba(0,0,0,.18)}.panel-head{display:flex;justify-content:space-between;gap:20px;align-items:flex-start;margin-bottom:24px}.panel-head>div{display:flex;gap:12px;align-items:center}.panel-head>div>span{color:#ff6a2b;font-size:9px;font-weight:800}.panel h2{font-size:16px;margin:0;letter-spacing:-.4px}.panel-head p{font-size:9px;color:#555861;margin:0}.fields{display:grid;gap:16px}.fields label{font-size:9px;color:#858791;display:grid;gap:7px}.fields input{height:46px;border:1px solid #2a2b32;background:#0b0c0f;color:#f1f1f2;border-radius:10px;padding:0 13px;outline:none;font-size:12px;transition:.2s}.fields input:focus{border-color:#555862;box-shadow:0 0 0 3px rgba(255,106,43,.07)}.two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.dropzone{min-height:220px;border:1px dashed #3a3b43;border-radius:14px;background:#0b0c0f;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;cursor:pointer;transition:.2s;position:relative;overflow:hidden}.dropzone:hover,.dropzone.dragging{border-color:#ff6a2b;background:#101012}.dropzone input{position:absolute;inset:0;opacity:0;cursor:pointer}.upload-icon{width:48px;height:48px;border-radius:14px;background:#211710;color:#ff7b43;display:grid;place-items:center;margin-bottom:13px}.dropzone strong{font-size:12px}.dropzone>span{font-size:9px;color:#666973;margin-top:6px}.dropzone small{font-size:8px;line-height:1.6;color:#4e5058;max-width:330px;margin-top:12px}.file-list{display:grid;gap:7px;margin-top:12px}.file-row{display:flex;align-items:center;gap:10px;border:1px solid #24252b;background:#0d0e11;border-radius:11px;padding:10px}.file-type{width:34px;height:34px;border-radius:9px;background:#17181c;color:#a8a9b0;display:grid;place-items:center}.file-info{flex:1;min-width:0}.file-info strong,.file-info span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file-info strong{font-size:10px}.file-info span{font-size:8px;color:#60626b;margin-top:4px}.mini-track{height:3px;background:#26272d;border-radius:10px;overflow:hidden;margin-top:7px}.mini-track i{display:block;height:100%;background:#ff6a2b}.done{color:#6fd69a}.remove{border:0;background:none;color:#5d6068;cursor:pointer;padding:6px}.remove:hover{color:#ff7a75}.error{color:#ff8e88;font-size:8px}.share{grid-column:1/-1;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:15px}.share-icon{width:44px;height:44px;border-radius:13px;background:#15171d;color:#b5b6bd;display:grid;place-items:center}.share h2{margin:6px 0 5px}.share p{color:#676a73;font-size:10px;line-height:1.6;margin:0;max-width:600px}.link-box{grid-column:1/-1;display:flex;align-items:center;gap:8px;border:1px solid #303139;background:#0a0b0d;border-radius:10px;padding:9px}.link-box code{flex:1;color:#b7bac2;font-size:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.link-box button{width:34px;height:32px;border:1px solid #2d2e35;background:#15161a;color:#aaa;border-radius:7px;display:grid;place-items:center}.status{grid-column:1/-1;display:flex;align-items:center;gap:7px;color:#777983;font-size:10px}.status.success{color:#7ed99e}.submit{grid-column:1/-1;height:48px;border:0;border-radius:11px;background:#f2f2f3;color:#090a0b;font-weight:800;display:flex;justify-content:center;align-items:center;gap:8px;cursor:pointer}.submit:disabled{opacity:.6;cursor:wait}.spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}@media(max-width:900px){.intro{display:block}.stepper{margin-top:22px}.grid{grid-template-columns:1fr}.share{grid-template-columns:auto 1fr}.share .submit{grid-column:1/-1}}@media(max-width:600px){.topbar{padding:0 16px}.secure{display:none}.wrap{padding:34px 14px 60px}.intro h1{letter-spacing:-2.5px}.panel{padding:18px}.two{grid-template-columns:1fr}.stepper{overflow:auto}.share{grid-template-columns:auto 1fr}.share-icon{display:none}}
      `}</style>
    </main>
  );
}
