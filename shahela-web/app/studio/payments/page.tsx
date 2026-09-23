'use client';

import { useEffect, useState } from 'react';

export default function PaymentsPage(){
  const [rows,setRows]=useState<any[]>([]); const [error,setError]=useState('');
  async function load(){const r=await fetch('/api/studio/payments',{cache:'no-store'});const j=await r.json();if(!r.ok)throw new Error(j.error||'Failed');setRows(j.payments||[]);}
  useEffect(()=>{load().catch(e=>setError(e.message));},[]);
  async function verify(id:string,decision:string){const r=await fetch('/api/studio/payment/verify',{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({paymentId:id,decision})});const j=await r.json();if(!r.ok){setError(j.error||'Action failed');return;}await load();}
  return <main style={{minHeight:'100vh',background:'#08090b',color:'#f5f5f5',padding:40,fontFamily:'Arial'}}><div style={{maxWidth:1100,margin:'auto'}}><div style={{fontSize:10,letterSpacing:2,color:'#777'}}>TOMETU · STUDIO</div><h1 style={{fontSize:38,letterSpacing:-1}}>Payments</h1>{error&&<p style={{color:'#ff9b9b'}}>{error}</p>}<div style={{display:'grid',gap:12}}>{rows.map(row=><div key={row.id} style={{border:'1px solid #25262b',borderRadius:14,padding:18,background:'#111216'}}><div style={{display:'flex',justifyContent:'space-between',gap:20,flexWrap:'wrap'}}><div><strong>{row.projectTitle}</strong><div style={{color:'#888',fontSize:12,marginTop:6}}>{row.clientName} · {row.clientEmail}</div></div><strong>৳ {row.amount}</strong></div><div style={{fontSize:12,color:'#aaa',marginTop:12}}>Method: {row.method} · TRX: {row.trxId} · Status: {row.status}</div>{row.status==='pending'&&<div style={{display:'flex',gap:8,marginTop:14}}><button onClick={()=>verify(row.id,'approved')} style={button}>Approve & deliver</button><button onClick={()=>verify(row.id,'rejected')} style={danger}>Reject</button></div>}</div>)}{!rows.length&&<p style={{color:'#777'}}>No payment submissions yet.</p>}</div></div></main>;
}
const button={border:0,background:'#f4f4f4',color:'#090909',borderRadius:8,padding:'10px 14px',fontWeight:700};
const danger={border:'1px solid #5b3030',background:'#201313',color:'#ffbaba',borderRadius:8,padding:'10px 14px'};
