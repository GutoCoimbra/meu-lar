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
    <nav className="relative z-50 bg-gray-50 dark:bg-gray-800 w-full">
      <div className="max-w-[1024px] w-full mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Botão de Toggle para o Menu */}
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex items-center justify-center p-2 w-10 h-10 text-xs text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        <div className="relative flex items-center ml-4 hidden md:flex">
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
                <span className="text-xs text-white mr-4">
                  Bem-vindo, {session.user?.name}!
                </span>
              )}
              {isProfileMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    href="/meus-dados"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Meus Dados
                  </Link>
                  <Link
                    href="/favorites"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Meus Favoritos
                  </Link>
                  <Link
                    href="/my-visits"
                    className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                  >
                    Minhas visitas agendadas
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-gray-100"
                  >
                    Sair
                  </button>
                </div>
              )}
            </>
          ) : (
            <button onClick={() => signIn("google")} className="btn">
              Entrar
            </button>
          )}
        </div>
      </div>

      {/* Menu lateral deslizante */}
      <div
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-md transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800">
          <div className="flex items-center space-x-2">
            <img src="/images/property.png" alt="Logo" className="h-6" />
            <span className="text-xl text-white font-bold">MeuLar</span>
          </div>
          <button
            onClick={toggleMenu}
            className="text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Login/Logout no menu lateral para mobile */}
        <div className="block md:hidden p-4 border-b border-gray-200">
          {session ? (
            <>
              <div className="flex items-center space-x-3">
                {session.user?.image && (
                  <img
                    src={session.user.image}
                    alt="User profile"
                    className="w-8 h-8 rounded-full"
                  />
                )}
                <span className="text-xs font-bold text-gray-700">
                  {session.user?.name}
                </span>
              </div>

              <div className="mt-2">
                <Link
                  href="/meus-dados"
                  className="block px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                >
                  Meus Dados
                </Link>

                <button
                  onClick={() => signOut()}
                  className="block w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-gray-100"
                >
                  Sair
                </button>
              </div>
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="block w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
            >
              Entrar
            </button>
          )}
        </div>

        <ul className="space-y-4 p-4">
          <li>
            <Link
              href="/favorites"
              className="flex text-xs items-center text-gray-700"
            >
              Favoritos
            </Link>
          </li>

          <li>
            <Link
              href="/my-visits"
              className="flex text-xs items-center text-gray-700"
            >
              Visitas agendadas
            </Link>
          </li>

          <li>
            <Link
              href="/contract"
              className="flex text-xs items-center text-gray-700"
            >
              Contrato e boletos
            </Link>
          </li>
        </ul>
      </div>

      {/* Background overlay quando o menu estiver aberto */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30"
          onClick={toggleMenu}
        ></div>
      )}
    </nav>
  );
};

export default Header;
