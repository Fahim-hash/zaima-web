'use client';

import { useMemo, useState } from 'react';
import {
  Activity, ArrowUpRight, Bell, CheckCircle2, ChevronRight, Clock3,
  FolderKanban, LayoutDashboard, MessageSquare, MoreHorizontal, Plus,
  Search, Settings2, Sparkles, Target, Users, Zap
} from 'lucide-react';

const projects = [
  { name: 'MadeSiho — Summer Drop', client: 'MadeSiho', type: 'Brand Identity', progress: 72, status: 'In progress', due: 'Sep 28', tone: 'orange' },
  { name: 'EmissaryMUN — Ascend', client: 'United Emissary Bangladesh', type: 'Campaign', progress: 88, status: 'Review', due: 'Oct 03', tone: 'purple' },
  { name: 'TongerKhobor', client: 'Personal Project', type: 'Product Design', progress: 46, status: 'In progress', due: 'Oct 12', tone: 'blue' },
  { name: 'PayPilot Identity', client: 'Assessment', type: 'Brand Identity', progress: 24, status: 'Draft', due: 'Oct 18', tone: 'green' },
];

const tasks = [
  ['Finalize typography system', 'MadeSiho', 'Today', 'High'],
  ['Export MUN social pack V3', 'EmissaryMUN', 'Tomorrow', 'High'],
  ['Write TongerKhobor case study outline', 'TongerKhobor', 'Sep 27', 'Medium'],
];

