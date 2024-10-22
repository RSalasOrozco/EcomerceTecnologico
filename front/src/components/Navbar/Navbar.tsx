"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import categoriesToPreLoad from "../../helpers/categories";
import { IUserSession } from "../../interfaces/types";

const Navbar = () => {
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const userData = localStorage.getItem("userSession");
      if (userData) {
        setUserSession(JSON.parse(userData));
      }
    }
  }, []);

  const handleLogout = (): void => {
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("userSession");
    }
    setUserSession(null);
  };

  const toggleCategories = () => {
    setIsCategoriesOpen(!isCategoriesOpen);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav>
      <div>
        <header className="fixed inset-x-0 top-0 z-30 mx-auto w-full max-w-screen-md border border-gray-100 bg-white/80 py-3 shadow backdrop-blur-lg md:top-6 md:rounded-3xl lg:max-w-screen-lg">
          <div className="px-4">
            <div className="flex items-center justify-between">
              <div className="flex shrink-0">
                <Link
                  aria-current="page"
                  className="flex items-center"
                  href="/"
                >
                  <img
                    className="h-7 w-auto"
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    alt="Logo de la marca Apple"
                  />
                </Link>
              </div>
              <div className="hidden md:flex md:items-center md:justify-center md:gap-5">
                {categoriesToPreLoad.map((category) => (
                  <Link
                    key={category.id}
                    href={`/products/${category.id}`}
                    className="flex rounded-lg px-2 py-1 text-sm font-medium text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:text-gray-900"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
              <div className="flex items-center justify-end gap-3">
                {userSession ? (
                  <>
                    <Link
                      className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                      href="/dashboard"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="currentColor"
                          d="M4 22a8 8 0 1 1 16 0zm8-9c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6"
                        />
                      </svg>
                    </Link>
                    <Link
                      className="hidden items-center justify-center rounded-xl bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 transition-all duration-150 hover:bg-gray-50 sm:inline-flex"
                      href="/cart"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 50 50"
                      >
                        <circle cx="44" cy="42" r="4" fill="black" />
                        <circle cx="15" cy="42" r="4" fill="black" />
                        <path
                          fill="black"
                          d="M47 33H15.771l.667-1.082c.286-.464.37-1.025.233-1.553l-.651-2.506l28.983-1.506C46.102 26.297 47 25.35 47 24.25V11c0-1.1-.9-2-2-2H11.119l-.391-1.503A2 2 0 0 0 8.792 6H2a2 2 0 0 0 0 4h5.246l5.34 20.545l-2.1 3.405a1.998 1.998 0 0 0-.043 2.024A1.997 1.997 0 0 0 12.188 37H47a2 2 0 0 0 0-4"
                        />
                      </svg>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="hidden items-center justify-center rounded-xl bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-red-500 sm:inline-flex"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:bg-blue-500 sm:inline-flex"
                    href="/login"
                  >
                    Sign in
                  </Link>
                )}
                <div className="md:hidden">
                  <button
                    className="inline-flex items-center justify-center gap-1 rounded-full p-2 text-gray-900 transition-all duration-200 hover:bg-gray-100"
                    onClick={toggleMenu}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 5.25h16.5m-16.5 6.75h16.5m-16.5 6.75h16.5"
                      />
                    </svg>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow bg-white/90 border-gray-100 backdrop-blur-lg ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          href="/"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Home
                        </Link>
                        {categoriesToPreLoad.map((category) => (
                          <Link
                            key={category.id}
                            href={`/products/${category.id}`}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            {category.name}
                          </Link>
                        ))}
                        {userSession ? (
                          <>
                            <Link
                              href="/dashboard"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              Dashboard
                            </Link>
                            <Link
                              href="/cart"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            >
                              Cart
                            </Link>
                            <button
                              onClick={handleLogout}
                              className="block w-full text-left px-4 py-2 text-sm text-red-800 hover:bg-gray-100 hover:text-gray-900"
                            >
                              Log out
                            </button>
                          </>
                        ) : (
                          <Link
                            href="/login"
                            className="block px-4 py-2 text-sm text-blue-700 hover:bg-gray-100 hover:text-gray-900"
                          >
                            Sign in
                          </Link>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>
    </nav>
  );
};

export default Navbar;
