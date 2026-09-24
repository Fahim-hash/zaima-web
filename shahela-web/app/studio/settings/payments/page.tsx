'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Check, CreditCard, Plus, Save, Trash2 } from 'lucide-react';

type Method = { name:string; accountName:string; accountNumber:string; instructions:string; enabled:string };

const blank = { name:'', accountName:'', accountNumber:'', instructions:'', enabled:'true' };

export default function PaymentSettingsPage(){
  const [methods,setMethods]=useState<Method[]>([]);
  const [form,setForm]=useState(blank);
  const [editing,setEditing]=useState<string|null>(null);
  const [message,setMessage]=useState('');
  const [busy,setBusy]=useState(false);

  async function load(){
    const r=await fetch('/api/studio/payment-methods',{cache:'no-store'});
    const j=await r.json();
    if(!r.ok) throw new Error(j.error||'Failed to load');
    setMethods(j.methods||[]);
  }
  useEffect(()=>{load().catch(e=>setMessage(e.message));},[]);

  async function save(e:React.FormEvent){
    e.preventDefault();setBusy(true);setMessage('');
    const r=await fetch('/api/studio/payment-methods',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(form)});
    const j=await r.json();
    if(!r.ok){setMessage(j.error||'Save failed');setBusy(false);return;}
    setMessage('Payment method saved.');setForm(blank);setEditing(null);await load();setBusy(false);
  }

  function edit(method:Method){setEditing(method.name);setForm(method);}
  function remove(method:Method){setEditing(null);setForm(blank);setMethods(current=>current.map(m=>m.name===method.name?{...m,enabled:'false'}:m));}

  return <main className="page">
    <header><button onClick={()=>window.location.href='/studio'}><ArrowLeft size={15}/> Studio</button><div className="title"><span>TOMETU · STUDIO</span><h1>Payment methods</h1></div><a href="/studio/projects/new"><Plus size={15}/> New project</a></header>
    <div className="wrap">
      <div className="intro"><div><span>CLIENT CHECKOUT</span><h2>Tell clients exactly where to pay.</h2><p>These methods appear automatically after a client approves a project.</p></div><CreditCard size={28}/></div>
      <div className="grid">
        <section className="panel">
          <div className="panel-head"><span>{editing?'EDIT METHOD':'ADD METHOD'}</span><h3>{editing||'New payment method'}</h3></div>
          <form onSubmit={save}>
            <label>Method name<input required value={form.name} disabled={Boolean(editing)} onChange={e=>setForm({...form,name:e.target.value})} placeholder="bKash"/></label>
            <label>Account name<input value={form.accountName} onChange={e=>setForm({...form,accountName:e.target.value})} placeholder="Fahim"/></label>
            <label>Account / number<input value={form.accountNumber} onChange={e=>setForm({...form,accountNumber:e.target.value})} placeholder="01XXXXXXXXX"/></label>
            <label>Instructions<textarea value={form.instructions} onChange={e=>setForm({...form,instructions:e.target.value})} placeholder="Send Money only. Use the transaction ID in your payment form."/></label>
            <label className="toggle"><input type="checkbox" checked={form.enabled==='true'} onChange={e=>setForm({...form,enabled:e.target.checked?'true':'false'})}/><span>Available to clients</span></label>
            <button className="save" disabled={busy}><Save size={15}/>{busy?'Saving…':'Save method'}</button>
          </form>
          {message&&<div className="message">{message}</div>}
        </section>
        <section className="panel list">
          <div className="panel-head"><span>CONFIGURED</span><h3>Client payment options</h3></div>
          {methods.length?methods.map(m=><div className={`method ${m.enabled==='false'?'disabled':''`} key={m.name}><div className="method-icon"><CreditCard size={16}/></div><div><strong>{m.name}</strong><small>{m.accountNumber||'No account number set'}</small></div><span className="badge">{m.enabled==='false'?'Hidden':'Active'}</span><button onClick={()=>edit(m)}><Check size={14}/> Edit</button><button onClick={()=>remove(m)}><Trash2 size={14}/></button></div>):<div className="empty">No payment methods yet.</div>}
        </section>
      </div>
    </div>
    <style jsx>{`
      .page{min-height:100vh;background:#07080a;color:#f5f5f6;font-family:Arial,sans-serif}.page header{height:72px;border-bottom:1px solid #202127;display:flex;align-items:center;justify-content:space-between;padding:0 30px}.page header button,.page header>a{height:35px;border:1px solid #2b2c32;background:#111216;color:#bbb;border-radius:8px;padding:0 11px;display:flex;align-items:center;gap:7px;text-decoration:none;font-size:9px}.page header>a{background:#f3f3f4;color:#08090a;border:0;font-weight:800}.title{text-align:center}.title span{font-size:7px;letter-spacing:1.7px;color:#5b5e67}.title h1{font-size:15px;margin:5px 0 0}.wrap{max-width:1050px;margin:auto;padding:50px 22px}.intro{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:24px}.intro>div>span{font-size:8px;letter-spacing:1.8px;color:#696c75;font-weight:800}.intro h2{font-size:32px;letter-spacing:-1.5px;margin:8px 0}.intro p{font-size:10px;color:#656871;margin:0}.grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}.panel{border:1px solid #23242b;background:#101115;border-radius:16px;padding:22px}.panel-head>span{font-size:7px;letter-spacing:1.7px;color:#ff6a2b;font-weight:800}.panel-head h3{font-size:15px;margin:7px 0 20px}.panel form{display:grid;gap:13px}.panel label{font-size:8px;color:#747780;display:grid;gap:6px}.panel input,.panel textarea{border:1px solid #2b2c32;background:#0b0c0f;color:#eee;border-radius:9px;padding:11px 12px;outline:0;font-size:10px}.panel textarea{min-height:90px;resize:vertical}.toggle{display:flex!important;align-items:center;gap:8px}.toggle input{width:auto}.save{height:40px;border:0;border-radius:9px;background:#f3f3f4;color:#08090a;font-weight:800;display:flex;justify-content:center;align-items:center;gap:7px}.message{margin-top:12px;color:#78d89a;font-size:9px}.method{display:flex;align-items:center;gap:9px;border:1px solid #27282e;background:#0c0d10;border-radius:11px;padding:10px;margin-top:8px}.method.disabled{opacity:.5}.method-icon{width:32px;height:32px;border-radius:8px;background:#17181c;display:grid;place-items:center;color:#aaa}.method>div:nth-child(2){flex:1}.method strong,.method small{display:block}.method strong{font-size:10px}.method small{font-size:8px;color:#555861;margin-top:3px}.badge{font-size:7px;border:1px solid #2b2c32;border-radius:999px;padding:4px 7px;color:#79d699}.method>button{border:1px solid #292a30;background:#15161a;color:#999;border-radius:7px;padding:7px;display:flex;align-items:center;gap:4px;font-size:8px}.empty{height:200px;display:grid;place-items:center;color:#5c5f68;font-size:9px}@media(max-width:760px){.grid{grid-template-columns:1fr}.page header{padding:0 14px}.title{display:none}.wrap{padding:30px 14px}.intro{display:block}.intro h2{font-size:28px}.intro>svg{display:none}}
      `}</style>
  </main>;
}
