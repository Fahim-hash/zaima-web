import Link from 'next/link';

export default async function ReviewPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = slug.replace(/-/g, ' ');
  return (
    <main style={{minHeight:'100vh',background:'#08090b',color:'#f5f5f5',padding:'48px',fontFamily:'Arial,sans-serif'}}>
      <div style={{maxWidth:900,margin:'auto'}}>
        <div style={{color:'#777',fontSize:10,letterSpacing:2,textTransform:'uppercase'}}>tometu.studio · client review</div>
        <h1 style={{fontSize:42,letterSpacing:-2,margin:'12px 0 8px',textTransform:'capitalize'}}>{title}</h1>
        <p style={{color:'#777',fontSize:13}}>Review the latest creative direction, leave feedback, or approve a version.</p>
        <div style={{marginTop:32,border:'1px solid #25262b',borderRadius:18,padding:28,background:'#111216'}}>
          <div style={{height:380,borderRadius:12,background:'linear-gradient(135deg,#1d1f23,#111216 55%,#35170e)',display:'grid',placeItems:'center',color:'#666'}}>Design preview</div>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:22,gap:12,flexWrap:'wrap'}}>
            <div><strong style={{fontSize:14}}>Version 7</strong><div style={{color:'#666',fontSize:11,marginTop:5}}>Latest client-ready version</div></div>
            <div style={{display:'flex',gap:8}}>
              <button style={{border:'1px solid #303138',background:'#17181c',color:'#ddd',borderRadius:9,padding:'10px 14px'}}>Request changes</button>
              <button style={{border:0,background:'#f4f4f4',color:'#090909',borderRadius:9,padding:'10px 16px',fontWeight:700}}>Approve version</button>
            </div>
          </div>
        </div>
        <Link href="/studio" style={{display:'inline-block',marginTop:22,color:'#777',fontSize:11}}>← Back to Studio</Link>
      </div>
    </main>
  );
}
