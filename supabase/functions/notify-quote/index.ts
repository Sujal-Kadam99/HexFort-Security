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

  const RESEND_API_KEY = env.get("RESEND_API_KEY");
  const NOTIFICATION_TO_EMAIL = env.get("NOTIFICATION_TO_EMAIL");
  const FROM_EMAIL = env.get("FROM_EMAIL");
  if (!RESEND_API_KEY || !NOTIFICATION_TO_EMAIL || !FROM_EMAIL) {
    return new Response("Email service is not configured", { status: 503 });
  }

  const event = await request.json().catch(() => null);
  if (event?.type !== "INSERT" || event?.schema !== "public" || event?.table !== "quote_requests" || !event?.record) {
    return new Response("Unsupported webhook event", { status: 400 });
  }

  const quote = event.record;
  const email = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [NOTIFICATION_TO_EMAIL],
      subject: `New quote request: ${quote.service || "Service not selected"}`,
      text: [
        "A new quote request was received.",
        `Name: ${quote.name || "Not provided"}`,
        `Email: ${quote.email || "Not provided"}`,
        `Phone: ${quote.phone || "Not provided"}`,
        `Service: ${quote.service || "Not selected"}`,
        `Currency: ${quote.currency || "INR"}`,
        `Requirements: ${quote.message || "Not provided"}`,
        `Received: ${quote.created_at || "Not available"}`,
        "Review the request in the HexFort admin dashboard: https://hexfortsecurity.in/admin",
      ].join("\n"),
    }),
  });

  if (!email.ok) return new Response("Email provider rejected the notification", { status: 502 });
  return new Response("Notification sent", { status: 200 });
});
