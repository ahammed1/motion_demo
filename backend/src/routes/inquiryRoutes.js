import { Router } from "express";
import multer from "multer";
import { createInquiry } from "../controllers/inquiryController.js";

const router = Router();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 5 },
  fileFilter: (_req, file, callback) => {
    const allowed = /^(image\/(jpeg|png|webp|gif)|application\/pdf|video\/(mp4|quicktime))$/;
    if (allowed.test(file.mimetype)) callback(null, true);
    else callback(new Error("Attach an image, PDF, MP4, or MOV file."));
  },
});

router.post("/", upload.array("references", 5), createInquiry);
export default router;
