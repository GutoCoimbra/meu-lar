// pages/auth/signin.tsx
import { getProviders, signIn, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface SignInProps {
  providers: Record<string, any> | null; // Ajuste para permitir 'null'
}

export default function SignIn({ providers }: SignInProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Verifica se o usuário já está autenticado e redireciona
  // useEffect(() => {
  //   if (session) {
  //     router.push("/"); // Redireciona para a página inicial ou outra página desejada
  //   }
  // }, [session, router]);

  // Enquanto a sessão está carregando, pode exibir um indicador de carregamento
  if (status === "loading") {
    return <div>Carregando...</div>;
  }

  // Se os provedores não estiverem disponíveis, exibe uma mensagem
  if (!providers) {
    return <div>Não há provedores disponíveis no momento.</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl mb-4">Faça login para continuar</h1>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            onClick={() => signIn(provider.id)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Entrar com {provider.name}
          </button>
        </div>
      ))}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();

  if (!providers) {
    console.error("No providers available");
    return {
      props: { providers: null },
    };
  }

  return {
    props: { providers },
  };
};
