// utils/db.ts
import { Pool } from "pg";

const pool = new Pool({
  user: process.env.POSTGRES_USER, // seu usuário PostgreSQL
  host: process.env.POSTGRES_HOST, // localhost para local
  database: process.env.POSTGRES_DB, // nome do banco
  password: process.env.POSTGRES_PASSWORD, // senha do banco
  port: parseInt(process.env.POSTGRES_PORT || "5432"), // porta
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
