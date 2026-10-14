import Link from "next/link";
import { Shell } from "@/components/Site";

const services = [
  {icon:"◎",color:"red",name:"Red Teaming",desc:"Simulate realistic adversary activity to evaluate people, processes and technical controls.",price:"Request a quote",href:"/services#red-teaming"},
  {icon:"◈",color:"",name:"Blue Teaming",desc:"Improve detection, response readiness, defensive controls and incident handling.",price:"Request a quote",href:"/services#blue-teaming"},
  {icon:"⌘",color:"",name:"Web Application VAPT",desc:"Identify and validate application vulnerabilities with actionable remediation guidance.",price:"Packages available",href:"/services#web-vapt"},
  {icon:"⌘",color:"red",name:"Network VAPT",desc:"Assess in-scope network infrastructure and hosts for exploitable weaknesses.",price:"Packages available",href:"/services#network-vapt"},
  {icon:"▣",color:"",name:"Secure Configuration Review",desc:"Review security-relevant configuration against agreed baselines and scope.",price:"Request a quote",href:"/services#configuration"},
  {icon:"◉",color:"red",name:"Phishing Simulation",desc:"Assess human-layer resilience through authorized, carefully scoped simulations.",price:"Request a quote",href:"/services#phishing"}
];
export default function Home() {
 return <Shell>
  <main>
   <section className="hero"><div className="container hero-grid">
    <div><div className="eyebrow"><span style={{color:"var(--red)"}}>RED TEAM</span> &nbsp;/&nbsp; <span style={{color:"var(--blue)"}}>BLUE TEAM</span></div>
    <h1>Offensive Mindset.<br/><span className="blue">Defensive</span> <span className="red">Strength.</span></h1>
    <p className="lead">HexFort Security helps organizations find weaknesses, strengthen defenses and build resilience through authorized offensive and defensive security services.</p>
    <div className="actions"><Link className="btn" href="/contact">Get a Quote →</Link><Link className="btn secondary" href="/services">Explore Services</Link></div>
    </div>
    <img className="hero-image" src="/herojpeg.jpeg" alt="Red Team and Blue Team cybersecurity operations" />
   </div></section>
   <div className="trust-strip"><div className="container trust-grid">
    {[["RED TEAM","Adversary simulation","red"],["BLUE TEAM","Defensive operations",""],["VAPT","External & internal testing",""],["CONSULTING","Security strategy & advisory",""]].map(x=><div className="trust-item" key={x[0]}><span className={"dot "+x[2]}></span><div><strong>{x[0]}</strong><span>{x[1]}</span></div></div>)}
   </div></div>
   <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">WHAT WE DO</div><h2>Our Services</h2><p className="muted">Practical security assessments designed around your agreed scope and objectives.</p></div><Link className="btn secondary" href="/services">View All Services →</Link></div>
   <div className="cards">{services.map(s=><article className="service-card" key={s.name}><div className={"icon-box "+s.color}>{s.icon}</div><h3>{s.name}</h3><p>{s.desc}</p><div className="card-bottom"><Link href={s.href}>Learn More ↗</Link><span>{s.price}</span></div></article>)}</div></div></section>
   <section className="section" style={{background:"#07111a",borderBlock:"1px solid var(--line)"}}><div className="container split"><div className="feature-panel"><div className="eyebrow">OFFENSIVE / DEFENSIVE</div><h2>See the gaps.<br/>Strengthen the response.</h2><p className="muted">A balanced approach considers how weaknesses can be reached and how defenders can detect, contain and remediate them.</p><div className="actions"><Link className="btn" href="/methodology">Our Methodology →</Link></div></div><div><div className="eyebrow">WHY HEXFORT</div><h2>Real-world thinking.<br/>Practical outcomes.</h2><ul className="checklist"><li><span className="check">✓</span> Scope and rules of engagement agreed in advance</li><li><span className="check">✓</span> Findings prioritized with clear impact context</li><li><span className="check">✓</span> Remediation guidance designed for action</li><li><span className="check">✓</span> Confidential handling of client information</li></ul><p className="form-note">Service availability and engagement terms are confirmed during scoping.</p></div></div></section>
   <section className="section"><div className="container"><div className="section-head"><div><div className="eyebrow">OUR APPROACH</div><h2>A structured path to stronger security</h2></div></div><div className="steps">{[["01","Plan","Agree objectives, authorization and scope."],["02","Assess","Test the approved environment safely."],["03","Report","Explain findings, impact and evidence."],["04","Improve","Prioritize fixes and validate remediation where agreed."]].map(s=><div className="step" key={s[0]}><b>{s[0]} / STEP</b><h3>{s[1]}</h3><p>{s[2]}</p></div>)}</div></div></section>
   <section className="section"><div className="container"><div className="cta"><div><div className="eyebrow">START A CONVERSATION</div><h2>Ready to strengthen your security?</h2><p className="muted">Tell us about your goals and request a scoped proposal.</p></div><Link className="btn" href="/contact">Request a Quote →</Link></div></div></section>
  </main>
 </Shell>
}
