import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { query } from "../../../utils/db";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        const result = await query(
          'SELECT uuidgoogle FROM "User" WHERE email = $1 LIMIT 1',
          [session.user.email]
        );

        session.user.isRegistered = result.rows.length > 0;
      } catch (err) {
        const error = err as Error;
        console.error(
          "Erro ao verificar o registro do usuário no banco de dados:",
          error.message
        );
        session.user.isRegistered = false;
      }
      session.user.id = token.id as string;
      return session;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.id = profile.sub;
      }
      return token;
    },
    async signIn({ account, profile }) {
      if (account?.provider === "google" && profile) {
        try {
          await query(
            `INSERT INTO "User" (email, username, uuidgoogle)
             VALUES ($1, $2, $3)
             ON CONFLICT (uuidgoogle) DO NOTHING`,
            [profile.email, profile.name, profile.sub]
          );

          return true; // Permitir o login
        } catch (error) {
          console.error("Erro ao salvar os dados do usuário:", error);
          return false;
        }
      }
      console.error("Provider não suportado ou falha no perfil");
      return false; // Falha ao logar
    },
  },
});
