import Link from "next/link";
import { Shell } from "@/components/Site";
import { coreServices } from "@/lib/service-catalog";

export default function Home() {
 return <Shell>
  <main>
   <section className="hero"><div className="container hero-grid">
    <div><div className="eyebrow"><span style={{color:"var(--blue)"}}>ASSESS</span> &nbsp;/&nbsp; <span style={{color:"var(--red)"}}>IMPROVE</span></div>
    <h1>Offensive Mindset.<br/><span className="blue">Deffensive</span> <span className="red">Strength.</span></h1>
    <p className="lead">HexFort Security provides authorized security assessments, practical findings and remediation guidance for your agreed scope.</p>
    <div className="actions"><Link className="btn" href="/contact">Get a Quote →</Link><Link className="btn secondary" href="/services">Explore Services</Link></div>
    </div>
    <img className="hero-image" src="/herojpeg.jpeg" alt="Cybersecurity team reviewing security risks and defenses" />
   </div></section>
   <div className="trust-strip"><div className="container trust-grid">
    {[["WEB VAPT","OWASP WSTG-aligned testing",""],["NETWORK VAPT","Internal and external scope","red"],["CONFIGURATION","CIS baseline review",""],["PHISHING","Campaign and awareness report","red"]].map(x=><div className="trust-item" key={x[0]}><span className={"dot "+x[2]}></span><div><strong>{x[0]}</strong><span>{x[1]}</span></div></div>)}
   </div></div>
   <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">WHAT WE DO</div><h2>Core Services</h2><p className="muted">Practical security assessments designed around your agreed scope and objectives.</p></div><Link className="btn secondary" href="/services">View All Services →</Link></div>
   <div className="cards">{coreServices.map(s=><article className="service-card" key={s.slug}><div className="icon-box">{s.icon}</div><h3>{s.name}</h3><p>{s.short_description}</p><small className="muted">Estimated timeline: {s.timeline}</small><div className="card-bottom"><Link href={"/services#"+s.slug}>Learn More ↗</Link><Link href={"/contact?service="+encodeURIComponent(s.name)}>Request a quote</Link></div></article>)}</div></div></section>
   <section className="section" style={{background:"#07111a",borderBlock:"1px solid var(--line)"}}><div className="container split"><div className="feature-panel"><div className="eyebrow">AUTHORIZED ASSESSMENTS</div><h2>See the gaps.<br/>Strengthen security.</h2><p className="muted">Assess agreed systems, validate findings and give your team practical ways to improve security.</p><div className="actions"><Link className="btn" href="/methodology">Our Methodology →</Link></div></div><div><div className="eyebrow">WHY HEXFORT</div><h2>Clear scope.<br/>Practical outcomes.</h2><ul className="checklist"><li><span className="check">✓</span> Scope and rules of engagement agreed in advance</li><li><span className="check">✓</span> Findings prioritized with clear impact context</li><li><span className="check">✓</span> Remediation guidance designed for action</li><li><span className="check">✓</span> Confidential handling of client information</li></ul><p className="form-note">Service availability and engagement terms are confirmed during scoping.</p></div></div></section>
   <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">OUR APPROACH</div><h2>A structured path to stronger security</h2></div></div><div className="steps">{[["01","Plan","Agree objectives, authorization and scope."],["02","Assess","Test the approved environment safely."],["03","Report","Explain findings, impact and evidence."],["04","Improve","Prioritize fixes and validate remediation where agreed."]].map(s=><div className="step" key={s[0]}><b>{s[0]} / STEP</b><h3>{s[1]}</h3><p>{s[2]}</p></div>)}</div></div></section>
   <section className="section"><div className="container"><div className="cta"><div><div className="eyebrow">START A CONVERSATION</div><h2>Ready to strengthen your security?</h2><p className="muted">Tell us about your goals and request a scoped proposal.</p></div><Link className="btn" href="/contact">Request a Quote →</Link></div></div></section>
  </main>
 </Shell>
}
