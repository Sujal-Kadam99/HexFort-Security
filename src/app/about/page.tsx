import { PageHero, Shell } from "@/components/Site";

const team = [
  {
    name: "Sujal Kadam",
    role: "Founder & Lead Security Consultant",
    linkedin: "https://www.linkedin.com/in/sujal-kadam-939616331/",
    bullets: [
      "Works across all four service lines — Red Team, Blue Team, VAPT and Consulting",
      "Certified Ethical Hacker (CEH) — EC-Council",
      "BSc Cybersecurity & Digital Science",
      "Creator of AihaX, the AI-assisted recon platform powering engagements",
    ],
  },
  {
    name: "Shamshersingh Hada",
    role: "VAPT Specialist — Network & Web",
    linkedin: "https://www.linkedin.com/in/shamshersingh-hada-ab8459359/",
    bullets: [
      "Leads Web Application VAPT engagements",
      "Leads Network VAPT engagements",
      "Certified Ethical Hacker (CEH) — EC-Council",
      "Vulnerability identification and validation",
    ],
  },
  {
    name: "Vedant Thakare",
    role: "Defensive Security Specialist",
    linkedin: "https://www.linkedin.com/in/vedant-thakare-0343953b7/",
    bullets: [
      "Leads Secure Configuration Review engagements",
      "Leads Phishing Simulation campaigns",
      "Certified Ethical Hacker (CEH) — EC-Council",
      "Baseline-control and human-layer assessments",
    ],
  },
  {
    name: "Harsh Karkhile",
    role: "Co-Founder — Marketing & Social Media",
    linkedin: "https://www.linkedin.com/in/harsh-karkhile-9430a6397/",
    bullets: [
      "Co-Founder, HexFort Security",
      "Manages marketing and social media presence",
      "Client communication and outreach",
    ],
  },
];

export default function About() {
  return (
    <Shell>
      <PageHero
        eyebrow="ABOUT HEXFORT"
        title="Offensive insight. Defensive resilience."
        desc="HexFort Security helps organizations understand their security exposure and improve their ability to prevent, detect and respond — through authorized, AI-assisted assessments."
      />
      <div className="content">
        <div className="container split">
          <div>
            <h2>
              Think Like an Attacker.
              <br />
              <span style={{ color: "var(--blue)" }}>Build Like a Defender.</span>
            </h2>
            <p className="muted">
              We bring together offensive and defensive security perspectives to turn assessment findings into practical next steps. Engagement scope, deliverables and timelines are agreed before testing starts.
            </p>
            <p className="muted">
              Our engagements are supported by <strong>AihaX</strong> — an AI-assisted reconnaissance platform that accelerates attack surface mapping, subdomain enumeration and open-source intelligence gathering, so testing effort is focused where it matters.
            </p>
          </div>
          <div className="feature-panel">
            <div className="eyebrow">OUR PRINCIPLES</div>
            <ul className="checklist">
              <li><span className="check">✓</span> Clear scope and authorization</li>
              <li><span className="check">✓</span> Evidence-based findings</li>
              <li><span className="check">✓</span> Practical remediation guidance</li>
              <li><span className="check">✓</span> Confidentiality and responsible handling</li>
            </ul>
          </div>
        </div>

        <div className="container" style={{ marginTop: 56 }}>
          <div className="eyebrow">THE TEAM</div>
          <div className="cards" style={{ gridTemplateColumns: "repeat(2,1fr)", marginTop: 16 }}>
            {team.map((m) => (
              <article className="service-card" key={m.name}>
                <h3 style={{ marginBottom: 2 }}>{m.name}</h3>
                <p className="muted" style={{ marginTop: 0, marginBottom: 14 }}>{m.role}</p>
                <ul className="checklist" style={{ margin: "0 0 20px" }}>
                  {m.bullets.map((b) => (
                    <li key={b}><span className="check">✓</span> {b}</li>
                  ))}
                </ul>
                <div className="card-bottom">
                  <a href={m.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Shell>
  );
}
