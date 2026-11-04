import nodemailer from "nodemailer";

export function emailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.MAIL_FROM && process.env.MAIL_TO);
}

export async function sendInquiryEmail(inquiry) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: process.env.SMTP_SECURE === "true",
    auth: process.env.SMTP_USER ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS } : undefined,
  });
  const referenceText = inquiry.references.map((reference) => reference.url).join("\n") || "None attached";
  await transporter.sendMail({
    from: process.env.MAIL_FROM,
    to: process.env.MAIL_TO,
    replyTo: inquiry.email,
    subject: `New project enquiry — ${inquiry.service}`,
    text: `Name: ${inquiry.name}\nEmail: ${inquiry.email}\nCompany: ${inquiry.company || "Not provided"}\nService: ${inquiry.service}\nBudget: ${inquiry.budget || "Not provided"}\nDeadline: ${inquiry.deadline || "Not provided"}\n\n${inquiry.description}\n\nReferences:\n${referenceText}`,
  });
}
