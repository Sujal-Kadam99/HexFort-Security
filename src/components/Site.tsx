"use client";

import Link from "next/link";
import { useState } from "react";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const links = <><Link href="/" onClick={() => setMenuOpen(false)}>Home</Link><Link href="/services" onClick={() => setMenuOpen(false)}>Services</Link><Link href="/pricing" onClick={() => setMenuOpen(false)}>Pricing</Link><Link href="/methodology" onClick={() => setMenuOpen(false)}>Methodology</Link><Link href="/about" onClick={() => setMenuOpen(false)}>About</Link><Link href="/support" onClick={() => setMenuOpen(false)}>Support</Link></>;
  return <header className="site-header"><div className="container nav">
    <Link className="brand" href="/"><img src="/hexfort-logo-reference.jpg" alt="HexFort Security logo"/><span>HexFort<small>SECURITY</small></span></Link>
    <nav className="navlinks">{links}</nav>
    <Link className="btn header-quote" href="/contact">Get a Quote ↗</Link>
    <button className="mobile-menu" type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? "✕" : "☰"}</button>
  </div>{menuOpen && <nav className="mobile-nav" id="mobile-navigation">{links}<Link className="btn" href="/contact" onClick={() => setMenuOpen(false)}>Get a Quote ↗</Link></nav>}</header>;
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
