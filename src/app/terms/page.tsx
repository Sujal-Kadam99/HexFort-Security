import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Shell } from "@/components/Site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Website use and engagement requirements for HexFort Security services.",
  alternates: { canonical: "/terms" },
};

export default function Terms() {
  return <Shell>
    <PageHero eyebrow="LEGAL" title="Terms of Use" desc="Terms for using the HexFort Security website and starting a security engagement. Last updated: 18 October 2026." />
    <main className="content"><article className="container legal-document">
      <p>These terms apply to use of this website. A quote request or engagement submission is an enquiry and does not, by itself, start testing or create approval to access a system. Engagement work begins only after the required authorization, scope and written agreement have been reviewed and approved.</p>

      <h2>Authorized security testing</h2>
      <p>Testing is limited to the assets, techniques, dates and conditions expressly authorized in the signed engagement documents. You must own the assets or have authority to request testing and must obtain permission from hosting providers and other affected parties where required. Never submit an asset that you are not authorized to have tested.</p>
      <p>HexFort Security may pause or decline work if authorization, scope, safety conditions or emergency contacts are unclear, or if activity could affect an out-of-scope or safety-critical system. Any online engagement form is subject to manual review; submission alone does not authorize testing.</p>

      <h2>Assessment limits and customer responsibilities</h2>
      <p>A security assessment is a point-in-time review limited by the agreed scope, access, time and information available. It can identify issues but cannot guarantee that every weakness will be found, that a system will be secure, or that a particular certification or compliance outcome will be achieved.</p>
      <p>You are responsible for accurate scope and ownership information, required third-party permissions, suitable backups and recovery arrangements, emergency contacts, and timely decisions. Do not provide production credentials or data unless the signed scope requires them and a secure exchange method has been agreed.</p>

      <h2>Quotes, fees and engagement agreement</h2>
      <p>Prices shown on the website describe starting scopes and are not a final offer. The service, scope, exclusions, schedule, deliverables, fees, taxes, payment dates, cancellation terms, retesting, confidentiality, intellectual property, liability and dispute process must be set out in the written quote and engagement agreement before work begins. If these website terms differ from a signed engagement agreement, the signed agreement governs that engagement.</p>

      <h2>Reports and confidential information</h2>
      <p>Reports and findings are intended for the customer and must be handled as confidential. Ownership and permitted use of reports, methods, tools and other deliverables are governed by the applicable signed agreement. Do not publish or share reports, evidence or another party’s confidential information without permission.</p>

      <h2>Website use</h2>
      <p>You may use this website to learn about our services and contact us lawfully. Do not attempt to disrupt the site, bypass access controls, upload malicious content or use website forms to send secrets. Website content is provided for general information and may change; service availability and scope are confirmed in writing.</p>

      <h2>Responsibility and applicable law</h2>
      <p>Nothing in these website terms limits a responsibility that cannot lawfully be limited. Any agreed liability allocation, remedies and dispute-resolution process for a service must appear in the applicable written engagement agreement. These terms are subject to applicable laws of India.</p>

      <h2>Contact</h2>
      <p>Questions about these terms: <a href="mailto:info@hexfortsecurity.in">info@hexfortsecurity.in</a> or <a href="tel:+917385496839">+91 73854 96839</a>.<br />HexFort Security, Dehu Phata, Alandi, Maharashtra 412105, India.</p>
      <p>For personal information handling, read our <Link href="/privacy">Privacy Policy</Link>.</p>
    </article></main>
  </Shell>;
}
