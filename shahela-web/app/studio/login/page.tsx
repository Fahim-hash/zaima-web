'use client';

import { useState } from 'react';
import { ArrowRight, Eye, EyeOff, LockKeyhole, ShieldCheck, Sparkles } from 'lucide-react';

export default function Login(){
  const [password,setPassword]=useState('');
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const [visible,setVisible]=useState(false);

  async function submit(e:React.FormEvent){
    e.preventDefault();setBusy(true);setError('');
    try{
      const r=await fetch('/api/studio/auth',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({password})});
      const j=await r.json();if(!r.ok)throw new Error(j.error||'Login failed');
      window.location.href='/studio';
    }catch(e){setError(e instanceof Error?e.message:'Login failed');}
    finally{setBusy(false);}
  }

  return <main className="login">
    <div className="ambient one"/><div className="ambient two"/>
    <div className="shell">
      <div className="brand"><span className="mark">T</span><div><strong>tometu<span>.</span>studio</strong><small>PRIVATE CREATOR WORKSPACE</small></div></div>
      <section className="card">
        <div className="icon"><LockKeyhole size={20}/></div>
        <span className="eyebrow">WELCOME BACK</span>
        <h1>Your studio.<br/><em>Your control.</em></h1>
        <p>Sign in to manage client previews, verify payments and deliver your final work securely.</p>
        <form onSubmit={submit}>
          <label htmlFor="studio-password">Studio password</label>
          <div className="password"><input id="studio-password" autoFocus required type={visible?'text':'password'} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Enter your password"/><button type="button" onClick={()=>setVisible(!visible)} aria-label={visible?'Hide password':'Show password'}>{visible?<EyeOff size={16}/>:<Eye size={16}/>}</button></div>
          {error&&<div className="error">{error}</div>}
          <button className="submit" disabled={busy}>{busy?'Signing in…':'Enter workspace'} <ArrowRight size={16}/></button>
        </form>
        <div className="secure"><ShieldCheck size={14}/> Encrypted administrator access</div>
      </section>
      <footer><Sparkles size={13}/> A calmer way to send work, get paid and deliver.</footer>
    </div>
    <style jsx>{`
      .login{min-height:100vh;background:#070809;color:#f5f5f6;display:grid;place-items:center;overflow:hidden;position:relative;font-family:Arial,sans-serif;padding:28px 16px}.ambient{position:absolute;width:440px;height:440px;filter:blur(120px);opacity:.13;pointer-events:none}.one{background:#ff6b35;top:-260px;right:-150px}.two{background:#5951a8;bottom:-300px;left:-180px}.shell{width:min(440px,100%);position:relative;z-index:1}.brand{display:flex;align-items:center;justify-content:center;gap:11px;margin-bottom:28px}.mark{width:36px;height:36px;border-radius:11px;background:#f1f1f2;color:#090a0b;display:grid;place-items:center;font-weight:900}.brand strong{font-size:14px}.brand strong span{color:#ff6b35}.brand small{display:block;color:#5e6069;font-size:7px;letter-spacing:1.7px;margin-top:4px}.card{border:1px solid #282930;background:linear-gradient(145deg,rgba(21,22,27,.98),rgba(12,13,16,.98));border-radius:22px;padding:34px;box-shadow:0 30px 100px #0008}.icon{width:43px;height:43px;border:1px solid #34353c;background:#1a1b20;border-radius:13px;display:grid;place-items:center;color:#ff956b;margin-bottom:25px}.eyebrow{font-size:8px;letter-spacing:2px;color:#858791;font-weight:800}.card h1{font-size:38px;line-height:1.03;letter-spacing:-1.8px;margin:12px 0}.card h1 em{font-style:normal;color:#ff7847}.card p{font-size:10px;line-height:1.8;color:#777a84;margin:0 0 25px}.card form label{display:block;font-size:9px;color:#b0b1b8;margin-bottom:8px}.password{height:48px;display:flex;align-items:center;border:1px solid #303139;background:#090a0c;border-radius:10px;padding:0 12px}.password:focus-within{border-color:#8a604e;box-shadow:0 0 0 3px #ff6b3512}.password input{height:100%;flex:1;min-width:0;background:none;border:0;outline:0;color:#fff;font-size:11px}.password button{border:0;background:none;color:#686b74;display:grid;place-items:center;cursor:pointer}.submit{width:100%;height:47px;border:0;border-radius:10px;background:#f0f0f1;color:#090a0b;font-size:10px;font-weight:800;display:flex;align-items:center;justify-content:center;gap:8px;margin-top:13px;cursor:pointer}.submit:disabled{opacity:.6}.error{margin-top:10px;padding:10px;border:1px solid #593136;background:#211416;color:#ffaaaa;border-radius:8px;font-size:9px}.secure{display:flex;align-items:center;justify-content:center;gap:7px;color:#646771;font-size:8px;margin-top:22px}.shell footer{display:flex;align-items:center;justify-content:center;gap:7px;color:#565962;font-size:8px;margin-top:22px}@media(max-width:480px){.card{padding:25px 21px}.card h1{font-size:34px}}
    `}</style>
  </main>;
}
