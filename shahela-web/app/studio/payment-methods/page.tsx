'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Building2, CheckCircle2, CreditCard, Landmark, Save, Smartphone } from 'lucide-react';

type Method={name:string;accountName:string;accountNumber:string;instructions:string;enabled:boolean};
const defaults:Method[]=[
  {name:'bKash',accountName:'',accountNumber:'',instructions:'Send the exact project amount and enter the transaction ID.',enabled:true},
  {name:'Nagad',accountName:'',accountNumber:'',instructions:'Send the exact project amount and enter the transaction ID.',enabled:true},
  {name:'Bank Transfer',accountName:'',accountNumber:'',instructions:'Include your project name as the transfer reference.',enabled:true},
];
const icons=[Smartphone,Smartphone,Landmark];

export default function PaymentMethodsPage(){
  const [methods,setMethods]=useState<Method[]>(defaults);
  const [loading,setLoading]=useState(true);
  const [saving,setSaving]=useState('');
  const [message,setMessage]=useState('');
  const [error,setError]=useState('');

  useEffect(()=>{(async()=>{
    try{
      const r=await fetch('/api/studio/payment-methods',{cache:'no-store'});const j=await r.json();
      if(r.status===401){window.location.href='/studio/login';return;}
      if(!r.ok)throw new Error(j.error||'Could not load payment methods');
      setMethods(defaults.map(d=>{const saved=(j.methods||[]).find((m:Record<string,string>)=>m.name===d.name);return saved?{...d,accountName:saved.accountName||'',accountNumber:saved.accountNumber||'',instructions:saved.instructions||'',enabled:saved.enabled!=='false'}:d;}));
    }catch(e){setError(e instanceof Error?e.message:'Could not load payment methods');}
    finally{setLoading(false);}
  })();},[]);

  function change(index:number,key:keyof Method,value:string|boolean){
    setMethods(current=>current.map((m,i)=>i===index?{...m,[key]:value}:m));
  }
  async function save(method:Method){
    setSaving(method.name);setMessage('');setError('');
    try{
      const r=await fetch('/api/studio/payment-methods',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(method)});
      const j=await r.json();if(!r.ok)throw new Error(j.error||'Could not save method');
      setMessage(method.name+' details saved.');
    }catch(e){setError(e instanceof Error?e.message:'Could not save method');}
    finally{setSaving('');}
  }

  return <main className="settings">
    <header><button className="back" onClick={()=>window.location.href='/studio/payments'}><ArrowLeft size={15}/> Payments</button><div className="brand"><span>T</span><div><strong>tometu<span>.</span>studio</strong><small>PAYMENT SETTINGS</small></div></div><div className="lock">ADMIN ONLY</div></header>
    <div className="wrap">
      <span className="eyebrow">WORKSPACE SETTINGS / PAYMENTS</span>
      <h1>Payment <em>methods.</em></h1>
      <p className="lead">Add your receiving account details. Clients will see the enabled methods in their checkout before entering their transaction ID.</p>
      {error&&<div className="error">{error}</div>}{message&&<div className="success"><CheckCircle2 size={15}/>{message}</div>}
      {loading?<div className="loading">Loading your payment settings…</div>:<div className="grid">{methods.map((method,index)=>{const Icon=icons[index];return <section className="method-card" key={method.name}>
        <div className="card-head"><div className="method-icon"><Icon size={19}/></div><div><h2>{method.name}</h2><span>{method.name==='Bank Transfer'?'Bank account details':'Mobile financial service'}</span></div><label className="toggle"><input type="checkbox" checked={method.enabled} onChange={e=>change(index,'enabled',e.target.checked)}/><i/></label></div>
        <label>Account name<input value={method.accountName} onChange={e=>change(index,'accountName',e.target.value)} placeholder="Name on account"/></label>
        <label>{method.name==='Bank Transfer'?'Account number':'Account number / mobile number'}<input value={method.accountNumber} onChange={e=>change(index,'accountNumber',e.target.value)} placeholder={method.name==='Bank Transfer'?'Enter bank account number':'01XXXXXXXXX'}/></label>
        <label>Client instructions<textarea rows={3} value={method.instructions} onChange={e=>change(index,'instructions',e.target.value)} placeholder="Payment instructions shown to client"/></label>
        <button className="save" disabled={saving===method.name} onClick={()=>save(method)}><Save size={15}/>{saving===method.name?'Saving…':'Save '+method.name}</button>
      </section>})}</div>}
      <div className="note"><CreditCard size={16}/><span>Clients only submit their payment method and Transaction ID. You verify the transaction manually from your own account before approving delivery.</span></div>
    </div>
    <style jsx>{`
      .settings{min-height:100vh;background:#070809;color:#f5f5f6;font-family:Arial,sans-serif}.settings header{height:72px;padding:0 28px;border-bottom:1px solid #202127;display:flex;align-items:center;justify-content:space-between}.back{height:35px;padding:0 11px;border:1px solid #292a31;background:#111216;color:#aaa;border-radius:8px;display:flex;align-items:center;gap:7px;font-size:9px}.brand{display:flex;align-items:center;gap:9px}.brand>span{width:31px;height:31px;border-radius:9px;background:#f1f1f2;color:#08090a;display:grid;place-items:center;font-weight:900}.brand strong{font-size:12px}.brand strong span{color:#ff6b35}.brand small{display:block;color:#62646d;font-size:7px;letter-spacing:1.5px;margin-top:3px}.lock{font-size:8px;letter-spacing:1.3px;color:#777a83;border:1px solid #292a31;border-radius:7px;padding:8px}.wrap{max-width:1060px;margin:auto;padding:48px 24px 70px}.eyebrow{font-size:8px;letter-spacing:1.8px;color:#747781;font-weight:800}.wrap h1{font-size:clamp(36px,5vw,54px);letter-spacing:-2.5px;margin:10px 0}.wrap h1 em{font-style:normal;color:#ff7544}.lead{font-size:11px;line-height:1.8;color:#777a84;max-width:650px;margin:0 0 26px}.grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.method-card{border:1px solid #282930;background:linear-gradient(145deg,#15161a,#0f1013);border-radius:16px;padding:20px}.card-head{display:flex;align-items:center;gap:11px;margin-bottom:20px}.method-icon{width:40px;height:40px;border-radius:11px;background:#21170f;color:#ff956b;display:grid;place-items:center}.card-head h2{font-size:14px;margin:0 0 4px}.card-head span{font-size:8px;color:#696c75}.toggle{margin-left:auto;position:relative;width:37px;height:21px}.toggle input{opacity:0;width:0;height:0}.toggle i{position:absolute;inset:0;border-radius:30px;background:#36373e;cursor:pointer;transition:.2s}.toggle i:before{content:'';position:absolute;width:15px;height:15px;left:3px;top:3px;border-radius:50%;background:#bbb;transition:.2s}.toggle input:checked+i{background:#6c3b28}.toggle input:checked+i:before{transform:translateX(16px);background:#ff9a70}.method-card>label{display:grid;gap:7px;color:#858791;font-size:9px;margin-top:13px}.method-card input:not([type=checkbox]),.method-card textarea{width:100%;box-sizing:border-box;border:1px solid #303139;background:#090a0c;color:#eee;border-radius:9px;padding:11px 12px;outline:0;font:inherit;font-size:10px}.method-card input:focus,.method-card textarea:focus{border-color:#8b604e}.method-card textarea{resize:vertical;line-height:1.6}.save{width:100%;height:39px;margin-top:16px;border:0;border-radius:9px;background:#efeff0;color:#090a0b;font-size:9px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:7px}.save:disabled{opacity:.6}.note{display:flex;gap:10px;align-items:flex-start;border:1px solid #333039;background:#151217;color:#a99b97;border-radius:11px;padding:13px 14px;margin-top:14px;font-size:9px;line-height:1.7}.note svg{flex:none;color:#ff946b}.error,.success{display:flex;align-items:center;gap:8px;padding:11px 13px;border-radius:9px;font-size:9px;margin-bottom:12px}.error{border:1px solid #583137;background:#211416;color:#ffb1b1}.success{border:1px solid #294633;background:#111c15;color:#85dca1}.loading{padding:70px;text-align:center;color:#747781;font-size:10px}@media(max-width:700px){.settings header{padding:0 13px}.lock{display:none}.wrap{padding:32px 14px 55px}.grid{grid-template-columns:1fr}.method-card{padding:16px}}
    `}</style>
  </main>;
}
