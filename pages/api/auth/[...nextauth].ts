import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // Outros provedores, se houver
  ],
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.DATABASE_URL, // Se você estiver utilizando um banco de dados para sessões
});
