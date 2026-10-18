"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { serviceCatalog } from "@/lib/service-catalog";
import type { Service } from "@/lib/types";

type PricingService = Service & { timeline?: string };
export function PricingCards(){
 const startingPrices:Record<string,number>={"web-application-vapt":49000,"network-vapt":29000,"secure-configuration-review":19000,"phishing-simulation":19000};
 const [services,setServices]=useState<PricingService[]>(serviceCatalog.map((s)=>({...s,id:s.slug,description:s.scope,price_inr:startingPrices[s.slug]??null,price_usd:null,pricing_mode:startingPrices[s.slug]===undefined?"quote":"starting",is_published:true,is_featured:false})));
 const [currency,setCurrency]=useState<"INR"|"USD">("INR");
 useEffect(()=>{if(!supabaseConfigured||!supabase)return;supabase.from("services").select("*").in("slug",serviceCatalog.map(s=>s.slug)).eq("is_published",true).then(({data})=>{if(!data)return;const configured=new Map((data as Service[]).map(s=>[s.slug,s]));setServices(serviceCatalog.map(s=>{const saved=configured.get(s.slug);return {...s,id:saved?.id||s.slug,description:s.scope,price_inr:saved?.price_inr??null,price_usd:saved?.price_usd??null,pricing_mode:saved?.pricing_mode||"quote",is_published:true,is_featured:saved?.is_featured||false}}))})},[]);
 const money=(v:number|null)=>v===null?"Custom quote":new Intl.NumberFormat(currency==="INR"?"en-IN":"en-US",{style:"currency",currency,maximumFractionDigits:0}).format(v);
 const hasConfiguredPrices=services.some(s=>s.pricing_mode!=="quote"&&(s.price_inr!==null||s.price_usd!==null));
 return <><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:16,marginBottom:22,flexWrap:"wrap"}}><p className="muted">Indicative starting prices in INR, before applicable taxes. Final fee is confirmed in writing after scope review. USD requests are quoted individually.</p>{hasConfiguredPrices&&<div className="actions" style={{marginTop:0}}><button className={"btn "+(currency==="INR"?"":"secondary")} onClick={()=>setCurrency("INR")}>₹ INR</button><button className={"btn "+(currency==="USD"?"":"secondary")} onClick={()=>setCurrency("USD")}>$ USD</button></div>}</div><div className="cards">{services.map((s)=><article className="service-card" key={s.slug}><span className="eyebrow">{s.category}</span><h3>{s.name}</h3><p>{s.short_description}</p><p><b>Scope:</b> {s.description}</p>{s.timeline&&<p><b>Estimated timeline:</b> {s.timeline}</p>}<div style={{margin:"8px 0 22px"}}><div className="price" style={{fontSize:25}}>{s.pricing_mode==="quote"?"Custom quote":s.pricing_mode==="starting"?("Starting from "+money(currency==="INR"?s.price_inr:s.price_usd)):money(currency==="INR"?s.price_inr:s.price_usd)}</div><small className="muted">Starting scope only. Written scope and final fee confirmed before work begins.</small></div><ul className="checklist">{(s.deliverables||[]).slice(0,3).map(d=><li key={d}><span className="check">✓</span>{d}</li>)}</ul><div className="card-bottom"><Link href={"/contact?service="+encodeURIComponent(s.name)}>Request a quote →</Link><span className="pill">Scope confirmed</span></div></article>)}</div></>;
}
