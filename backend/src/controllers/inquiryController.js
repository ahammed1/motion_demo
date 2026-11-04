import { cloudinaryConfigured, uploadReference } from "../config/cloudinary.js";
import { emailConfigured, sendInquiryEmail } from "../services/emailService.js";
import { allowedServices, saveInquiry } from "../models/Inquiry.js";

function validateInquiry(fields) {
  const { name, email, company = "", service, description, budget = "", deadline = "" } = fields;
  if (typeof name !== "string" || name.trim().length < 2 || name.length > 120) {
    return "Please enter your name (2–120 characters).";
  }
  if (typeof email !== "string" || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return "Please enter a valid email address.";
  }
  if (typeof company !== "string" || company.length > 160 || !allowedServices.has(service)) {
    return "Please check your company and selected service.";
  }
  if (typeof description !== "string" || description.trim().length < 8 || description.length > 5000) {
    return "Please describe your project in at least 8 characters.";
  }
  if (typeof budget !== "string" || budget.length > 80 || typeof deadline !== "string" || deadline.length > 20) {
    return "Please check the budget and deadline fields.";
  }
}

export async function createInquiry(req, res, next) {
  try {
    const validationError = validateInquiry(req.body);
    if (validationError) return res.status(400).json({ error: validationError });

    const db = req.app.locals.db;
    if (!db && !emailConfigured()) {
      return res.status(503).json({ error: "Enquiry delivery is not configured yet. Please email hello@noor.studio." });
    }

    const files = req.files || [];
    if (files.length && !cloudinaryConfigured) {
      return res.status(503).json({ error: "Reference uploads are not configured yet. Please email your files separately." });
    }

    const references = await Promise.all(files.map(uploadReference));
    const inquiry = {
      name: req.body.name.trim(),
      email: req.body.email.trim(),
      company: (req.body.company || "").trim(),
      service: req.body.service,
      description: req.body.description.trim(),
      budget: req.body.budget || "",
      deadline: req.body.deadline || "",
      references,
      createdAt: new Date(),
    };

    if (db) await saveInquiry(db, inquiry);
    if (emailConfigured()) await sendInquiryEmail(inquiry);
    return res.status(201).json({ message: "Enquiry received." });
  } catch (error) {
    return next(error);
  }
}
