'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  Check, CheckCircle2, ChevronRight, Copy, Download, FileAudio2, FileImage,
  FileText, FileVideo2, MessageCircle, ShieldCheck, Sparkles, Wallet, X
} from 'lucide-react';

type FileItem = { id:string; name:string; mimeType:string; size:string; downloadUrl:string };
type Method = { name:string; accountName:string; accountNumber:string; instructions:string };
type Data = {
  project:{slug:string;title:string;clientName:string;price:string;status:string;version:string;whatsapp:string};
  files:FileItem[];
  paymentMethods:Method[];
  payment:any;
};

function formatBytes(value: string) {
  const bytes = Number(value || 0);
  if (!bytes) return '';
  const units = ['B','KB','MB','GB'];
  const i = Math.min(Math.floor(Math.log(bytes)/Math.log(1024)), units.length - 1);
  return `${(bytes / 1024 ** i).toFixed(i ? 1 : 0)} ${units[i]}`;
}

function Preview({ file }: { file: FileItem }) {
  const type = file.mimeType || '';
  const url = file.downloadUrl;

  if (type.startsWith('image/')) {
    return <div className="media image"><img src={url} alt={file.name}/></div>;
  }
  if (type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) {
    return <iframe className="pdf" src={url} title={file.name}/>;
  }
  if (type.startsWith('audio/')) {
    return <div className="media audio"><FileAudio2 size={42}/><strong>{file.name}</strong><audio controls src={url}/></div>;
  }
  if (type.startsWith('video/')) {
    return <div className="media"><video controls src={url}/></div>;
  }

  return <div className="media unsupported"><FileText size={42}/><strong>{file.name}</strong><span>Browser preview isn't available for this file type.</span><a href={url} target="_blank" rel="noreferrer"><Download size={15}/> Download</a></div>;
}

