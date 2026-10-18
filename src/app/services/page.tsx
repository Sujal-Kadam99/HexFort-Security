import Link from "next/link";
import { PageHero, Shell } from "@/components/Site";
import { addOnServices, coreServices } from "@/lib/service-catalog";

const money = (value: number) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(value);

function ServiceCards({ items }: { items: typeof coreServices }) {
  return <div className="cards" style={{ marginTop: 18 }}>{items.map((service) => <article id={service.slug} className="service-card" key={service.slug}>
    <div className="icon-box">{service.icon}</div><span className="eyebrow">{service.category}</span><h3>{service.name}</h3>
    <p>{service.short_description}</p><p><b>Scope:</b> {service.scope}</p>
    {service.timeline && <p><b>Estimated timeline:</b> {service.timeline}</p>}
    <p><b>Deliverables:</b> {service.deliverables.join(" · ")}</p>
    <div style={{ margin: "8px 0 18px" }}>
      {service.launchPriceInr === undefined ? <p className="price">Custom quote</p> : <><p className="price">Launch price (first 5 clients): {money(service.launchPriceInr)}</p><small className="muted">Regular price: {money(service.standardPriceInr!)}</small></>}
    </div>
    <div className="card-bottom"><Link href={"/contact?service="+encodeURIComponent(service.name)}>Request a quote →</Link><Link href={"/engagement?service="+encodeURIComponent(service.name)}>Start Engagement ↗</Link></div>
  </article>)}</div>;
}

export default function Services(){return <Shell><PageHero eyebrow="CAPABILITIES" title="Security services built around your risks." desc="Choose a core assessment or scoped add-on. Every engagement starts with written authorization and agreed rules of engagement."/><div className="content"><div className="container"><p className="form-note">Launch prices are for the first five clients who separately agree in writing to provide feedback and permit an anonymized case study. Applicable taxes are extra; final scope and fee are confirmed in a written proposal.</p><h2>Core services</h2><ServiceCards items={coreServices}/><h2 style={{marginTop:52}}>Add-on assessments</h2><p className="muted">Custom quote based on the agreed scope.</p><ServiceCards items={addOnServices}/></div></div></Shell>}
