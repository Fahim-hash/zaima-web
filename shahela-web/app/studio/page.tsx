'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ArrowUpRight, Bell, CheckCircle2, ChevronRight, Clock3, CreditCard,
  FileCheck2, FolderKanban, LayoutDashboard, Menu, MessageSquare,
  Plus, Search, Settings2, Sparkles, UploadCloud, Users, X, Zap
} from 'lucide-react';

type Project = {
  slug: string;
  title: string;
  clientName: string;
  clientEmail: string;
  price: string;
  status: string;
  version: string;
  updatedAt: string;
};

const statusMeta: Record<string, { label: string; tone: string }> = {
  draft: { label: 'Draft', tone: 'muted' },
  sent: { label: 'Sent', tone: 'blue' },
  viewed: { label: 'Viewed', tone: 'blue' },
  approved: { label: 'Approved', tone: 'green' },
  payment_submitted: { label: 'Payment review', tone: 'orange' },
  payment_verified: { label: 'Paid', tone: 'green' },
  revision_requested: { label: 'Revision', tone: 'purple' },
  delivered: { label: 'Delivered', tone: 'green' },
};

const nav = [
  { label: 'Overview', icon: LayoutDashboard, href: '/studio' },
  { label: 'Projects', icon: FolderKanban, href: '/studio/projects' },
  { label: 'Payments', icon: CreditCard, href: '/studio/payments' },
  { label: 'Deliveries', icon: UploadCloud, href: '/studio/deliveries' },
];

function formatDate(value: string) {
  if (!value) return '—';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
}

