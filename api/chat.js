import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.VITE_PUBLIC_SENTRY_DSN,
  environment: process.env.VITE_PUBLIC_APP_ENV,
  initialScope: {
    tags: {
      type: 'backend',
      projectId: process.env.VITE_PUBLIC_APP_ID
    }
  }
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      res.status(405).json({ error: "Method not allowed" });
      return;
    }
    const { message } = req.body;
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }
    console.log("API /api/chat received message:", message);
    // Simulate a chat response by echoing the user's message prefixed with "Bot: "
    const reply = "Bot: " + message;
    res.status(200).json({ reply });
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}