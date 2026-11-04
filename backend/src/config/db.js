import { MongoClient } from "mongodb";

let client;

export async function connectDatabase() {
  if (!process.env.MONGODB_URI) return undefined;
  client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  return client.db(process.env.MONGODB_DB || "motion_atelier");
}

export async function closeDatabase() {
  await client?.close();
}
