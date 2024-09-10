import { useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Header: React.FC = () => {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleProfileMenu = () => {
    setProfileMenuOpen(!isProfileMenuOpen);
  };

  return (
    <nav className="border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 w-full">
      <div className="max-w-[1024px] w-full mx-auto flex flex-wrap items-center justify-between p-4">
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

        {/* Logo e Ações de Autenticação */}
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
        <div className="relative flex items-center ml-4">
          {session ? (
            <>
              {session.user?.image ? (
                <img
                  src={session.user.image}
                  alt="User profile"
                  onClick={toggleProfileMenu}
                  className="w-8 h-8 rounded-full cursor-pointer"
                />
              ) : (
                <span className="text-sm text-white mr-4">
                  Bem-vindo, {session.user?.name}!
                </span>
              )}

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
                  <Link
                    href="/meus-dados"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Meus Dados
                  </Link>
                  <Link
                    href="/meus-dados"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Meus Favoritos
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              )}
            </>
          ) : (
            <button onClick={() => signIn()} className="btn">
              Entrar
            </button>
          )}
        </div>

        {/* Menu Links */}
        <div
          className={`w-full mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700 ${
            isOpen ? "block" : "hidden"
          }`}
          id="navbar-hamburger"
        >
          <ul className="flex flex-col md:flex-row md:space-x-4 font-medium ">
            <li className="mx-2">
              <Link
                href="/"
                className="block py-2 px-3 text-white bg-blue-700 rounded dark:bg-blue-600"
                aria-current="page"
              >
                Início
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Unidades
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                O que preciso?
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Contato
              </Link>
            </li>
            <li className="mx-2">
              <Link
                href="/"
                className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Admin
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
