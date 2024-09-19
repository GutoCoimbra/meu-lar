// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // Adiciona a propriedade `id` ao usuário na sessão
      name?: string | null;
      email?: string | null;
      image?: string | null;
      isRegistered?: boolean;
    };
  }

  interface User {
    id: string; // Adiciona a propriedade `id` ao usuário
  }
}
