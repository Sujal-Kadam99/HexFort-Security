"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase, supabaseConfigured } from "@/lib/supabase";
import { serviceCatalog } from "@/lib/service-catalog";
import type { Service } from "@/lib/types";

type PricingService = Service & { timeline?: string };
export function PricingCards(){
 const [services,setServices]=useState<PricingService[]>(serviceCatalog.map((s)=>({...s,id:s.slug,description:s.scope,price_inr:s.launchPriceInr??null,price_usd:null,pricing_mode:s.launchPriceInr===undefined?"quote":"starting",is_published:true,is_featured:false})));
 useEffect(()=>{if(!supabaseConfigured||!supabase)return;supabase.from("services").select("*").in("slug",serviceCatalog.map(s=>s.slug)).eq("is_published",true).then(({data})=>{if(!data)return;const configured=new Map((data as Service[]).map(s=>[s.slug,s]));setServices(serviceCatalog.map(s=>{const saved=configured.get(s.slug);return {...s,id:saved?.id||s.slug,description:s.scope,price_inr:saved?.price_inr??null,price_usd:saved?.price_usd??null,pricing_mode:saved?.pricing_mode||"quote",is_published:true,is_featured:saved?.is_featured||false}}))})},[]);
 const money=(v:number|null)=>v===null?"Custom quote":new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(v);
 return <><p className="muted" style={{marginBottom:22}}>Launch prices are for the first 5 clients. Regular prices apply after the launch offer. Applicable taxes are extra; final scope and fee are confirmed in writing.</p><div className="cards">{services.map((s)=>{const catalog=serviceCatalog.find(item=>item.slug===s.slug);const launch=s.pricing_mode==="quote"?null:s.price_inr;const regular=catalog?.standardPriceInr;return <article className="service-card" key={s.slug}><span className="eyebrow">{s.category}</span><h3>{s.name}</h3><p>{s.short_description}</p><p><b>Scope:</b> {s.description}</p>{s.timeline&&<p><b>Estimated timeline:</b> {s.timeline}</p>}<div style={{margin:"8px 0 22px"}}>{launch===null?<div className="price" style={{fontSize:25}}>Custom quote</div>:<><div className="price" style={{fontSize:25}}>Launch price: {money(launch)}</div>{regular&&<small className="muted">Regular price: {money(regular)}</small>}</>}<br/><small className="muted">Starting scope only. Written scope and final fee confirmed before work begins.</small></div><ul className="checklist">{(s.deliverables||[]).slice(0,3).map(d=><li key={d}><span className="check">✓</span>{d}</li>)}</ul><div className="card-bottom"><Link href={"/contact?service="+encodeURIComponent(s.name)}>Request a quote →</Link><span className="pill">Scope confirmed</span></div></article>})}</div></>;
}
