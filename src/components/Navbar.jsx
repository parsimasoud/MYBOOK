"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function loadUser() {
      const response = await fetch("/api/auth/me");

      const data = await response.json();

      setUser(data);
    }

    loadUser();
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    setUser(null);
    setMenuOpen(false);

    router.push("/");
    router.refresh();
  }

  return (
    <header className="bg-neutral-900 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link href="/" className="text-2xl font-bold text-white">
          📚 BookReader
        </Link>

        <nav className="flex items-center gap-8">
          <Link
            href="/"
            className={
              pathname === "/"
                ? "text-blue-500 font-semibold"
                : "text-gray-300 hover:text-white"
            }
          >
            Home
          </Link>

          <Link
            href="/levels"
            className={
              pathname.startsWith("/levels")
                ? "text-blue-500 font-semibold"
                : "text-gray-300 hover:text-white"
            }
          >
            Levels
          </Link>

          {/* <Link
            href="/library"
            className={
              pathname.startsWith("/library")
                ? "text-blue-500 font-semibold"
                : "text-gray-300 hover:text-white"
            }
          >
            Library
          </Link> */}

          <Link
            href="/signup"
            className={
              pathname.startsWith("/signup")
                ? "text-blue-500 font-semibold"
                : "text-gray-300 hover:text-white"
            }
          >
            signup
          </Link>

          {/* <Link
            href="/profile"
            className={
              pathname.startsWith("/profile")
                ? "text-blue-500 font-semibold"
                : "text-gray-300 hover:text-white"
            }
          >
            Profile
          </Link> */}
          {/* {user ? (
            <Link
              href="/profile"
              className={
                pathname.startsWith("/profile")
                  ? "text-blue-500 font-semibold"
                  : "text-gray-300 hover:text-white"
              }
            >
              {user.name}
            </Link>
          ) : (
            <Link href="/signin" className="text-gray-300 hover:text-white">
              Sign In
            </Link>
          )} */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 text-gray-300 hover:text-white"
              >
                👤 {user.name}
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-3 w-48 rounded-xl bg-neutral-800 border border-neutral-700 shadow-xl">
                  <Link
                    href="/profile"
                    className="block px-4 py-3 hover:bg-neutral-700"
                  >
                    👤 Profile
                  </Link>

                  <Link
                    href="/settings"
                    className="block px-4 py-3 hover:bg-neutral-700"
                  >
                    ⚙ Settings
                  </Link>

                  <hr className="border-neutral-700" />

                  {/* <button className="w-full text-left px-4 py-3 hover:bg-red-700">
                    🚪 Logout
                  </button> */}
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 hover:bg-red-700"
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin" className="text-gray-300 hover:text-white">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
