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
- Domain `hexfortsecurity.in`, registered with GoDaddy and managed in Cloudflare
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
- Quote email alerts use a Supabase Edge Function and Resend. Follow the setup below; alerts do not work until the provider, function secrets, and database webhook are configured.
- Public form rate limiting / CAPTCHA or Turnstile should be added before public launch to mitigate spam.
- Add contact details in the contact page/settings before launch. No phone, email, WhatsApp number, legal entity identifiers, prices or certifications have been invented.
- Replace the uploaded low-resolution logo reference with a clean, high-resolution export of the same exact logo before production. The reference is used unchanged here.
- Review the privacy policy and terms with qualified advice before launch.
- Add automated tests, backup/restore checks, monitoring, CSP/security headers, accessibility checks and dependency review before production.

## Quote email alerts

The `notify-quote` Edge Function emails the configured inbox after a new `quote_requests` row is inserted. It includes the submitted name, email, phone, selected service, currency, full requirements message, and received time.

1. Create a Resend account, verify a sender domain you control, and create an API key. Use a sender such as `HexFort Security <notifications@hexfortsecurity.in>` only after Resend verifies that domain.
2. Install and authenticate the Supabase CLI, then deploy the function from this project directory:
   ```bash
   supabase login
   supabase functions deploy notify-quote --project-ref YOUR_PROJECT_REF
   ```
3. Store the secrets in the Supabase project (never in the website or Git):
   ```bash
   supabase secrets set RESEND_API_KEY=YOUR_RESEND_KEY NOTIFICATION_TO_EMAIL=hexfortsecurity@gmail.com FROM_EMAIL="HexFort Security <notifications@hexfortsecurity.in>" WEBHOOK_SECRET=YOUR_LONG_RANDOM_SECRET --project-ref YOUR_PROJECT_REF
   ```
4. In Supabase Dashboard, open **Database → Webhooks** and create a webhook for table `public.quote_requests`, event **INSERT**, method **POST**, URL `https://YOUR_PROJECT_REF.supabase.co/functions/v1/notify-quote`. Add header `x-webhook-secret` with the same value as `WEBHOOK_SECRET`.
5. Submit one clearly marked test quote from the live form and confirm it arrives in the configured inbox. Check the Edge Function and Database Webhook logs if it does not.

Quote requests are saved before the webhook sends email, so an email-provider failure does not lose the request. Check webhook/function logs for delivery failures; the admin dashboard remains the source of truth.

## Cloudflare Pages and domain
This Next.js app uses `output: "export"`, so Cloudflare Pages can serve the static export in `out/`.

1. In Cloudflare, create a Pages project connected to this repository. Set the project root to `hexfort-security` if the repository root is its parent folder, use `npm run build` as the build command, and `out` as the build output directory. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` as Pages environment variables for production and preview builds.
2. In the Pages project, open **Custom domains** and add `hexfortsecurity.in` and `www.hexfortsecurity.in`. Follow Cloudflare's verification prompts. Choose one hostname as canonical and configure a redirect for the other in Cloudflare.
3. In GoDaddy, change the domain's nameservers to the two Cloudflare nameservers shown for the `hexfortsecurity.in` zone. This delegates DNS management to Cloudflare; do not copy nameservers from an example or use Pages IP addresses.
4. After the nameserver change propagates, manage DNS in Cloudflare. Pages will create or request the records needed for the custom domains. Keep the records Cloudflare provisions, and remove conflicting `A`, `AAAA`, or `CNAME` records for the same hostnames if Cloudflare instructs you to.
5. In Cloudflare Pages, wait for both custom domains to show active and HTTPS to finish provisioning. Verify the apex and `www` hostnames, plus form submissions against the production Supabase project.

The exact Cloudflare nameservers and any DNS validation records are specific to the account and zone, so retrieve them from the Cloudflare dashboard. Do not change MX or other mail records unless intentionally moving email DNS too.


## Engagement consent workflow
- Clients start at `/engagement?service=Web%20Application%20VAPT` (service pages link here automatically).
- The page collects client/authorized representative details, in-scope and excluded assets, dates, environment, testing hours, source IP note, emergency contact, fees, and special instructions.
- Clients can submit typed-name online consent or upload a signed PDF. The online option records the typed name and consent checkbox; it is not a cryptographic/dedicated e-signature service. Review legal enforceability with counsel and integrate a reputable e-sign provider if required.
- The signed-PDF storage bucket is private. Only an authenticated admin can create a short-lived signed download link. The public upload policy accepts PDF files up to 10 MB via the bucket limit; add server-side rate limiting and malware scanning before public launch.
- Admin dashboard > Engagement consent lists submissions and allows an admin to approve & authorize, reject, or request changes with a required review note. Approval is a manual action and should only be used after verifying the client representative's authority, all in-scope assets, exclusions, dates, third-party permissions and final signed engagement letter.
- The uploaded `VAPT Engagement Letter & Scope Template.pdf` remains the master template reference. This starter currently collects the fields to prepare an engagement; automatic PDF document generation/countersigning and transactional email notifications still need to be integrated before production.
