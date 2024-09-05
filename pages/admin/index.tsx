// pages/admin/index.tsx
import React from "react";
import Link from "next/link";

const AdminIndexPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Administração</h1>
      <ul className="space-y-4">
        <li>
          <Link
            href="/admin/unitType"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Gerenciar Tipos de Unidade
          </Link>
        </li>
        <li>
          <Link
            href="/admin/features"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Gerenciar Itens Disponíveis
          </Link>
        </li>
        <li>
          <Link
            href="/admin/addUnit"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            Cadastrar Imóvel
          </Link>
        </li>
        <li>
          <Link
            href="/admin/users"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            xGerenciar Usuários
          </Link>
        </li>
        <li>
          <Link
            href="/admin/maintenance"
            className="text-blue-500 hover:text-blue-700 underline"
          >
            xGerenciar Manutenções
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default AdminIndexPage;
