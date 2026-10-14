import Link from "next/link";

export function Header() {
  return <header className="site-header"><div className="container nav">
    <Link className="brand" href="/"><img src="/hexfort-logo-reference.jpg" alt="HexFort Security logo"/><span>HexFort<small>SECURITY</small></span></Link>
    <nav className="navlinks"><Link href="/">Home</Link><Link href="/services">Services</Link><Link href="/pricing">Pricing</Link><Link href="/methodology">Methodology</Link><Link href="/about">About</Link><Link href="/support">Support</Link></nav>
    <Link className="btn" href="/contact">Get a Quote ↗</Link>
  </div></header>;
}
export function Footer() {
  return <footer className="footer"><div className="container"><div className="footer-grid">
    <div><div className="brand"><img src="/hexfort-logo-reference.jpg" alt="" /><span>HexFort<small>SECURITY</small></span></div><p>Think Like an Attacker. Build Like a Defender.</p></div>
    <div className="footer-links"><Link href="/services">Services</Link><Link href="/pricing">Pricing</Link><Link href="/support">Support</Link><Link href="/contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
  </div><p>© {new Date().getFullYear()} HexFort Security. All rights reserved.</p></div></footer>;
}
export function PageHero({eyebrow,title,desc}:{eyebrow:string;title:string;desc:string}) {
  return <section className="page-hero"><div className="container"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p className="lead">{desc}</p></div></section>;
}
export function Shell({children}:{children:React.ReactNode}) {
  return <><Header/>{children}<Footer/></>;
}
