import multer from "multer";

export default function errorMiddleware(error, _req, res, _next) {
  if (error instanceof multer.MulterError) {
    const message = error.code === "LIMIT_FILE_SIZE"
      ? "Each reference file must be 10MB or smaller."
      : "Please attach no more than 5 reference files.";
    return res.status(400).json({ error: message });
  }
  if (error.message === "Attach an image, PDF, MP4, or MOV file.") {
    return res.status(400).json({ error: error.message });
  }
  console.error("Enquiry request failed:", error.message);
  return res.status(500).json({ error: "We couldn't deliver your enquiry. Please try again shortly." });
}
