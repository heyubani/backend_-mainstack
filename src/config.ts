import { config } from "dotenv";
config();

export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost/testdb";
  export const DB_NAME = process.env.MAINSTACK_DB_NAME
export const PORT = process.env.PORT || 3000;
