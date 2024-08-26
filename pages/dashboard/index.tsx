// pages/protected-page.tsx
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getServerSession();
      if (!session) {
        router.push("/");
      } else {
        setSession(session);
      }
    };

    fetchSession();
  }, [router]);

  if (!session) return null; // Ou um carregamento, caso queira

  return (
    <div>
      <div>Olá, {session.user?.name}</div>
      <div>E-mail: {session.user?.email}</div>
      <div>Image url: {session.user?.image}</div>
    </div>
  );
}
