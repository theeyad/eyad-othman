"use server";

import { contactSchema, type ContactFormData } from "@/lib/validations/contact";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

const SUBJECT_LABELS: Record<string, string> = {
  freelance: "Freelance Project",
  fulltime: "Full-time Position",
  parttime: "Part-time Position",
  consultation: "Technical Consultation",
  other: "General Inquiry",
};

export async function sendContactMessageAction(rawInput: ContactFormData) {
  try {
    const parseResult = contactSchema.safeParse(rawInput);
    if (!parseResult.success) {
      return {
        success: false,
        errorKey: "validationError",
        error: "Invalid form data.",
      };
    }

    const { name, email, subject, message } = parseResult.data;

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error(
        "[Telegram] Missing TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID in environment variables.",
      );
      return {
        success: false,
        errorKey: "configError",
        error: "Telegram service is not configured.",
      };
    }

    const readableSubject = SUBJECT_LABELS[subject] || subject;
    const now = new Date().toISOString().replace("T", " ").substring(0, 19);

    const formattedMessage = [
      `📬 <b>New Portfolio Contact Message</b>`,
      ``,
      `👤 <b>Name:</b> ${escapeHtml(name)}`,
      `📧 <b>Email:</b> ${escapeHtml(email)}`,
      `💼 <b>Subject:</b> ${escapeHtml(readableSubject)}`,
      ``,
      `💬 <b>Message:</b>`,
      `${escapeHtml(message)}`,
      ``,
      `⏰ <b>Received at:</b> <code>${now} UTC</code>`,
    ].join("\n");

    const endpoint = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: formattedMessage,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("[Telegram] API error:", errorData);
      return {
        success: false,
        errorKey: "sendError",
        error: "Failed to dispatch message to Telegram.",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("[Telegram] Unexpected error:", error);
    return {
      success: false,
      errorKey: "unexpectedError",
      error: "An unexpected error occurred. Please try again later.",
    };
  }
}

