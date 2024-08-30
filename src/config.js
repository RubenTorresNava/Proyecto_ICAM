import { config } from "dotenv";

config();

export const JWT_SECRET = process.env.JWT_SECRET
export const PORT = process.env.PORT
export const MONGO_URI = process.env.MONGO_URI