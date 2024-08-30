// components/Header.tsx
import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
      <div className="max-w-[1024px] mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Botão de Toggle para o Menu */}
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-hamburger"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        {/* Menu Links */}
        <div
          className={`w-full mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-hamburger"
        >
          <ul className="flex flex-col md:flex-row md:space-x-4 font-medium">
            <li>
              <Link
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
                aria-current="page"
              >
                Início
              </Link>
            </li>
            <li>
              <Link
                href="../components/UnitForm.tsx"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Unidades
              </Link>
            </li>
            <li>
              <Link
                href="/pricing"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                O que preciso?
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Contato
              </Link>
            </li>
            <li>
              <Link
                href="/admin"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                href="/renter"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Locatários
              </Link>
            </li>
            <li>
              <Link
                href="/admin/addUnit"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Cadastrar Imóvel
              </Link>
            </li>
          </ul>
        </div>

        {/* Logo e Ações de Autenticação */}
        <div className="flex items-center space-x-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img src="/images/property.png" className="h-8" alt="MeuLar" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              MeuLar
            </span>
          </Link>

          {/* Ações de Login/Logout */}
          <div className="flex items-center ml-4">
            {session ? (
              <>
                <span className="text-sm text-white mr-4">
                  Bem-vindo, {session.user?.name}!
                </span>
                <button
                  onClick={() => signOut()}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                >
                  Sair
                </button>
              </>
            ) : (
              <button
                onClick={() => signIn()}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
              >
                Entrar
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
