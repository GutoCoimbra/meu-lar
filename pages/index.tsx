import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        Bem-vindo à sua aplicação de aluguel de imóveis!
      </h1>
    </div>
  );
};

export default Home;
