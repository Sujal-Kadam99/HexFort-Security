import type { Metadata } from "next";
import { PageHero, Shell } from "@/components/Site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How HexFort Security collects, uses, stores and protects personal information submitted through our website and security engagements.",
  alternates: { canonical: "/privacy" },
};

export default function Privacy() {
  return <Shell>
    <PageHero eyebrow="LEGAL" title="Privacy Policy" desc="How HexFort Security handles information shared through this website and our services. Last updated: 18 October 2026." />
    <main className="content"><article className="container legal-document">
      <p>This policy applies to visitors, people who contact us, customers and their representatives, and applicants. “HexFort Security”, “we” and “us” refer to the security services business operating this website.</p>

      <h2>Information we receive</h2>
      <ul>
        <li><b>Quote enquiries:</b> name, business email, optional phone number, selected service, currency and the requirements you submit.</li>
        <li><b>Support requests:</b> name, email, subject and message.</li>
        <li><b>Engagement requests:</b> client and representative details, contact and address details, proposed service and testing scope, assets and exclusions, environment, dates and hours, source IPs, emergency contacts, fees, signature and any signed PDF you upload.</li>
        <li><b>Website operations:</b> technical request and security logs may be processed by our hosting and infrastructure providers.</li>
      </ul>
      <p>Please do not send passwords, API keys, private keys or unnecessary sensitive production data through website forms. Submit information about another person only when you are authorized to provide it.</p>

      <h2>Why we use it</h2>
      <p>We use submitted information to answer enquiries, prepare quotes, review authorization and scope, provide and support services, communicate about an engagement, protect our systems, maintain business records and meet legal obligations. We do not use engagement information to test any asset until the required written scope and authorization have been reviewed and approved.</p>

      <h2>Customer systems and our role</h2>
      <p>When personal information is encountered inside a customer’s systems during an authorized assessment, we handle it only as needed for the agreed work and follow the customer’s documented instructions and engagement terms. The customer remains responsible for deciding what systems and data may be included in scope and for obtaining required permissions.</p>

      <h2>Storage and service providers</h2>
      <p>Website forms and engagement records are processed using Supabase. Signed engagement PDFs are uploaded to private storage. We use website hosting and email delivery providers to operate the site and communicate about requests. Those providers process information under their own service terms. Information may be processed in locations operated by these providers; contact us if you need details relevant to a particular engagement.</p>

      <h2>When information is shared</h2>
      <p>We share information with service providers who help operate our website, data storage and communications; professional advisers; authorities when required by law; and subcontractors only where permitted by the applicable customer agreement. We do not sell personal information. We do not publish a customer’s name or findings as a reference without written permission.</p>

      <h2>Retention and security</h2>
      <p>We retain information for the time needed to respond to a request, deliver an engagement, maintain required business records, resolve disputes and meet legal obligations. We then delete or anonymize it, subject to applicable backup, security-log and legal-hold requirements. Engagement-specific retention and deletion terms may be set out in the signed agreement.</p>
      <p>We use safeguards appropriate to the information and service, including access controls and private storage for uploaded engagement documents. No online service can promise absolute security; please use the secure channel agreed for sensitive engagement material.</p>

      <h2>Your requests and complaints</h2>
      <p>For a privacy request or complaint, email <a href="mailto:info@hexfortsecurity.in">info@hexfortsecurity.in</a> or call <a href="tel:+917385496839">+91 73854 96839</a>. We may ask for information to verify your identity and will respond within the time required by applicable law. You may also contact the relevant authority where the law provides that option.</p>

      <h2>Children, cookies and changes</h2>
      <p>This business website and its services are intended for organizations and adults. Do not submit children’s information. Essential browser storage may be used for site or administrative functions; hosting providers may also process technical logs. We will update this page when our practices change materially and revise the date above.</p>

      <h2>Contact</h2>
      <p>HexFort Security<br />Dehu Phata, Alandi, Maharashtra 412105, India<br /><a href="mailto:info@hexfortsecurity.in">info@hexfortsecurity.in</a><br /><a href="mailto:support@hexfortsecurity.in">support@hexfortsecurity.in</a></p>
    </article></main>
  </Shell>;
}
