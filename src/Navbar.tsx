import React from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-10 border-b bg-white px-4 py-3 shadow-sm">
      <div className="mx-auto flex max-w-2xl items-center justify-between gap-3">
        <div className="flex flex-1 items-center gap-3">
          <Link to="/" className="text-lg font-bold text-blue-600">
            MiniFB
          </Link>
          <input
            type="text"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onSearchChange(e.target.value)
            }
            placeholder="Tìm kiếm bài viết..."
            className="w-full max-w-xs rounded-full bg-gray-100 px-3.5 py-1.5 text-sm outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <nav className="flex gap-2 text-sm font-semibold">
          <Link
            to="/"
            className={`rounded-lg px-3 py-1.5 ${
              pathname === "/"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Home
          </Link>
          <Link
            to="/profile"
            className={`rounded-lg px-3 py-1.5 ${
              pathname === "/profile"
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-700"
            }`}
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
};