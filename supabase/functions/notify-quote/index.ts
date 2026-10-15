import nodemailer from "npm:nodemailer@^9";

const env = Deno.env;

function safeEqual(actual: string, expected: string) {
  if (actual.length !== expected.length) return false;
  let diff = 0;
  for (let i = 0; i < actual.length; i++) diff |= actual.charCodeAt(i) ^ expected.charCodeAt(i);
  return diff === 0;
}

Deno.serve(async (request) => {
  if (request.method !== "POST") return new Response("Method not allowed", { status: 405 });

  const secret = env.get("WEBHOOK_SECRET");
  if (!secret || !safeEqual(request.headers.get("x-webhook-secret") || "", secret)) {
    return new Response("Unauthorized", { status: 401 });
  }

  const SMTP_HOST = env.get("SMTP_HOST");
  const SMTP_PORT = Number(env.get("SMTP_PORT") || "465");
  const SMTP_USER = env.get("SMTP_USER");
  const SMTP_PASS = env.get("SMTP_PASS");
  const SMTP_SECURE = env.get("SMTP_SECURE") === "true";
  const NOTIFICATION_TO_EMAIL = env.get("NOTIFICATION_TO_EMAIL");
  const FROM_EMAIL = env.get("SMTP_FROM_EMAIL");
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS || !NOTIFICATION_TO_EMAIL || !FROM_EMAIL || !Number.isInteger(SMTP_PORT) || SMTP_PORT < 1) {
    return new Response("Email service is not configured", { status: 503 });
  }

  const event = await request.json().catch(() => null);
  if (event?.type !== "INSERT" || event?.schema !== "public" || !["quote_requests", "support_tickets", "engagement_requests"].includes(event?.table) || !event?.record) {
    return new Response("Unsupported webhook event", { status: 400 });
  }

  const isSupport = event.table === "support_tickets";
  const item = event.record;
  const isEngagement = event.table === "engagement_requests";
  const fields = isEngagement
    ? ["A new engagement request is awaiting admin review.", `Client: ${item.client_name || "Not provided"}`, `Client email / phone: ${item.client_email || "Not provided"} / ${item.client_phone || "Not provided"}`, `Company: ${item.client_company || "Not provided"}`, `Representative: ${item.representative_name || "Not provided"} (${item.representative_title || "Not provided"})`, `Address: ${item.client_address || "Not provided"}`, `Service: ${item.service || "Not provided"}`, `Environment: ${item.environment || "Not provided"}`, `In-scope assets: ${item.assets || "Not provided"}`, `Excluded assets: ${item.excluded_assets || "Not provided"}`, `Dates / hours: ${item.start_date || "?"} to ${item.end_date || "?"}; ${item.permitted_hours || "Not provided"}`, `Blackout dates: ${item.blackout_dates || "None"}`, `Source IPs / note: ${item.source_ips || "Not provided"}`, `Emergency contact: ${item.emergency_name || "Not provided"}; ${item.emergency_phone || "Not provided"}; ${item.emergency_email || "Not provided"}`, `Fee: INR ${item.fee_inr ?? "not set"}; USD ${item.fee_usd ?? "not set"}`, `Signature method: ${item.signature_method || "Not provided"}`, `Typed signature: ${item.typed_signature || "Not provided"}`, `Consent accepted: ${item.consent_accepted ? "Yes" : "No"}`, `Signed PDF path: ${item.signed_pdf_path || "No upload"}`, `Special instructions: ${item.special_instructions || "None"}`, `Submitted: ${item.submitted_at || item.created_at || "Not available"}`]
    : isSupport
      ? ["A new support request was received.", `Name: ${item.name || "Not provided"}`, `Email: ${item.email || "Not provided"}`, `Subject: ${item.subject || "Not provided"}`, `Details: ${item.message || "Not provided"}`, `Received: ${item.created_at || "Not available"}`]
      : ["A new quote request was received.", `Name: ${item.name || "Not provided"}`, `Email: ${item.email || "Not provided"}`, `Phone: ${item.phone || "Not provided"}`, `Service: ${item.service || "Not selected"}`, `Currency: ${item.currency || "INR"}`, `Requirements: ${item.message || "Not provided"}`, `Received: ${item.created_at || "Not available"}`];
  try {
    const transport = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
    await transport.sendMail({
      from: FROM_EMAIL,
      to: NOTIFICATION_TO_EMAIL,
      subject: isEngagement ? "New engagement request awaiting review" : isSupport ? "New support request received" : "New quote request received",
      text: [
        ...fields,
        "Review the request in the HexFort admin dashboard: https://hexfortsecurity.in/admin",
      ].join("\n"),
    });
  } catch {
    return new Response("Email provider rejected the notification", { status: 502 });
  }

  return new Response("Notification sent", { status: 200 });
});
