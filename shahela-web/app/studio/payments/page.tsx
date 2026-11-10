'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, CheckCircle2, Clock3, CreditCard, RefreshCw, Search, ShieldCheck, WalletCards, XCircle } from 'lucide-react';

type Payment={id:string;projectSlug:string;projectTitle:string;clientName:string;clientEmail:string;method:string;trxId:string;amount:string;status:string;createdAt?:string;submittedAt?:string};
type Filter='all'|'pending'|'approved'|'rejected';

export default function PaymentsPage(){
  const [rows,setRows]=useState<Payment[]>([]);
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(true);
  const [busyId,setBusyId]=useState('');
  const [query,setQuery]=useState('');
  const [filter,setFilter]=useState<Filter>('pending');

  async function load(){
    setLoading(true);
    try{
      const r=await fetch('/api/studio/payments',{cache:'no-store'});const j=await r.json();
      if(r.status===401){window.location.href='/studio/login';return;}
      if(!r.ok)throw new Error(j.error||'Could not load payments');
      setRows(j.payments||[]);setError('');
    }catch(e){setError(e instanceof Error?e.message:'Could not load payments');}
    finally{setLoading(false);}
  }
  useEffect(()=>{load();},[]);

  async function verify(id:string,decision:'approved'|'rejected'){
    if(!window.confirm(decision==='approved'?'Have you verified this transaction and received the payment?':'Reject this payment submission?'))return;
    setBusyId(id);setError('');
    try{
      const r=await fetch('/api/studio/payment/verify',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({paymentId:id,decision})});
      const j=await r.json();if(!r.ok)throw new Error(j.error||'Action failed');await load();
    }catch(e){setError(e instanceof Error?e.message:'Action failed');}
    finally{setBusyId('');}
  }

  const counts=useMemo(()=>({all:rows.length,pending:rows.filter(x=>x.status==='pending').length,approved:rows.filter(x=>x.status==='approved').length,rejected:rows.filter(x=>x.status==='rejected').length}),[rows]);
  const filtered=useMemo(()=>rows.filter(x=>(filter==='all'||x.status===filter)&&`${x.projectTitle} ${x.clientName} ${x.clientEmail} ${x.trxId} ${x.method}`.toLowerCase().includes(query.toLowerCase())),[rows,filter,query]);

  return <main className="payments">
    <header className="topbar">
      <button className="back" onClick={()=>window.location.href='/studio'}><ArrowLeft size={15}/> Studio</button>
      <div className="brand"><span className="mark">T</span><div><strong>tometu<span>.</span>studio</strong><small>PAYMENT VERIFICATION</small></div></div>
      <div className="head-actions"><a className="manage" href="/studio/payment-methods">Payment methods</a><button className="refresh" onClick={load} disabled={loading}><RefreshCw size={14}/> Refresh</button></div>
    </header>
    <div className="container">
      <div className="intro"><div><span className="eyebrow">FINANCE / MANUAL REVIEW</span><h1>Payment <em>inbox.</em></h1><p>Check each transaction ID in your bKash, Nagad or bank account. Approve only after confirming the money arrived.</p></div><div className="secure"><ShieldCheck size={16}/> Manual verification only</div></div>
      <section className="stats">
        <div className="stat"><span>Total submissions</span><strong>{counts.all}</strong><small>All payment records</small></div>
        <div className="stat pending"><span>Needs review</span><strong>{counts.pending}</strong><small>Awaiting your check</small></div>
        <div className="stat"><span>Approved</span><strong>{counts.approved}</strong><small>Verified transactions</small></div>
        <div className="stat"><span>Rejected</span><strong>{counts.rejected}</strong><small>Not verified</small></div>
      </section>
      <section className="panel">
        <div className="panel-head"><div><span className="eyebrow">TRANSACTION QUEUE</span><h2>Submitted payments</h2></div><div className="search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search transaction, client, project…"/></div></div>
        <div className="filters">{(['pending','all','approved','rejected'] as Filter[]).map(k=><button key={k} className={filter===k?'selected':''} onClick={()=>setFilter(k)}>{k==='all'?'All payments':k[0].toUpperCase()+k.slice(1)}<span>{counts[k]}</span></button>)}</div>
        {error&&<div className="error">{error}</div>}
        {loading?<div className="empty"><RefreshCw size={20} className="spin"/>Loading payment records…</div>:filtered.length?<div className="list">{filtered.map(row=><article className="payment-card" key={row.id}>
          <div className="card-top"><div className="project-icon"><WalletCards size={18}/></div><div className="project"><strong>{row.projectTitle}</strong><span>{row.clientName} · {row.clientEmail}</span></div><div className={`status ${row.status}`}><i/>{row.status}</div><strong className="amount">৳ {row.amount}</strong></div>
          <div className="details"><div><span>PAYMENT METHOD</span><strong>{row.method}</strong></div><div className="trx"><span>TRANSACTION ID</span><strong>{row.trxId||'Not provided'}</strong></div><div><span>SUBMITTED</span><strong>{(row.submittedAt||row.createdAt)?new Date(row.submittedAt||row.createdAt||'').toLocaleString('en-GB'):'—'}</strong></div></div>
          {row.status==='pending'&&<div className="actions"><p><Clock3 size={14}/> Verify the transaction in your payment account before approving.</p><div><button className="reject" disabled={busyId===row.id} onClick={()=>verify(row.id,'rejected')}><XCircle size={15}/> Reject</button><button className="approve" disabled={busyId===row.id} onClick={()=>verify(row.id,'approved')}>{busyId===row.id?'Processing…':<><CheckCircle2 size={15}/> Verify & deliver</>}</button></div></div>}
          {row.status==='approved'&&<div className="result good"><CheckCircle2 size={14}/> Verified. Secure delivery email has been sent.</div>}
          {row.status==='rejected'&&<div className="result bad"><XCircle size={14}/> Rejected. Client has been notified.</div>}
        </article>)}</div>:<div className="empty"><CreditCard size={25}/><strong>No payment submissions</strong><span>{filter==='pending'?'New client transaction IDs will appear here.':'No records match this filter or search.'}</span></div>}
      </section>
      <p className="footnote">Payments are not verified automatically. Always confirm the transaction in your own bKash, Nagad or bank account before approving.</p>
    </div>
    <style jsx>{`
      .payments{min-height:100vh;background:#070809;color:#f4f4f5;font-family:Arial,sans-serif}.topbar{height:74px;padding:0 30px;border-bottom:1px solid #202127;display:flex;align-items:center;justify-content:space-between;background:rgba(8,9,11,.9);position:sticky;top:0;z-index:5;backdrop-filter:blur(18px)}.back,.refresh{height:36px;border:1px solid #292a31;border-radius:9px;background:#111216;color:#aaa;padding:0 12px;display:flex;align-items:center;gap:7px;font-size:10px;cursor:pointer}.refresh:disabled{opacity:.5}.head-actions{display:flex;align-items:center;gap:8px}.manage{height:36px;padding:0 12px;border:1px solid #493126;border-radius:9px;background:#1c1512;color:#ffad89;text-decoration:none;display:flex;align-items:center;font-size:9px}.brand{display:flex;align-items:center;gap:10px}.mark{width:32px;height:32px;border-radius:9px;background:#f1f1f2;color:#090a0b;display:grid;place-items:center;font-weight:900}.brand strong{font-size:13px}.brand strong span{color:#ff6b35}.brand small{display:block;color:#62646d;font-size:7px;letter-spacing:1.6px;margin-top:4px}
      .container{max-width:1180px;margin:auto;padding:48px 26px 70px}.intro{display:flex;justify-content:space-between;align-items:flex-end;gap:25px;margin-bottom:25px}.eyebrow{font-size:8px;letter-spacing:1.9px;color:#747781;font-weight:800}.intro h1{font-size:clamp(36px,5vw,56px);letter-spacing:-2.7px;margin:10px 0 8px}.intro h1 em{font-style:normal;color:#ff6b35}.intro p{font-size:11px;color:#70737d;line-height:1.7;max-width:630px;margin:0}.secure{display:flex;align-items:center;gap:7px;color:#8b8e97;border:1px solid #292a31;background:#101115;border-radius:9px;padding:10px 12px;font-size:9px;white-space:nowrap}
      .stats{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:12px}.stat{border:1px solid #24252b;background:linear-gradient(145deg,#141519,#0d0e11);border-radius:14px;padding:16px}.stat span,.stat small{display:block;color:#777a84;font-size:9px}.stat strong{display:block;font-size:27px;letter-spacing:-1px;margin:13px 0 3px}.stat small{font-size:8px;color:#52555e}.stat.pending{border-color:#493020;background:linear-gradient(145deg,#1b130f,#101012)}.stat.pending strong{color:#ff9a69}
      .panel{border:1px solid #24252b;background:#0e0f12;border-radius:16px;padding:20px}.panel-head{display:flex;align-items:flex-end;justify-content:space-between;gap:15px}.panel-head h2{font-size:16px;margin:7px 0 0}.search{width:min(330px,45%);height:38px;display:flex;align-items:center;gap:8px;padding:0 11px;border:1px solid #292a31;background:#090a0c;border-radius:9px;color:#666}.search input{width:100%;background:transparent;border:0;outline:0;color:#eee;font-size:10px}.filters{display:flex;gap:6px;border-bottom:1px solid #24252b;padding:17px 0 13px;margin-bottom:12px;overflow:auto}.filters button{display:flex;align-items:center;gap:8px;white-space:nowrap;border:1px solid transparent;border-radius:8px;background:transparent;color:#777a83;padding:8px 10px;font-size:9px;cursor:pointer}.filters button span{font-size:8px;color:#666}.filters button.selected{background:#1a1b20;border-color:#303139;color:#fff}.filters button.selected span{color:#ff9569}
      .list{display:grid;gap:9px}.payment-card{border:1px solid #25262d;background:linear-gradient(145deg,#141519,#101115);border-radius:13px;padding:16px}.card-top{display:flex;align-items:center;gap:11px}.project-icon{width:38px;height:38px;border-radius:10px;background:#21170f;color:#ff9569;display:grid;place-items:center}.project{flex:1;min-width:0}.project strong,.project span{display:block;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.project strong{font-size:11px;color:#f0f0f1}.project span{font-size:8px;color:#777a83;margin-top:5px}.status{display:flex;align-items:center;gap:6px;border:1px solid #33343b;border-radius:999px;padding:6px 9px;font-size:8px;color:#aaa;text-transform:capitalize}.status i{width:6px;height:6px;border-radius:50%;background:#858791}.status.pending i{background:#ff9a69}.status.approved i{background:#6dd69a}.status.rejected i{background:#f07b7b}.amount{font-size:14px;white-space:nowrap;margin-left:7px}
      .details{display:grid;grid-template-columns:1fr 1.5fr 1.2fr;gap:12px;padding:15px 0;margin:14px 0 0 49px;border-top:1px solid #24252b;border-bottom:1px solid #24252b}.details div{min-width:0}.details span,.details strong{display:block}.details span{font-size:7px;letter-spacing:1.1px;color:#5f626c;margin-bottom:6px}.details strong{font-size:10px;color:#d7d8dc;overflow-wrap:anywhere}.trx strong{font-family:monospace;font-size:12px;color:#ffb08b;letter-spacing:.3px}
      .actions{display:flex;justify-content:space-between;align-items:center;gap:12px;margin:13px 0 0 49px}.actions p{display:flex;align-items:center;gap:6px;color:#858791;font-size:8px;margin:0}.actions>div{display:flex;gap:7px}.actions button{height:35px;border-radius:8px;padding:0 11px;display:flex;align-items:center;gap:6px;font-size:9px;font-weight:700;cursor:pointer}.actions button:disabled{opacity:.5}.reject{border:1px solid #513033;background:#211416;color:#ffaaaa}.approve{border:0;background:#f0f0f1;color:#090a0b}.result{margin:13px 0 0 49px;display:flex;align-items:center;gap:7px;font-size:9px}.good{color:#70d99a}.bad{color:#ed9292}
      .empty{min-height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#656872;font-size:9px}.empty strong{color:#ddd;font-size:12px}.error{margin-top:12px;border:1px solid #5b3030;background:#201416;color:#ffb2b2;border-radius:9px;padding:11px;font-size:10px}.footnote{color:#555861;font-size:8px;line-height:1.7;margin:13px 2px}.spin{animation:spin 1s linear infinite}@keyframes spin{to{transform:rotate(360deg)}}
      @media(max-width:800px){.container{padding:32px 15px 55px}.stats{grid-template-columns:repeat(2,1fr)}.intro{display:block}.secure{width:max-content;margin-top:17px}.details{margin-left:0}.actions{margin-left:0;align-items:flex-start;flex-direction:column}.actions>div{width:100%}.actions button{flex:1;justify-content:center}}
      @media(max-width:560px){.topbar{padding:0 14px}.brand{transform:scale(.92)}.manage{font-size:0;width:35px;padding:0;justify-content:center}.manage:before{content:"⚙";font-size:14px}.back,.refresh{font-size:0;gap:0;padding:0;width:35px;justify-content:center}.panel{padding:14px}.panel-head{display:block}.search{width:auto;margin-top:13px}.card-top{flex-wrap:wrap}.project{width:calc(100% - 55px);flex:none}.amount{margin-left:auto}.status{margin-left:49px}.details{grid-template-columns:1fr 1fr}.details div:last-child{grid-column:1/-1}.actions button{font-size:8px;padding:0 8px}}
    `}</style>
  </main>;
}