export default function ReviewClient({ slug }: { slug:string }) {
  const [data,setData] = useState<Data|null>(null);
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  const [revision,setRevision] = useState(false);
  const [message,setMessage] = useState('');
  const [approved,setApproved] = useState(false);
  const [copied,setCopied] = useState(false);
  const [form,setForm] = useState({clientName:'',clientEmail:'',method:'',trxId:'',amount:''});

  async function load() {
    const res = await fetch('/api/studio/review?slug='+encodeURIComponent(slug),{cache:'no-store'});
    const json = await res.json();
    if (!res.ok) throw new Error(json.error || 'Unable to load review');
    setData(json);
    setForm((f)=>({...f,clientName:json.project.clientName||'',amount:json.project.price||''}));
  }

  useEffect(()=>{load().catch(e=>setError(e.message));},[slug]);

  const selectedMethod = useMemo(()=>data?.paymentMethods.find(m=>m.name===form.method),[data,form.method]);
  const canPay = approved || ['approved','payment_submitted'].includes(data?.project.status || '');
  const isDelivered = data?.project.status === 'delivered';

  async function approve() {
    setBusy(true); setError('');
    try {
      const res=await fetch('/api/studio/review',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({slug,action:'approve'})});
      const json=await res.json();
      if(!res.ok) throw new Error(json.error||'Approval failed');
      setApproved(true);
      await load();
    } catch(e) { setError(e instanceof Error ? e.message : 'Approval failed'); }
    finally { setBusy(false); }
  }

  async function requestRevision() {
    if(!message.trim()){setError('Please describe the changes you need.');return;}
    setBusy(true); setError('');
    try {
      const res=await fetch('/api/studio/review',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({slug,action:'revision',message})});
      const json=await res.json();
      if(!res.ok) throw new Error(json.error||'Could not send revision');
      const text=encodeURIComponent(`Revision request for ${data?.project.title||'project'}: ${message}`);
      const number=(json.whatsapp||data?.project.whatsapp||'').replace(/\D/g,'');
      if(number) window.location.href='https://wa.me/'+number+'?text='+text;
      else setRevision(false);
    } catch(e) { setError(e instanceof Error ? e.message : 'Revision request failed'); }
    finally { setBusy(false); }
  }

  async function submitPayment(e:React.FormEvent) {
    e.preventDefault(); setBusy(true); setError('');
    try {
      const res=await fetch('/api/studio/payment',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({slug,...form})});
      const json=await res.json();
      if(!res.ok) throw new Error(json.error||'Payment submission failed');
      await load();
    } catch(e) { setError(e instanceof Error ? e.message : 'Payment submission failed'); }
    finally { setBusy(false); }
  }

  function copyReviewLink() {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(()=>setCopied(false),1500);
  }

  if(error && !data) return <main className="state-page"><div className="state-card"><ShieldCheck size={30}/><h1>Review unavailable</h1><p>{error}</p></div></main>;
  if(!data) return <main className="state-page"><div className="state-card"><Sparkles size={26}/><p>Loading your review…</p></div></main>;

  return <main className="review">
    <div className="noise"/>
    <header className="top">
      <div className="brand"><span>T</span><div><strong>tometu<span>.</span>studio</strong><small>CLIENT REVIEW</small></div></div>
      <button className="copy" onClick={copyReviewLink}>{copied?<Check size={14}/>:<Copy size={14}/>} {copied?'Copied':'Copy link'}</button>
    </header>

    <div className="wrap">
      <div className="headline">
        <div><span className="eyebrow">CLIENT REVIEW · VERSION {data.project.version}</span><h1>{data.project.title}</h1><p>Prepared for {data.project.clientName}</p></div>
        <div className="price"><span>PROJECT TOTAL</span><strong>৳ {data.project.price}</strong></div>
      </div>

      <div className="timeline">
        <div className="timeline-item active"><i>1</i><span>Review</span></div><ChevronRight size={13}/>
        <div className={`timeline-item ${canPay?'active':''}`}><i>2</i><span>Approval</span></div><ChevronRight size={13}/>
        <div className={`timeline-item ${data.payment?'active':''}`}><i>3</i><span>Payment</span></div><ChevronRight size={13}/>
        <div className={`timeline-item ${isDelivered?'active':''}`}><i>4</i><span>Delivery</span></div>
      </div>

      <section className="files">
        {data.files.length ? data.files.map((file,index)=><article className="file-card" key={file.id}>
          <div className="file-head"><div><span className="file-index">0{index+1}</span><div><strong>{file.name}</strong><small>{file.mimeType || 'File'} {formatBytes(file.size) && `· ${formatBytes(file.size)}`}</small></div></div><a href={file.downloadUrl} target="_blank" rel="noreferrer"><Download size={14}/> Download</a></div>
          <Preview file={file}/>
        </article>) : <div className="empty-file"><FileText size={28}/><span>No files have been attached yet.</span></div>}
      </section>

      {error && <div className="notice error">{error}</div>}

      {!canPay && data.project.status !== 'revision_requested' && !isDelivered && <section className="decision">
        <div><span className="eyebrow">YOUR DECISION</span><h2>Ready to approve?</h2><p>Approve the final version when everything looks right. Need something changed? Send a revision request instead.</p></div>
        <div className="decision-buttons"><button className="revision" onClick={()=>setRevision(true)}><MessageCircle size={15}/> Request revision</button><button className="approve" disabled={busy} onClick={approve}>{busy?'Saving…':<>Approve final <Check size={15}/></>}</button></div>
      </section>}

      {canPay && !isDelivered && <section className="payment">
        <div className="payment-intro"><div className="payment-icon"><Wallet size={20}/></div><div><span className="eyebrow">STEP 3 · PAYMENT</span><h2>Complete payment</h2><p>Your approval is recorded. Submit the payment details below; final files are released after verification.</p></div></div>
        {data.payment?.status==='pending' ? <div className="submitted"><CheckCircle2 size={19}/><div><strong>Payment submitted</strong><span>We&apos;ll release your files after the studio verifies the transaction.</span></div></div> :
          <form onSubmit={submitPayment} className="payment-form">
            <label>Name<input required value={form.clientName} onChange={e=>setForm({...form,clientName:e.target.value})} placeholder="Your name"/></label>
            <label>Email<input required type="email" value={form.clientEmail} onChange={e=>setForm({...form,clientEmail:e.target.value})} placeholder="you@example.com"/></label>
            <label>Payment method<select required value={form.method} onChange={e=>setForm({...form,method:e.target.value})}><option value="">Choose a method</option>{data.paymentMethods.map(m=><option key={m.name}>{m.name}</option>)}</select></label>
            {selectedMethod && <div className="method"><strong>{selectedMethod.name}</strong>{selectedMethod.accountName&&<span>Account: {selectedMethod.accountName}</span>}{selectedMethod.accountNumber&&<span>Number: {selectedMethod.accountNumber}</span>}{selectedMethod.instructions&&<span>{selectedMethod.instructions}</span>}</div>}
            <div className="two"><label>Transaction ID<input required value={form.trxId} onChange={e=>setForm({...form,trxId:e.target.value})} placeholder="e.g. TXN123456"/></label><label>Amount<input required inputMode="decimal" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})}/></label></div>
            <button className="pay-submit" disabled={busy}>{busy?'Submitting…':<>Submit payment <ChevronRight size={16}/></>}</button>
          </form>}
      </section>}

      {isDelivered && <section className="delivered"><CheckCircle2 size={22}/><div><span className="eyebrow">DELIVERED</span><h2>Your final files are on the way.</h2><p>The studio has verified your payment and sent the delivery email to your submitted address.</p></div></section>}
    </div>

    {revision && <div className="modal"><div className="modal-card"><button className="close" onClick={()=>setRevision(false)}><X size={17}/></button><span className="eyebrow">REVISION REQUEST</span><h2>What should change?</h2><p>Describe the edits clearly. Studio will save the request and open WhatsApp with your message ready to send.</p><textarea autoFocus rows={7} value={message} onChange={e=>setMessage(e.target.value)} placeholder="Example: Please make the headline larger and change the background to a lighter blue."/><button className="approve" disabled={busy} onClick={requestRevision}><MessageCircle size={15}/> Open WhatsApp</button></div></div>}

    <style jsx>{`
      .review{min-height:100vh;background:#07080a;color:#f5f5f6;font-family:Arial,sans-serif}.noise{position:fixed;inset:0;pointer-events:none;opacity:.025;background-image:radial-gradient(#fff .6px,transparent .6px);background-size:4px 4px}.top{height:72px;border-bottom:1px solid #202127;display:flex;align-items:center;justify-content:space-between;padding:0 30px;position:sticky;top:0;background:rgba(7,8,10,.86);backdrop-filter:blur(20px);z-index:5}.brand{display:flex;align-items:center;gap:10px}.brand>span{width:32px;height:32px;border-radius:9px;background:#f2f2f3;color:#08090a;display:grid;place-items:center;font-weight:900}.brand strong{font-size:13px}.brand strong span{color:#ff6a2b}.brand small{display:block;color:#565961;font-size:7px;letter-spacing:1.6px;margin-top:4px}.copy{height:34px;border:1px solid #2a2b31;background:#111216;color:#aaa;border-radius:8px;padding:0 11px;display:flex;align-items:center;gap:7px;font-size:9px}.wrap{max-width:1120px;margin:auto;padding:52px 24px 90px}.headline{display:flex;justify-content:space-between;gap:30px;align-items:flex-end}.eyebrow{font-size:8px;letter-spacing:1.8px;color:#696c75;font-weight:800}.headline h1{font-size:clamp(34px,6vw,60px);letter-spacing:-3px;margin:10px 0 8px}.headline p{font-size:11px;color:#656871;margin:0}.price{text-align:right}.price span{display:block;color:#555861;font-size:7px;letter-spacing:1.6px}.price strong{display:block;font-size:25px;margin-top:8px}.timeline{display:flex;align-items:center;gap:10px;margin:30px 0;color:#4d5058}.timeline-item{display:flex;align-items:center;gap:7px;font-size:8px}.timeline-item i{width:23px;height:23px;border-radius:50%;border:1px solid #2b2c32;display:grid;place-items:center;font-style:normal}.timeline-item.active{color:#ddd}.timeline-item.active i{background:#f3f3f3;color:#08090a;border-color:#f3f3f3}.files{display:grid;gap:12px}.file-card{border:1px solid #23242b;border-radius:17px;background:#101115;overflow:hidden}.file-head{padding:12px 14px;display:flex;justify-content:space-between;align-items:center;gap:15px;border-bottom:1px solid #202127}.file-head>div{display:flex;align-items:center;gap:10px;min-width:0}.file-head>div>div{min-width:0}.file-index{font-size:8px;color:#ff6a2b}.file-head strong,.file-head small{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.file-head strong{font-size:10px}.file-head small{font-size:8px;color:#555861;margin-top:4px}.file-head a{color:#aaa;text-decoration:none;font-size:8px;border:1px solid #2b2c32;border-radius:7px;padding:7px 9px;display:flex;align-items:center;gap:5px}.media{min-height:300px;background:#090a0c;display:grid;place-items:center;overflow:hidden}.media.image{padding:25px}.media.image img{max-width:100%;max-height:680px;object-fit:contain;border-radius:8px}.media>video{width:100%;max-height:680px}.media.audio{padding:80px 30px;gap:11px;color:#81838c}.media.audio strong{color:#ddd;font-size:12px}.media.audio audio{width:min(600px,100%);margin-top:10px}.pdf{width:100%;height:720px;border:0;background:#fff}.unsupported{padding:90px 20px;gap:9px;color:#777}.unsupported strong{color:#ddd}.unsupported span{font-size:9px}.unsupported a{margin-top:8px;background:#f3f3f4;color:#08090a;border-radius:8px;padding:10px 13px;text-decoration:none;font-size:9px;font-weight:800;display:flex;align-items:center;gap:6px}.decision,.payment,.delivered{margin-top:12px;border:1px solid #23242b;border-radius:17px;background:#101115;padding:24px}.decision{display:flex;justify-content:space-between;align-items:center;gap:30px}.decision h2,.payment h2,.delivered h2{font-size:19px;margin:7px 0 5px}.decision p,.payment-intro p,.delivered p{font-size:9px;color:#62656e;line-height:1.7;margin:0;max-width:600px}.decision-buttons{display:flex;gap:8px;white-space:nowrap}.revision,.approve,.pay-submit{height:40px;border-radius:9px;padding:0 13px;display:flex;align-items:center;justify-content:center;gap:7px;font-size:9px;font-weight:800}.revision{border:1px solid #2c2d33;background:#17181c;color:#ccc}.approve,.pay-submit{border:0;background:#f3f3f4;color:#08090a}.approve:disabled,.pay-submit:disabled{opacity:.6}.payment-intro{display:flex;align-items:flex-start;gap:13px;margin-bottom:20px}.payment-icon{width:42px;height:42px;border-radius:12px;background:#182018;color:#76d99b;display:grid;place-items:center}.payment-form{display:grid;gap:12px;max-width:720px}.payment-form label{font-size:8px;color:#777a83;display:grid;gap:6px}.payment-form input,.payment-form select,.modal-card textarea{width:100%;box-sizing:border-box;border:1px solid #2b2c32;background:#0b0c0f;color:#eee;border-radius:9px;padding:0 12px;height:44px;outline:0;font-size:10px}.payment-form select{appearance:auto}.payment-form .two{display:grid;grid-template-columns:1fr 1fr;gap:10px}.method{border:1px solid #2d3a31;background:#101811;border-radius:10px;padding:12px;display:grid;gap:5px;color:#7a9a83;font-size:8px}.method strong{color:#bfe6c8;font-size:9px}.pay-submit{width:max-content;margin-top:4px;padding:0 16px}.submitted{display:flex;align-items:center;gap:10px;border:1px solid #2b3c31;background:#0f1711;border-radius:11px;padding:14px;color:#75d698}.submitted strong,.submitted span{display:block}.submitted strong{color:#c7efd2;font-size:10px}.submitted span{font-size:8px;color:#68816e;margin-top:4px}.delivered{display:flex;gap:13px;align-items:flex-start;color:#72d797}.delivered h2{color:#eee}.delivered p{max-width:550px}.notice.error{margin-top:12px}.empty-file{min-height:200px;border:1px dashed #303139;border-radius:14px;display:grid;place-items:center;color:#60636b;font-size:10px}.modal{position:fixed;inset:0;background:rgba(0,0,0,.75);backdrop-filter:blur(12px);display:grid;place-items:center;padding:18px;z-index:20}.modal-card{width:min(560px,100%);border:1px solid #303139;background:#111216;border-radius:17px;padding:25px;position:relative}.modal-card h2{font-size:22px;margin:8px 0}.modal-card p{font-size:9px;color:#676a73;line-height:1.7}.modal-card textarea{height:auto;padding:12px;resize:vertical;margin:8px 0 10px}.close{position:absolute;right:13px;top:13px;width:30px;height:30px;border:1px solid #2b2c32;background:#17181c;color:#999;border-radius:8px;display:grid;place-items:center}@media(max-width:760px){.top{padding:0 16px}.wrap{padding:35px 14px 60px}.headline{display:block}.price{text-align:left;margin-top:18px}.decision{display:block}.decision-buttons{margin-top:18px}.pdf{height:520px}.payment-form .two{grid-template-columns:1fr}.pay-submit{width:100%}}@media(max-width:480px){.timeline{overflow:auto;padding-bottom:5px}.timeline-item span{display:none}.file-head a{font-size:0}.file-head a svg{margin:0}.headline h1{letter-spacing:-2px}}
    `}</style>
  </main>;
}
