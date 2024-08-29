import { config } from "dotenv";

config();

export const JWT_SECRET = process.env.JWT_SECRET || "miclavesecreta";
export const PORT = process.env.PORT || 3000;
export const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/icam";