export default function StudioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  async function load() {
    setLoading(true);
    try {
      const response = await fetch('/api/studio/projects', { cache: 'no-store' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Unable to load projects');
      setProjects(data.projects || []);
      setError('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load projects');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  const filtered = useMemo(
    () => projects.filter((project) => (
      `${project.title} ${project.clientName} ${project.clientEmail}`.toLowerCase().includes(query.toLowerCase())
    )),
    [projects, query],
  );

  const attention = projects.filter((p) => ['payment_submitted', 'revision_requested'].includes(p.status)).length;
  const approved = projects.filter((p) => p.status === 'approved').length;
  const delivered = projects.filter((p) => p.status === 'delivered').length;

  return (
    <main className="studio">
      <aside className={`sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="brand"><span className="brand-mark">T</span><div><strong>tometu<span>.</span>studio</strong><small>CLIENT DELIVERY OS</small></div></div>
        <div className="workspace">FAHIM&apos;S WORKSPACE</div>
        <nav>
          {nav.map(({ label, icon: Icon, href }) => <a key={label} className={label === 'Overview' ? 'active' : ''} href={href}><Icon size={16}/><span>{label}</span></a>)}
        </nav>
        <div className="side-section">WORKFLOW</div>
        <div className="workflow">
          <div><span className="dot orange"/>Create project</div>
          <div><span className="dot blue"/>Client review</div>
          <div><span className="dot green"/>Payment</div>
          <div><span className="dot purple"/>Delivery</div>
        </div>
        <div className="side-bottom">
          <a href="/studio/payments"><CreditCard size={15}/> Payment review <span>{attention}</span></a>
          <div className="account"><div className="avatar">F</div><div><b>Fahim</b><small>Administrator</small></div><Settings2 size={15}/></div>
        </div>
      </aside>

      {mobileOpen && <button className="scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)}><X size={20}/></button>}

      <section className="content">
        <header className="topbar">
          <button className="mobile-menu" onClick={() => setMobileOpen(true)}><Menu size={18}/></button>
          <div><span>WORKSPACE / OVERVIEW</span><h1>Good evening, Fahim.</h1></div>
          <div className="actions">
            <div className="search"><Search size={15}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search projects, clients…" /></div>
            <button className="round"><Bell size={16}/></button>
            <a className="new-button" href="/studio/projects/new"><Plus size={16}/> New project</a>
          </div>
        </header>

        <div className="body">
          <section className="hero">
            <div>
              <span className="eyebrow">CLIENT DELIVERY OS</span>
              <h2>From final file to <em>paid.</em></h2>
              <p>One link for review, approval, payment and delivery — while you keep the files in Drive and the records in Sheets.</p>
            </div>
            <a className="hero-action" href="/studio/projects/new"><Plus size={16}/> Start a project</a>
          </section>

          <section className="metrics">
            <div className="metric"><div><span>Projects</span><FolderKanban size={15}/></div><strong>{projects.length}</strong><small>Total client projects</small></div>
            <div className="metric"><div><span>Needs attention</span><Zap size={15}/></div><strong>{attention}</strong><small>Payment or revision</small></div>
            <div className="metric"><div><span>Awaiting approval</span><FileCheck2 size={15}/></div><strong>{approved}</strong><small>Approved projects</small></div>
            <div className="metric"><div><span>Delivered</span><CheckCircle2 size={15}/></div><strong>{delivered}</strong><small>Completed deliveries</small></div>
          </section>

          <section className="pipeline card">
            <div className="section-head"><div><span className="eyebrow">LIVE PIPELINE</span><h3>Client work</h3></div><a href="/studio/projects">View all <ArrowUpRight size={14}/></a></div>
            {error && <div className="error">{error}</div>}
            {loading ? <div className="empty">Loading your projects…</div> :
              filtered.length ? <div className="table-wrap"><table><thead><tr><th>Project</th><th>Client</th><th>Status</th><th>Price</th><th>Updated</th><th/></tr></thead><tbody>
                {filtered.slice(0, 8).map((project) => { const meta = statusMeta[project.status] || statusMeta.draft; return <tr key={project.slug}>
                  <td><strong>{project.title}</strong><small>v{project.version || '1'} · {project.clientEmail}</small></td>
                  <td>{project.clientName}</td>
                  <td><span className={`status ${meta.tone}`}><i/>{meta.label}</span></td>
                  <td className="price">৳ {project.price}</td>
                  <td>{formatDate(project.updatedAt)}</td>
                  <td><a className="arrow" href={`/studio/review/${project.slug}`}><ChevronRight size={16}/></a></td>
                </tr>; })}
              </tbody></table></div> : <div className="empty"><FolderKanban size={25}/><strong>No projects yet</strong><span>Create your first client delivery project.</span><a href="/studio/projects/new">Create project</a></div>}
          </section>

          <section className="bottom-grid">
            <div className="card flow">
              <div className="section-head"><div><span className="eyebrow">HOW IT WORKS</span><h3>Your delivery flow</h3></div><Sparkles size={17}/></div>
              {[
                ['01','Create','Upload final assets and set your price.','orange'],
                ['02','Review','Client previews the work and approves or requests changes.','blue'],
                ['03','Payment','Client submits payment details for your verification.','green'],
                ['04','Deliver','Approve the payment and Resend sends the final links.','purple'],
              ].map(([n,title,desc,tone])=><div className="flow-row" key={n}><b className={`flow-number ${tone}`}>{n}</b><div><strong>{title}</strong><span>{desc}</span></div><ChevronRight size={15}/></div>)}
            </div>
            <div className="card quick">
              <span className="eyebrow">QUICK ACTIONS</span><h3>Keep things moving.</h3>
              <p>Start a client project, check payment submissions or review a delivery.</p>
              <a href="/studio/projects/new"><Plus size={15}/> New project</a>
              <a href="/studio/payments"><CreditCard size={15}/> Review payments</a>
              <a href="/studio/projects"><FolderKanban size={15}/> Open projects</a>
            </div>
          </section>
        </div>
      </section>

      <style jsx>{`
        .studio{min-height:100vh;background:#07080a;color:#f5f5f6;display:flex;font-family:Arial,sans-serif}.sidebar{width:252px;position:fixed;inset:0 auto 0 0;background:#0b0c0f;border-right:1px solid #202127;padding:20px 14px;display:flex;flex-direction:column;z-index:40}.brand{display:flex;align-items:center;gap:10px;padding:3px 8px 30px}.brand-mark{width:34px;height:34px;border-radius:10px;background:#f3f3f3;color:#08090a;display:grid;place-items:center;font-weight:900}.brand strong{font-size:13px}.brand strong span{color:#ff6a2b}.brand small{display:block;color:#555861;font-size:7px;letter-spacing:1.6px;margin-top:4px}.workspace,.side-section{font-size:8px;letter-spacing:1.7px;color:#4f525b;font-weight:800;padding:0 10px 9px}.sidebar nav{display:grid;gap:2px}.sidebar nav a,.side-bottom>a{height:38px;padding:0 10px;border-radius:9px;color:#777a84;text-decoration:none;display:flex;align-items:center;gap:10px;font-size:10px}.sidebar nav a:hover,.sidebar nav a.active{background:#17181c;color:#fff}.sidebar nav a.active{box-shadow:inset 2px 0 #ff6a2b}.side-section{margin-top:28px}.workflow{display:grid;gap:13px;padding:5px 10px;color:#696c75;font-size:9px}.workflow div{display:flex;align-items:center;gap:9px}.dot{width:7px;height:7px;border-radius:50%;background:#555}.dot.orange{background:#ff6a2b}.dot.blue{background:#6f91ff}.dot.green{background:#61ce91}.dot.purple{background:#a983ff}.side-bottom{margin-top:auto;display:grid;gap:10px}.side-bottom>a{background:#111216;border:1px solid #23242a}.side-bottom>a span{margin-left:auto;color:#ff8050}.account{border:1px solid #23242a;background:#111216;border-radius:12px;padding:10px;display:flex;align-items:center;gap:9px}.avatar{width:29px;height:29px;border-radius:9px;background:linear-gradient(135deg,#ff8b55,#7c2b15);display:grid;place-items:center;font-size:10px;font-weight:800}.account>div:nth-child(2){flex:1}.account b,.account small{display:block}.account b{font-size:9px}.account small{font-size:8px;color:#565963;margin-top:3px}.content{margin-left:252px;width:calc(100% - 252px)}.topbar{height:76px;border-bottom:1px solid #202127;display:flex;align-items:center;justify-content:space-between;padding:0 32px;position:sticky;top:0;background:rgba(7,8,10,.84);backdrop-filter:blur(20px);z-index:20}.topbar>div:first-of-type>span{font-size:8px;letter-spacing:1.7px;color:#555861}.topbar h1{font-size:16px;margin:5px 0 0;letter-spacing:-.3px}.actions{display:flex;align-items:center;gap:8px}.search{height:36px;width:260px;border:1px solid #292a31;background:#0c0d10;border-radius:9px;display:flex;align-items:center;gap:8px;padding:0 10px;color:#5f626c}.search input{background:none;border:0;outline:0;color:#eee;width:100%;font-size:10px}.round{width:36px;height:36px;border:1px solid #292a31;background:#111216;color:#9c9ea6;border-radius:9px;display:grid;place-items:center}.new-button,.hero-action{height:36px;padding:0 13px;border-radius:9px;background:#f3f3f4;color:#08090a;text-decoration:none;font-size:10px;font-weight:800;display:flex;align-items:center;gap:7px}.body{max-width:1480px;margin:auto;padding:34px}.hero{display:flex;align-items:flex-end;justify-content:space-between;gap:30px;margin-bottom:25px}.hero .eyebrow{display:block}.eyebrow{font-size:8px;letter-spacing:1.9px;color:#6b6e77;font-weight:800}.hero h2{font-size:36px;letter-spacing:-1.8px;margin:9px 0 9px}.hero h2 em{font-style:normal;color:#ff6a2b}.hero p{font-size:11px;line-height:1.7;color:#666a73;max-width:650px;margin:0}.hero-action{height:40px;background:#16171b;color:#ddd;border:1px solid #2b2c32}.metrics{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}.metric,.card{border:1px solid #222329;background:linear-gradient(180deg,#111216,#0e0f12);border-radius:15px}.metric{padding:17px}.metric>div{display:flex;justify-content:space-between;color:#62656e;font-size:9px}.metric strong{display:block;font-size:28px;letter-spacing:-1.3px;margin-top:18px}.metric small{display:block;color:#50535c;font-size:8px;margin-top:4px}.card{padding:20px}.pipeline{margin-top:10px}.section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:15px;margin-bottom:17px}.section-head h3{font-size:15px;margin:6px 0 0}.section-head>a{color:#747780;text-decoration:none;font-size:9px;display:flex;align-items:center;gap:5px}.table-wrap{overflow:auto}table{width:100%;border-collapse:collapse;min-width:760px}th{text-align:left;color:#4f525a;font-size:8px;font-weight:700;text-transform:uppercase;letter-spacing:1px;padding:9px 12px;border-bottom:1px solid #24252b}td{padding:14px 12px;border-bottom:1px solid #1d1e23;color:#858791;font-size:9px}td:first-child{color:#eee}td strong,td small{display:block}td small{color:#4f525a;font-size:8px;margin-top:4px}.price{color:#ddd;font-weight:700}.status{display:inline-flex;align-items:center;gap:6px;border:1px solid #2a2b31;border-radius:999px;padding:5px 8px;color:#aaa;font-size:8px}.status i{width:5px;height:5px;border-radius:50%;background:#777}.status.orange i{background:#ff7a43}.status.green i{background:#62d291}.status.blue i{background:#7c98ff}.status.purple i{background:#a783ff}.arrow{width:28px;height:28px;border:1px solid #292a30;border-radius:8px;color:#777;display:grid;place-items:center}.empty{min-height:220px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;color:#60636d;font-size:10px}.empty strong{color:#b8bac0;font-size:12px}.empty a{margin-top:8px;color:#ddd;text-decoration:none;border:1px solid #303139;border-radius:8px;padding:9px 12px}.error{padding:12px;border:1px solid #5a3030;background:#1d1214;color:#ffb4ae;border-radius:9px;font-size:10px;margin-bottom:12px}.bottom-grid{display:grid;grid-template-columns:1.5fr 1fr;gap:10px;margin-top:10px}.flow-row{display:flex;align-items:center;gap:12px;padding:12px 0;border-bottom:1px solid #1e1f24}.flow-row:last-child{border:0}.flow-number{width:31px;height:31px;border-radius:9px;display:grid;place-items:center;font-size:8px}.flow-number.orange{background:#26170f;color:#ff8050}.flow-number.blue{background:#121a2d;color:#7c9aff}.flow-number.green{background:#10251a;color:#69d79a}.flow-number.purple{background:#1e1630;color:#ad8aff}.flow-row>div{flex:1}.flow-row strong,.flow-row span{display:block}.flow-row strong{font-size:10px}.flow-row span{font-size:8px;color:#555861;margin-top:3px;line-height:1.5}.flow-row>svg{color:#45474f}.quick{display:flex;flex-direction:column;align-items:flex-start}.quick h3{font-size:18px;margin:8px 0}.quick p{font-size:9px;line-height:1.7;color:#62656e;max-width:310px;margin:0 0 16px}.quick>a{width:100%;box-sizing:border-box;padding:11px;border:1px solid #27282e;background:#111216;border-radius:9px;color:#aaa;text-decoration:none;font-size:9px;display:flex;align-items:center;gap:8px;margin-top:7px}.quick>a:hover{color:#fff;border-color:#3b3c44}.mobile-menu,.scrim{display:none}@media(max-width:1050px){.metrics{grid-template-columns:repeat(2,1fr)}.bottom-grid{grid-template-columns:1fr}.search{width:210px}}@media(max-width:800px){.sidebar{transform:translateX(-100%);transition:.2s}.sidebar.open{transform:none}.content{margin-left:0;width:100%}.topbar{padding:0 18px}.mobile-menu{display:grid;width:34px;height:34px;border:1px solid #292a31;background:#111216;color:#aaa;border-radius:8px;place-items:center;margin-right:10px}.topbar{justify-content:flex-start}.topbar>div:first-of-type{flex:1}.topbar .actions .search,.topbar .actions .round{display:none}.scrim{display:block;position:fixed;inset:0;border:0;background:rgba(0,0,0,.55);z-index:30}.body{padding:24px 16px}.hero{display:block}.hero-action{margin-top:17px;width:max-content}}@media(max-width:560px){.metrics{grid-template-columns:1fr 1fr}.new-button{font-size:0;width:36px;padding:0;justify-content:center}.hero h2{font-size:31px}.card{padding:16px}.metrics .metric strong{font-size:24px}}
      `}</style>
    </main>
  );
}
