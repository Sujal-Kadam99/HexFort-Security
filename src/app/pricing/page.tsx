import Link from "next/link";
import { PageHero, Shell } from "@/components/Site";
import { PricingCards } from "@/components/PricingCards";
export default function Pricing(){return <Shell><PageHero eyebrow="TRANSPARENT PRICING" title="Clear packages. Flexible engagements." desc="Standard packages can show INR and USD prices side by side. Complex or custom scopes can request a tailored quote."/><div className="content"><div className="container"><PricingCards/><div className="cta" style={{marginTop:32}}><div><h2>Need a custom scope?</h2><p className="muted">Pricing depends on assets, complexity, testing window and deliverables.</p></div><Link className="btn" href="/contact">Request a Custom Quote →</Link></div></div></div></Shell>}
