import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { supabase } from "../utils/supabaseClient"; // Conexão com o Supabase
import { Unit } from "@/types"; // Definição do tipo Unit
import Card from "@/components/Card"; // Reutilize o componente Card
import Header from "@/components/Header";

const FavoritesPage: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [favorites, setFavorites] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "loading") return;

    if (!session?.user) {
      // Se o usuário não estiver logado, redirecione para a página de login
      router.push("/api/auth/signin");
    } else {
      // Carregar os imóveis favoritados e disponíveis
      const fetchFavorites = async () => {
        setLoading(true);

        // Buscar os favoritos do usuário
        const { data: favoriteUnits, error } = await supabase
          .from("favorite")
          .select("idunit")
          .eq("uuidgoogle", session.user.id);

        if (error) {
          console.error("Erro ao buscar favoritos:", error.message);
          setLoading(false);
          return;
        }

        if (favoriteUnits && favoriteUnits.length > 0) {
          // Extrair os IDs dos imóveis favoritos
          const unitIds = favoriteUnits.map((fav) => fav.idunit);

          // Buscar imóveis disponíveis que estão favoritados
          const { data: units, error: unitsError } = await supabase
            .from("Unit")
            .select("*")
            .in("idUnit", unitIds) // Busca pelos ids favoritos
            .eq("available", true); // Apenas imóveis disponíveis

          if (unitsError) {
            console.error(
              "Erro ao buscar imóveis disponíveis:",
              unitsError.message
            );
          } else {
            setFavorites(units);
          }
        } else {
          setFavorites([]); // Nenhum favorito encontrado
        }

        setLoading(false);
      };

      fetchFavorites();
    }
  }, [session, status, router]);

  // Função para remover o card após desfavoritar
  const handleFavoriteToggle = (idUnit: string) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((unit) => unit.idUnit.toString() !== idUnit)
    );
  };

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 overflow-y-auto">
      <div className="w-full">
        <div className="max-w-[1024px] mx-auto">
          <Header />
        </div>
      </div>

      <div className="flex-1 container mx-auto py-2 max-w-[1024px]">
        <h1>Meus Imóveis Favoritos</h1>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  ">
            {favorites.map((unit) => (
              <Card
                key={unit.idUnit}
                unit={unit}
                onFavoriteToggle={handleFavoriteToggle} // Passa a função para o Card
              />
            ))}
          </div>
        ) : (
          <p>
            Você ainda não favoritou nenhum imóvel ou não há imóveis disponíveis
            no momento.
          </p>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;
