# HexFort Security — setup and deployment

This is the first implementation scaffold for the approved dark navy / cyber-blue / alert-red design. It uses the supplied logo image as a reference asset and preserves the tagline: **Think Like an Attacker. Build Like a Defender.**

## Included
- Responsive public pages: Home, Services, Pricing, Methodology, About, Support, Contact, Privacy, Terms.
- INR/USD pricing switch.
- Quote request and support forms.
- Engagement consent workflow: client scope intake, online typed-name consent or signed-PDF upload, private PDF storage, and manual admin approval before authorization.
- Admin sign-in page and dashboard for service CRUD, pricing and request status management.
- Supabase schema with Row Level Security policies and starter service records.

## Requirements
- Node.js 20+
- Supabase project
- Existing domain access for deployment
- Email provider/API credentials for actual email notifications (not configured in this scaffold)

## Run locally
1. Install dependencies:
   ```bash
   npm install
   ```
2. Copy `.env.example` to `.env.local` and fill in Supabase Project URL and anon key.
3. In Supabase SQL Editor, run `supabase/schema.sql`. This creates the engagement review table and private PDF bucket/policies as well as the original tables. If storage bucket policies conflict with existing policies, review them before launch.
4. Create one admin user in Supabase Auth. Do not enable public signup.
5. Using trusted Supabase admin tooling, assign this user `app_metadata.role = "admin"`. Do not put service-role keys in browser code.
6. Start:
   ```bash
   npm run dev
   ```
7. Visit `http://localhost:3000` and `http://localhost:3000/admin/login`.

## Important production notes
- Admin dashboard and database RLS require the admin user's trusted `app_metadata.role` to equal `admin`. Verify this is correctly assigned before using the admin area.
- The admin UI in this initial scaffold uses Supabase Auth client session. Before production, add server-side middleware/route protection, CSRF-aware mutation handling as appropriate, and an audit-log insert for each admin change.
- Email notifications are **not active yet**. Connect a transactional email provider through a server-only route or Supabase Edge Function; never expose provider secrets to the browser. Send a notification after a quote/support insert, and do not send full sensitive details in notification emails.
- Public form rate limiting / CAPTCHA or Turnstile should be added before public launch to mitigate spam.
- Add contact details in the contact page/settings before launch. No phone, email, WhatsApp number, legal entity identifiers, prices or certifications have been invented.
- Replace the uploaded low-resolution logo reference with a clean, high-resolution export of the same exact logo before production. The reference is used unchanged here.
- Review the privacy policy and terms with qualified advice before launch.
- Add automated tests, backup/restore checks, monitoring, CSP/security headers, accessibility checks and dependency review before production.

## Domain
Domain is already owned, but no domain name was supplied here. Once known, configure it in the hosting provider and set DNS records / HTTPS according to the provider's instructions.


## Engagement consent workflow
- Clients start at `/engagement?service=Web%20Application%20VAPT` (service pages link here automatically).
- The page collects client/authorized representative details, in-scope and excluded assets, dates, environment, testing hours, source IP note, emergency contact, fees, and special instructions.
- Clients can submit typed-name online consent or upload a signed PDF. The online option records the typed name and consent checkbox; it is not a cryptographic/dedicated e-signature service. Review legal enforceability with counsel and integrate a reputable e-sign provider if required.
- The signed-PDF storage bucket is private. Only an authenticated admin can create a short-lived signed download link. The public upload policy accepts PDF files up to 10 MB via the bucket limit; add server-side rate limiting and malware scanning before public launch.
- Admin dashboard > Engagement consent lists submissions and allows an admin to approve & authorize, reject, or request changes with a required review note. Approval is a manual action and should only be used after verifying the client representative's authority, all in-scope assets, exclusions, dates, third-party permissions and final signed engagement letter.
- The uploaded `VAPT Engagement Letter & Scope Template.pdf` remains the master template reference. This starter currently collects the fields to prepare an engagement; automatic PDF document generation/countersigning and transactional email notifications still need to be integrated before production.
