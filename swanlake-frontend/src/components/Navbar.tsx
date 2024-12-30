import React, { useState } from "react";
import { Search, Menu, Sun, Moon, UserCircle, LogOut } from "lucide-react";
import { useTheme } from "../Theme/ThemeSwitcher";
import SideMenu from "./SideMenu";
import AuthModal from "./AuthModal";
import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom"; // Import useNavigate

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin(); // Check if the user is an admin

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      UserService.logout();
      navigate("/"); // Redirect to login page
    }
  };

  return (
    <>
      <nav className="bg-white dark:bg-black shadow-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                SwanLake Tech
              </span>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4">
              {/* Search Bar - Visible only if authenticated */}
              {isAuthenticated && (
                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="Search reviews..."
                    className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              )}

              {/* Theme Toggle - Visible only if authenticated */}
              {isAuthenticated && (
                <button
                  onClick={toggleTheme}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  aria-label="Toggle theme"
                >
                  {theme === "dark" ? (
                    <Sun className="w-5 h-5" />
                  ) : (
                    <Moon className="w-5 h-5" />
                  )}
                </button>
              )}

              {/* Admin Dashboard Button - Visible only if admin */}
              {isAuthenticated && isAdmin && (
                <button
                  onClick={() => navigate("/admin-dashboard")}
                  className="p-2 text-blue-500 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Admin Dashboard"
                >
                  Admin Dashboard
                </button>
              )}

              {/* Auth Modal Button - Visible only if authenticated */}
              {isAuthenticated && (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Profile"
                >
                  <UserCircle className="w-5 h-5" />
                </button>
              )}

              {/* Logout Button - Visible only if authenticated */}
              {isAuthenticated && (
                <button
                  onClick={handleLogout}
                  className="p-2 text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                  aria-label="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              )}

              {/* Divider */}
              {isAuthenticated && (
                <div className="w-px h-6 bg-gray-200 dark:bg-gray-700" />
              )}

              {/* Side Menu Button - Visible only if authenticated */}
              {isAuthenticated && (
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                  aria-label="Open menu"
                >
                  <Menu className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Side Menu */}
      {isAuthenticated && (
        <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
      )}

      {/* Auth Modal */}
      {isAuthenticated && (
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      )}
    </>
  );
}
