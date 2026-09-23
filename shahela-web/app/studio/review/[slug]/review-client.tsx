'use client';

import { useEffect, useMemo, useState } from 'react';

type FileItem = { id:string; name:string; mimeType:string; size:string; downloadUrl:string };
type Method = { name:string; accountName:string; accountNumber:string; instructions:string };
type Data = { project:{slug:string;title:string;clientName:string;price:string;status:string;version:string;whatsapp:string}; files:FileItem[]; paymentMethods:Method[]; payment:any };

function Preview({ file }: { file: FileItem }) {
  const type = file.mimeType || '';
  const url = file.downloadUrl;
  if (type.startsWith('image/')) return <img src={url} alt={file.name} style={{maxWidth:'100%',maxHeight:620,objectFit:'contain',borderRadius:12}} />;
  if (type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')) return <iframe src={url} title={file.name} style={{width:'100%',height:620,border:0,borderRadius:12,background:'#fff'}} />;
  if (type.startsWith('audio/')) return <div style={{padding:70,textAlign:'center'}}><div style={{fontSize:50}}>♫</div><p>{file.name}</p><audio controls src={url} style={{width:'100%'}} /></div>;
  if (type.startsWith('video/')) return <video controls src={url} style={{width:'100%',maxHeight:620,borderRadius:12}} />;
  return <div style={{padding:70,textAlign:'center'}}><div style={{fontSize:48}}>↧</div><strong>{file.name}</strong><p style={{color:'#777'}}>Preview is not available in the browser for this file type.</p><a href={url} target="_blank" rel="noreferrer" style={{display:'inline-block',marginTop:12,padding:'11px 16px',borderRadius:9,background:'#f4f4f4',color:'#090909',fontWeight:700}}>Download file</a></div>;
}

export default function ReviewClient({ slug }: { slug:string }) {
  const [data,setData] = useState<Data|null>(null);
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  const [revision,setRevision] = useState(false);
  const [message,setMessage] = useState('');
  const [approved,setApproved] = useState(false);
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

  async function approve() {
    setBusy(true); setError('');
    const res=await fetch('/api/studio/review',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({slug,action:'approve'})});
    const json=await res.json();
    setBusy(false);
    if(!res.ok){setError(json.error||'Approval failed');return;}
    setApproved(true); await load();
  }

  async function requestRevision() {
    if(!message.trim()){setError('Please describe the changes you need.');return;}
    setBusy(true); setError('');
    const res=await fetch('/api/studio/review',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({slug,action:'revision',message})});
    const json=await res.json();
    setBusy(false);
    if(!res.ok){setError(json.error||'Could not send revision');return;}
    const text=encodeURIComponent('Revision request for '+(data?.project.title||'project')+': '+message);
    const number=(json.whatsapp||data?.project.whatsapp||'').replace(/\D/g,'');
    if(number) window.location.href='https://wa.me/'+number+'?text='+text;
    else setRevision(false);
  }

  async function submitPayment(e:React.FormEvent) {
    e.preventDefault(); setBusy(true); setError('');
    const res=await fetch('/api/studio/payment',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({slug,...form})});
    const json=await res.json(); setBusy(false);
    if(!res.ok){setError(json.error||'Payment submission failed');return;}
    await load();
  }

  if(error && !data) return <main style={{minHeight:'100vh',background:'#08090b',color:'#fff',display:'grid',placeItems:'center',fontFamily:'Arial'}}><div><h2>Review unavailable</h2><p style={{color:'#888'}}>{error}</p></div></main>;
  if(!data) return <main style={{minHeight:'100vh',background:'#08090b',color:'#fff',display:'grid',placeItems:'center',fontFamily:'Arial'}}>Loading review…</main>;

  const canPay = approved || ['approved','payment_submitted'].includes(data.project.status);
  return <main style={{minHeight:'100vh',background:'#08090b',color:'#f5f5f5',padding:'34px 18px 70px',fontFamily:'Arial,sans-serif'}}>
    <div style={{maxWidth:1000,margin:'auto'}}>
      <div style={{color:'#777',fontSize:10,letterSpacing:2,textTransform:'uppercase'}}>tometu.studio · client review</div>
      <div style={{display:'flex',justifyContent:'space-between',gap:20,alignItems:'end',flexWrap:'wrap'}}>
        <div><h1 style={{fontSize:'clamp(32px,6vw,52px)',letterSpacing:-2,margin:'12px 0 6px'}}>{data.project.title}</h1><p style={{color:'#777',fontSize:13}}>Version {data.project.version} · prepared for {data.project.clientName}</p></div>
        <div style={{fontSize:13,color:'#aaa'}}>Project total <strong style={{color:'#fff',fontSize:22}}>৳ {data.project.price}</strong></div>
      </div>

      <section style={{marginTop:28,border:'1px solid #25262b',borderRadius:18,padding:14,background:'#111216'}}>
        {data.files.length ? data.files.map((file)=><div key={file.id} style={{marginBottom:12}}><div style={{padding:'8px 8px 14px',fontSize:12,color:'#aaa'}}>{file.name}</div><div style={{minHeight:260,borderRadius:12,background:'#090a0c',display:'grid',placeItems:'center',overflow:'hidden'}}><Preview file={file}/></div></div>) : <div style={{padding:100,textAlign:'center',color:'#777'}}>No client-ready files have been attached yet.</div>}
      </section>

      {error && <div style={{marginTop:14,padding:12,borderRadius:10,background:'#241516',color:'#ffb5b5',fontSize:13}}>{error}</div>}

      {!canPay && data.project.status !== 'revision_requested' && <div style={{display:'flex',gap:10,justifyContent:'flex-end',marginTop:16,flexWrap:'wrap'}}>
        <button onClick={()=>setRevision(true)} style={{border:'1px solid #303138',background:'#17181c',color:'#ddd',borderRadius:9,padding:'12px 16px'}}>Request revision</button>
        <button disabled={busy} onClick={approve} style={{border:0,background:'#f4f4f4',color:'#090909',borderRadius:9,padding:'12px 18px',fontWeight:700}}>{busy?'Saving…':'Approve final'}</button>
      </div>}

      {canPay && <section style={{marginTop:24,border:'1px solid #25262b',borderRadius:18,padding:24,background:'#111216'}}>
        <h2 style={{margin:'0 0 6px',fontSize:20}}>Payment</h2><p style={{color:'#777',fontSize:12}}>Payment is recorded for review. Delivery is released after verification.</p>
        {data.payment?.status==='pending' ? <div style={{padding:16,borderRadius:10,background:'#17181c',color:'#ddd'}}>Payment submitted. Waiting for verification.</div> :
        <form onSubmit={submitPayment} style={{display:'grid',gap:12,maxWidth:560}}>
          <input required placeholder="Your name" value={form.clientName} onChange={e=>setForm({...form,clientName:e.target.value})} style={input}/>
          <input required type="email" placeholder="Your email" value={form.clientEmail} onChange={e=>setForm({...form,clientEmail:e.target.value})} style={input}/>
          <select required value={form.method} onChange={e=>setForm({...form,method:e.target.value})} style={input}><option value="">Select payment method</option>{data.paymentMethods.map(m=><option key={m.name}>{m.name}</option>)}</select>
          {selectedMethod && <div style={{padding:14,borderRadius:10,background:'#17181c',fontSize:12,color:'#bbb'}}><strong style={{color:'#fff'}}>{selectedMethod.name}</strong><br/>{selectedMethod.accountName && <>Account: {selectedMethod.accountName}<br/></>}{selectedMethod.accountNumber && <>Number: {selectedMethod.accountNumber}<br/></>}{selectedMethod.instructions}</div>}
          <input required placeholder="Transaction ID" value={form.trxId} onChange={e=>setForm({...form,trxId:e.target.value})} style={input}/>
          <input required type="number" min="0" step="0.01" placeholder="Amount" value={form.amount} onChange={e=>setForm({...form,amount:e.target.value})} style={input}/>
          <button disabled={busy} style={{border:0,background:'#f4f4f4',color:'#090909',borderRadius:9,padding:13,fontWeight:700}}>{busy?'Submitting…':'Submit payment'}</button>
        </form>}
      </section>}

      {revision && <div style={modal}><div style={{background:'#111216',border:'1px solid #303138',borderRadius:16,padding:22,width:'min(620px,100%)'}}><h3 style={{marginTop:0}}>Request a revision</h3><textarea autoFocus rows={6} placeholder="Tell the designer what needs to change…" value={message} onChange={e=>setMessage(e.target.value)} style={{...input,resize:'vertical'}}/><div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:10}}><button onClick={()=>setRevision(false)} style={{...secondary}}>Cancel</button><button disabled={busy} onClick={requestRevision} style={{...primary}}>Send via WhatsApp</button></div></div></div>}
      {approved && <div style={{marginTop:16,color:'#9fe0b0',fontSize:13}}>Approved. You can now complete payment below.</div>}
    </div>
  </main>;
}

const input:React.CSSProperties={width:'100%',boxSizing:'border-box',padding:'12px 13px',border:'1px solid #303138',borderRadius:9,background:'#0c0d0f',color:'#fff',fontSize:13};
const primary:React.CSSProperties={border:0,background:'#f4f4f4',color:'#090909',borderRadius:9,padding:'10px 14px',fontWeight:700};
const secondary:React.CSSProperties={border:'1px solid #303138',background:'#17181c',color:'#ddd',borderRadius:9,padding:'10px 14px'};
const modal:React.CSSProperties={position:'fixed',inset:0,background:'rgba(0,0,0,.72)',display:'grid',placeItems:'center',padding:18,zIndex:20};
