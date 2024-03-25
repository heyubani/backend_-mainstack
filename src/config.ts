import { config } from "dotenv";
config();

export const MONGODB_URI = process.env.NODE_ENV != 'test' ?
  process.env.MONGODB_URI : process.env.MONGODB_TEST_URI

export const DB_NAME = process.env.MAINSTACK_DB_NAME

export const PORT = process.env.PORT || 3000;

export const SECRET_KEY = process.env.TEST_SECRET_KEY;
