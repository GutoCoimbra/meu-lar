import { Pool } from "pg";

// Configurar a conexão com o banco de dados Supabase usando variáveis de ambiente
const pool = new Pool({
  host: process.env.SUPABASE_HOST,
  port: Number(process.env.SUPABASE_PORT),
  user: process.env.SUPABASE_USER,
  password: process.env.SUPABASE_PASSWORD,
  database: process.env.SUPABASE_DB_NAME,
  max: 20,
});

export const query = async (text: string, params?: any[]) => {
  try {
    const result = await pool.query(text, params);
    return result;
  } catch (error) {
    console.error("Erro na consulta ao banco de dados:", error);
    throw new Error("Erro ao consultar o banco de dados.");
  }
};
