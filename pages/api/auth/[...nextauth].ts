import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { supabase } from "../../../utils/supabaseClient";

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
        const { data, error } = await supabase
          .from("User")
          .select("UUIDGoogle")
          .eq("email", session.user.email)
          .single();

        session.user.isRegistered = data?.UUIDGoogle ? true : false;
      } catch (err) {
        const error = err as Error;
        console.error(
          "Erro ao verificar o registro do usuário no Supabase:",
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
        // Armazena os dados do usuário no banco de dados ao logar
        try {
          const { error } = await supabase.from("User").upsert(
            {
              email: profile.email,
              username: profile.name,
              uuidgoogle: profile.sub, // UUID do Google
            },
            { onConflict: "uuidgoogle" }
          );

          if (error) {
            console.error("Erro ao salvar os dados do usuário:", error.message);
            return false;
          }

          return true; // Permitir o login
        } catch (err) {
          console.error("Erro ao tentar armazenar os dados do usuário:", err);
          return false;
        }
      }
      console.error("Provider não suportado ou falha no perfil");
      return false; // Falha ao logar
    },
    // // Callback para redirecionar o usuário após o login
    // async redirect({ url, baseUrl }) {
    //   return baseUrl; // Redireciona para a página principal ("/")
    // },
  },
});
