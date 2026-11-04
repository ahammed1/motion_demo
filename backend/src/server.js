import "dotenv/config";
import cors from "cors";
import express from "express";
import { closeDatabase, connectDatabase } from "./config/db.js";
import errorMiddleware from "./middleware/errorMiddleware.js";
import inquiryRoutes from "./routes/inquiryRoutes.js";

const app = express();
const port = Number(process.env.PORT || 3001);

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "http://localhost:5173" }));
app.use(express.json({ limit: "20kb" }));
app.use("/api/enquiries", inquiryRoutes);
app.use(errorMiddleware);

try {
  app.locals.db = await connectDatabase();
} catch (error) {
  console.error("MongoDB connection failed:", error.message);
  process.exit(1);
}

const server = app.listen(port, () => console.log(`Enquiry API listening on port ${port}`));
for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, async () => {
    server.close();
    await closeDatabase();
    process.exit(0);
  });
}
