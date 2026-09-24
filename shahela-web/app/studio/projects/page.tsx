'use client';

import { useEffect, useMemo, useState } from 'react';
import { ArrowLeft, ArrowUpRight, FolderKanban, Plus, Search } from 'lucide-react';

type Project={slug:string;title:string;clientName:string;clientEmail:string;price:string;status:string;version:string;updatedAt:string};

const status:Record<string,string>={draft:'Draft',sent:'Sent',viewed:'Viewed',approved:'Approved',payment_submitted:'Payment review',payment_verified:'Paid',revision_requested:'Revision',delivered:'Delivered'};

export default function ProjectsPage(){
  const [projects,setProjects]=useState<Project[]>([]);
  const [query,setQuery]=useState('');
  const [error,setError]=useState('');

  async function load(){const r=await fetch('/api/studio/projects',{cache:'no-store'});const j=await r.json();if(!r.ok)throw new Error(j.error||'Failed');setProjects(j.projects||[]);}
  useEffect(()=>{load().catch(e=>setError(e.message));},[]);

  const filtered=useMemo(()=>projects.filter(p=>`${p.title} ${p.clientName} ${p.clientEmail}`.toLowerCase().includes(query.toLowerCase())),[projects,query]);

  return <main className="page">
    <header><button onClick={()=>window.location.href='/studio'}><ArrowLeft size={15}/> Studio</button><div><span>WORKSPACE / PROJECTS</span><h1>Projects</h1></div><a href="/studio/projects/new"><Plus size={15}/> New project</a></header>
    <div className="wrap">
      <div className="toolbar"><div><span>CLIENT WORK</span><h2>Every delivery in one place.</h2></div><div className="search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects…"/></div></div>
      {error&&<div className="error">{error}</div>}
      <div className="list">{filtered.map(p=><a className="row" href={`/studio/review/${p.slug}`} key={p.slug}><div className="icon"><FolderKanban size={17}/></div><div className="main"><strong>{p.title}</strong><span>{p.clientName} · {p.clientEmail}</span></div><div className="status">{status[p.status]||p.status}</div><div className="price">৳ {p.price}</div><div className="version">v{p.version||'1'}</div><ArrowUpRight size={15}/></a>)}{!filtered.length&&<div className="empty"><FolderKanban size={28}/><strong>No projects found</strong><span>Start your first client delivery project.</span></div>}</div>
    </div>
    <style jsx>{`
      .page{min-height:100vh;background:#07080a;color:#f5f5f6;font-family:Arial,sans-serif}.page header{height:72px;border-bottom:1px solid #202127;display:flex;align-items:center;justify-content:space-between;padding:0 30px}.page header button,.page header>a{height:35px;border:1px solid #2b2c32;background:#111216;color:#bbb;border-radius:8px;padding:0 11px;display:flex;align-items:center;gap:7px;text-decoration:none;font-size:9px}.page header>a{background:#f3f3f4;color:#08090a;border:0;font-weight:800}.page header>div span{font-size:7px;letter-spacing:1.7px;color:#5b5e67}.page header h1{font-size:15px;margin:5px 0 0}.wrap{max-width:1150px;margin:auto;padding:48px 22px}.toolbar{display:flex;align-items:flex-end;justify-content:space-between;gap:20px;margin-bottom:20px}.toolbar>div:first-child>span{font-size:8px;letter-spacing:1.7px;color:#696c75;font-weight:800}.toolbar h2{font-size:30px;letter-spacing:-1.3px;margin:8px 0 0}.search{height:38px;width:260px;border:1px solid #292a31;background:#0c0d10;border-radius:9px;display:flex;align-items:center;gap:8px;padding:0 10px;color:#5f626c}.search input{background:none;border:0;outline:0;color:#eee;width:100%;font-size:10px}.list{border:1px solid #222329;border-radius:15px;overflow:hidden;background:#101115}.row{min-height:70px;border-bottom:1px solid #202127;display:flex;align-items:center;gap:13px;padding:0 16px;color:#aaa;text-decoration:none}.row:last-child{border:0}.row:hover{background:#15161a}.icon{width:35px;height:35px;border-radius:9px;background:#17181c;display:grid;place-items:center;color:#999}.main{flex:1;min-width:0}.main strong,.main span{display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.main strong{color:#eee;font-size:10px}.main span{font-size:8px;color:#555861;margin-top:4px}.status{border:1px solid #2a2b31;border-radius:999px;padding:5px 8px;font-size:7px;color:#aaa}.price{width:85px;color:#ddd;font-size:9px}.version{color:#555861;font-size:8px;width:30px}.error{padding:12px;border:1px solid #5a3030;background:#1d1214;color:#ffb4ae;border-radius:9px;font-size:10px;margin-bottom:12px}.empty{min-height:300px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;color:#5d6068;font-size:9px}.empty strong{color:#bbb;font-size:12px}@media(max-width:760px){.page header{padding:0 14px}.page header>div{display:none}.wrap{padding:30px 14px}.toolbar{display:block}.search{width:100%;margin-top:15px}.row{padding:12px}.price,.version{display:none}}
      `}</style>
  </main>;
}