export default function StudioPage() {
  const [active, setActive] = useState('Overview');
  const [query, setQuery] = useState('');
  const [showCreate, setShowCreate] = useState(false);

  const filtered = useMemo(
    () => projects.filter(p => (p.name + p.client).toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const nav = [
    ['Overview', LayoutDashboard], ['Projects', FolderKanban], ['Tasks', CheckCircle2],
    ['Moodboards', Target], ['Versions', Activity], ['Feedback', MessageSquare], ['Deliveries', ArrowUpRight],
  ] as const;

  return (
    <main className="studio-shell">
      <aside className="sidebar">
        <div className="brand"><div className="mark">T.</div><div><b>tometu<span>.</span>studio</b><small>CREATIVE OS</small></div></div>
        <label>Workspace</label>
        <nav>{nav.map(([name, Icon]) => <button key={name} className={active === name ? 'active' : ''} onClick={() => setActive(name)}><Icon size={16}/><span>{name}</span>{name === 'Feedback' && <i>3</i>}</button>)}</nav>
        <label className="tools">Tools</label>
        <nav>
          <button className={active === 'Brief Builder' ? 'active' : ''} onClick={() => setActive('Brief Builder')}><Sparkles size={16}/><span>Brief Builder</span></button>
          <button className={active === 'Decision Log' ? 'active' : ''} onClick={() => setActive('Decision Log')}><Zap size={16}/><span>Decision Log</span></button>
        </nav>
        <div className="account"><div className="avatar">F</div><div><b>Fahim&apos;s Workspace</b><small>Personal Creative OS</small></div><Settings2 size={14}/></div>
      </aside>

      <section className="content">
        <header>
          <div><small>WORKSPACE / {active.toUpperCase()}</small><h1>{active === 'Overview' ? 'Good evening, Fahim.' : active}</h1></div>
          <div className="actions"><div className="search"><Search size={14}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search workspace..." /></div><button className="icon"><Bell size={16}/></button><button className="primary" onClick={() => setShowCreate(true)}><Plus size={15}/> New project</button></div>
        </header>

        <div className="body">
          <div className="hero"><div><span>YOUR CREATIVE COMMAND CENTER</span><h2>Everything in one place.</h2><p>Plan, create, review and deliver your design work from one focused workspace.</p></div><button className="secondary" onClick={() => setActive('Projects')}>Open pipeline <ChevronRight size={14}/></button></div>

          <div className="metrics">
            {[
              ['Active projects','4','2 need attention',FolderKanban],
              ['Open tasks','12','3 due this week',CheckCircle2],
              ['Awaiting feedback','3','1 client approval',MessageSquare],
              ['Creative time','18h','This week',Clock3],
            ].map(([a,b,c,Icon]) => <div className="metric" key={String(a)}><div><span>{a}</span><Icon size={15}/></div><strong>{b}</strong><small>{c}</small></div>)}
          </div>

          <div className="two-col">
            <section className="card"><div className="heading"><div><h3>Project velocity</h3><p>Creative output · last 8 weeks</p></div><em>8 weeks</em></div><div className="bars">{[36,48,42,64,57,77,68,91].map((v,i)=><div className="bar" key={i} style={{height: v + '%'}}/>)}</div><div className="axis"><span>Aug 03</span><span>Aug 17</span><span>Aug 31</span><span>Sep 14</span><span>Sep 23</span></div></section>
            <section className="card"><div className="heading"><div><h3>Needs attention</h3><p>Keep the pipeline moving</p></div><Zap size={15} className="orange"/></div>{[['3','Client feedback','EmissaryMUN — Ascend'],['2','Tasks overdue','MadeSiho — Summer Drop'],['1','Approval pending','Social pack V3']].map(x=><div className="attention" key={x[1]}><b>{x[0]}</b><div><strong>{x[1]}</strong><small>{x[2]}</small></div><ChevronRight size={13}/></div>)}</section>
          </div>

          <div className="section-head"><div><span>PIPELINE</span><h2>Active projects</h2></div><button onClick={() => setActive('Projects')}>View all <ArrowUpRight size={14}/></button></div>
          <div className="projects">{filtered.map(p=><article className="project" key={p.name}><div className={'cover '+p.tone}><span>{p.type}</span><MoreHorizontal size={16}/><b>{p.name.split(' — ')[0]}</b></div><div className="project-body"><div className="meta"><span>{p.client}</span><em>{p.status}</em></div><h3>{p.name}</h3><div className="progress-label"><span>Progress</span><b>{p.progress}%</b></div><div className="track"><i style={{width:p.progress+'%'}}/></div><div className="foot"><span>Due {p.due}</span><ArrowUpRight size={13}/></div></div></article>)}</div>

          <div className="two-col bottom"><section className="card"><div className="heading"><div><h3>Next up</h3><p>Tasks across your projects</p></div><Users size={15}/></div>{tasks.map(t=><div className="task" key={t[0]}><CheckCircle2 size={16}/><div><strong>{t[0]}</strong><small>{t[1]} · {t[2]}</small></div><em className={t[3] === 'High' ? 'high' : ''}>{t[3]}</em></div>)}</section><section className="card ai"><div className="ai-icon"><Sparkles size={18}/></div><span>STUDIO INTELLIGENCE</span><h3>Turn project data into creative direction.</h3><p>Briefs, decisions, feedback and approved versions can become one searchable creative context.</p><button className="primary" onClick={() => setActive('Brief Builder')}>Open Brief Builder <ArrowUpRight size={14}/></button></section></div>
        </div>
      </section>

      {showCreate && <div className="modal" onClick={() => setShowCreate(false)}><div className="modal-box" onClick={e => e.stopPropagation()}><span>NEW PROJECT</span><h2>Start something new.</h2><p>Create the project shell now; briefs, tasks, files and versions can live inside it.</p><input autoFocus placeholder="Project name"/><input placeholder="Client / brand"/><div className="modal-actions"><button className="secondary" onClick={() => setShowCreate(false)}>Cancel</button><button className="primary" onClick={() => setShowCreate(false)}>Create project <ArrowUpRight size={14}/></button></div></div></div>}

      <style jsx>{`
        .studio-shell{min-height:100vh;background:#08090b;color:#f5f5f5;display:flex;font-family:Arial,sans-serif}.sidebar{width:248px;position:fixed;inset:0 auto 0 0;border-right:1px solid #202126;background:#0c0d10;padding:20px 14px;display:flex;flex-direction:column;z-index:10}.brand{display:flex;align-items:center;gap:11px;padding:6px 9px 27px}.mark{width:35px;height:35px;border-radius:10px;background:#f4f4f4;color:#090909;display:grid;place-items:center;font-weight:900}.brand b{font-size:14px}.brand b span{color:#ff6428}.brand small,.account small{display:block;color:#5d6068;font-size:8px;letter-spacing:1.4px;margin-top:3px}.sidebar>label{padding:0 10px 8px;color:#555860;font-size:9px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase}.sidebar .tools{margin-top:24px}.sidebar nav{display:grid;gap:2px}.sidebar nav button{border:0;background:none;color:#858791;padding:10px;border-radius:9px;display:flex;align-items:center;gap:11px;font-size:11px;cursor:pointer}.sidebar nav button:hover,.sidebar nav button.active{background:#18191e;color:#fff}.sidebar nav button.active{box-shadow:inset 2px 0 #ff6428}.sidebar nav i{margin-left:auto;color:#ff7040;font-size:9px;font-style:normal}.account{margin-top:auto;border:1px solid #23242a;background:#121318;border-radius:13px;padding:11px;display:flex;align-items:center;gap:9px}.avatar{width:29px;height:29px;border-radius:9px;background:linear-gradient(135deg,#ff8b55,#7e2d16);display:grid;place-items:center;font-size:11px;font-weight:800}.account div:nth-child(2){flex:1;min-width:0}.account b{font-size:9px;display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.account small{font-size:8px;letter-spacing:0}.content{margin-left:248px;width:calc(100% - 248px)}header{height:72px;border-bottom:1px solid #202126;display:flex;align-items:center;justify-content:space-between;padding:0 34px;position:sticky;top:0;background:rgba(8,9,11,.9);backdrop-filter:blur(18px);z-index:5}header small{font-size:8px;color:#575a62;letter-spacing:1.5px}header h1{font-size:16px;margin:5px 0 0;letter-spacing:-.4px}.actions{display:flex;gap:8px;align-items:center}.search{width:230px;height:34px;border:1px solid #27282e;border-radius:8px;background:#0d0e11;display:flex;align-items:center;gap:7px;padding:0 9px;color:#62646d}.search input{border:0;outline:0;background:none;color:#ddd;width:100%;font-size:10px}.icon,.secondary,.primary{height:34px;border-radius:8px;display:flex;align-items:center;justify-content:center;gap:7px;padding:0 11px;font-size:10px;cursor:pointer}.icon,.secondary{border:1px solid #282930;background:#111216;color:#a1a3ac}.icon{width:34px;padding:0}.primary{border:0;background:#f3f3f3;color:#090909;font-weight:700}.body{max-width:1420px;margin:auto;padding:34px}.hero{display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:22px}.hero span,.section-head span,.ai>span,.modal-box>span{font-size:8px;letter-spacing:1.7px;color:#777a84;font-weight:800}.hero h2{font-size:30px;letter-spacing:-1.4px;margin:8px 0 6px}.hero p{font-size:11px;color:#6e7079;margin:0;line-height:1.7}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.metric,.card,.project{border:1px solid #222329;background:linear-gradient(180deg,#111216,#0f1013);border-radius:14px}.metric{padding:17px}.metric>div{display:flex;justify-content:space-between;color:#686a73;font-size:9px}.metric strong{display:block;font-size:25px;letter-spacing:-1px;margin-top:17px}.metric small{display:block;color:#555861;font-size:9px;margin-top:3px}.two-col{display:grid;grid-template-columns:2fr 1fr;gap:10px;margin-top:10px}.card{padding:18px}.heading{display:flex;justify-content:space-between}.heading h3{font-size:12px;margin:0}.heading p{font-size:9px;color:#565861;margin:5px 0 0}.heading em{font-style:normal;border:1px solid #292a30;background:#17181c;border-radius:20px;color:#777983;font-size:8px;padding:5px 8px}.bars{height:150px;display:flex;align-items:flex-end;gap:8px;border-bottom:1px solid #24252b;margin-top:17px;padding:0 8px}.bar{flex:1;background:linear-gradient(180deg,#ff8756,#ff6428);border-radius:4px 4px 0 0;opacity:.78}.axis{display:flex;justify-content:space-between;color:#42444c;font-size:8px;margin-top:8px}.orange{color:#ff6428}.attention{display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid #1e1f24}.attention:last-child{border:0}.attention>b{width:27px;height:27px;border-radius:8px;background:#17181c;display:grid;place-items:center;color:#ff7040;font-size:10px}.attention div{flex:1}.attention strong,.attention small{display:block}.attention strong{font-size:10px}.attention small{font-size:8px;color:#555861;margin-top:3px}.section-head{display:flex;justify-content:space-between;align-items:flex-end;margin:31px 0 12px}.section-head h2{font-size:19px;letter-spacing:-.6px;margin:6px 0 0}.section-head button{border:0;background:none;color:#777983;font-size:9px;display:flex;gap:5px;align-items:center;cursor:pointer}.projects{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.project{overflow:hidden}.cover{height:118px;padding:12px;display:flex;justify-content:space-between;position:relative;overflow:hidden}.cover:after{content:'';position:absolute;inset:25% -20% -40%;background:radial-gradient(circle,rgba(255,255,255,.15),transparent 62%)}.cover.orange{background:linear-gradient(135deg,#29201d,#111214 58%,#35170e)}.cover.purple{background:linear-gradient(135deg,#211b2c,#111214 58%,#29153a)}.cover.blue{background:linear-gradient(135deg,#17252d,#101214 58%,#10242c)}.cover.green{background:linear-gradient(135deg,#18251e,#111214 58%,#12281e)}.cover>span,.cover>svg,.cover>b{z-index:1}.cover>span{font-size:8px;color:#aaa}.cover>b{position:absolute;left:12px;bottom:12px;font-size:20px;letter-spacing:-1px}.project-body{padding:14px}.meta,.progress-label,.foot{display:flex;justify-content:space-between;align-items:center}.meta{color:#555861;font-size:8px}.meta em{font-style:normal;border:1px solid #292a30;border-radius:20px;padding:4px 7px;color:#999}.project h3{font-size:11px;min-height:27px;margin:11px 0 16px}.progress-label{color:#555861;font-size:8px}.progress-label b{color:#a7a8af}.track{height:4px;background:#24252a;border-radius:20px;overflow:hidden;margin-top:6px}.track i{display:block;height:100%;background:#ff6428;border-radius:20px}.foot{margin-top:12px;color:#555861;font-size:8px}.bottom{margin-bottom:25px}.task{display:flex;align-items:center;gap:10px;padding:11px 0;border-bottom:1px solid #1f2025;color:#555861}.task:last-child{border:0}.task div{flex:1}.task strong,.task small{display:block}.task strong{font-size:10px;color:#ddd}.task small{font-size:8px;margin-top:3px}.task em{font-style:normal;font-size:8px}.task em.high{color:#ff7040}.ai{display:flex;flex-direction:column;align-items:flex-start}.ai-icon{width:36px;height:36px;border-radius:11px;background:#231812;color:#ff7040;display:grid;place-items:center;margin-bottom:18px}.ai h3{font-size:16px;line-height:1.3;max-width:330px;margin:9px 0}.ai p{font-size:9px;color:#666871;line-height:1.7;margin:0 0 18px;max-width:370px}.modal{position:fixed;inset:0;background:rgba(0,0,0,.72);backdrop-filter:blur(10px);z-index:30;display:grid;place-items:center;padding:20px}.modal-box{width:min(430px,100%);border:1px solid #2a2b31;background:#111216;border-radius:18px;padding:25px;box-shadow:0 30px 80px #000}.modal-box h2{font-size:22px;margin:7px 0}.modal-box p{font-size:10px;color:#6a6c75;line-height:1.7}.modal-box input{width:100%;height:42px;border:1px solid #292a30;background:#0b0c0f;color:#eee;border-radius:9px;padding:0 12px;margin-top:8px;outline:0;font-size:11px}.modal-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:17px}@media(max-width:1100px){.projects{grid-template-columns:repeat(2,1fr)}.metrics{grid-template-columns:repeat(2,1fr)}}@media(max-width:800px){.sidebar{width:68px;padding:14px 8px}.brand>div:last-child,.sidebar>label,.sidebar nav span,.sidebar nav i,.account>div:nth-child(2),.account>svg{display:none}.brand{justify-content:center}.sidebar nav button,.account{justify-content:center}.content{margin-left:68px;width:calc(100% - 68px)}header{padding:0 18px}.search{display:none}.body{padding:22px 18px}.two-col{grid-template-columns:1fr}}@media(max-width:560px){.metrics,.projects{grid-template-columns:1fr}.hero{display:block}.hero .secondary{margin-top:15px}.studio-shell{font-size:14px}header{padding:14px 16px;height:auto}.actions .icon{display:none}}
      `}</style>
    </main>
  );
}
