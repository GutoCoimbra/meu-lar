import { Pool } from "pg";

// Configurar a conexão com o banco de dados Supabase usando variáveis de ambiente
const pool = new Pool({
  host: process.env.SUPABASE_HOST,
  port: Number(process.env.SUPABASE_PORT),
  user: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  database: process.env.SUPABASE_DB_NAME,
});

export const query = (text: string, params?: any[]) => pool.query(text, params);
