// pages/login.tsx
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient";

const LoginPage = () => {
  const router = useRouter();
  const { redirectTo } = router.query; // Captura o valor de `redirectTo` da URL

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/login?redirectTo=${
          redirectTo || "/register"
        }`,
      },
    });

    if (error) {
      console.error("Erro ao fazer login:", error.message);
    }
  };

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session) {
        // Redireciona para o `redirectTo`, ou para /register se não houver um destino específico
        router.push(redirectTo ? (redirectTo as string) : "/register");
      }
    };

    checkSession();
  }, [router, redirectTo]);

  return (
    <div className="container">
      <h1>Login</h1>
      <button onClick={handleLogin}>Login com Google</button>
    </div>
  );
};

export default LoginPage;
