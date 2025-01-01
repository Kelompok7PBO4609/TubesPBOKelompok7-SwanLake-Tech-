import React, { useState } from "react";
import { Search, Menu, Sun, Moon, UserCircle, LogOut } from "lucide-react";
import { useTheme } from "../Theme/ThemeSwitcher";
import SideMenu from "./SideMenu";
import AuthModal from "./AuthModal";
import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

interface Review {
  reviewID: string;
  productName: string;
  reviewTitle: string;
  cardDesc: string;
  productType: string;
  price: number;
  imageName: string;
  badge?: string;
  date?: string;
  rating: number;
}

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State untuk pencarian
  const [searchResults, setSearchResults] = useState<Review[]>([]); // State untuk hasil pencarian
  const navigate = useNavigate();

  const isAuthenticated = UserService.isAuthenticated();
  const isAdmin = UserService.isAdmin();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      UserService.logout();
      navigate("/");
      window.location.reload();
    }
  };

  // Fungsi untuk menangani pencarian review
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();  // Ubah input ke lowercase untuk pencarian case-insensitive
    setSearchTerm(value);

    if (value.trim() !== "") {
      fetch(`http://localhost:8080/get/review`)
          .then((response) => response.json())
          .then((data: Review[]) => {
            // Filter hasil yang mengandung kata dari input pencarian
            const filteredResults = data.filter((review: Review) =>
                review.productName.toLowerCase().includes(value) ||
                review.reviewTitle.toLowerCase().includes(value)
            );
            setSearchResults(filteredResults);  // Set hasil filter
          })
          .catch((error) => {
            console.error("Error fetching search results:", error);
          });
    } else {
      setSearchResults([]); // Kosongkan hasil jika pencarian kosong
    }
  };


  return (
      <>
        <nav className="bg-white dark:bg-black shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <Link to="/"> {/* Tambahkan Link yang mengarah ke homepage */}
                  <span className="text-2xl font-bold text-gray-900 dark:text-white cursor-pointer">
                  SwanLake Tech
                </span>
                </Link>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-4">
                {/* Search Bar - Visible only if authenticated */}
                {isAuthenticated && (
                    <div className="relative hidden md:block">
                      <input
                          type="text"
                          value={searchTerm}
                          onChange={handleSearchChange} // Tambahkan handler
                          placeholder="Search reviews..."
                          className="w-64 px-4 py-2 pl-10 text-sm bg-gray-100 dark:bg-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"/>

                      {/* Daftar hasil pencarian */}
                      {searchResults.length > 0 && (
                          <ul className="absolute z-10 w-64 bg-white dark:bg-black/90 dark:text-white rounded-lg shadow-lg mt-2">
                            {searchResults.slice(0, 5).map((review: Review, index) => (  // Batasi hasil pencarian menjadi 5
                                <li
                                    key={index}
                                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                                    onClick={() => navigate(`/product-review/${review.reviewID}`)}
                                >
                                  {review.reviewTitle} - {review.productName}
                                </li>
                            ))}
                          </ul>
                      )}
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
                          <Sun className="w-5 h-5"/>
                      ) : (
                          <Moon className="w-5 h-5"/>
                      )}
                    </button>
                )}

                {/* Admin Dashboard Button */}
                {isAuthenticated && isAdmin && (
                    <button
                        onClick={() => navigate("/admin-dashboard")}
                        className="p-2 text-blue-500 dark:text-blue-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Admin Dashboard"
                    >
                      Admin Dashboard
                    </button>
                )}

                {/* Auth Modal Button */}
                {isAuthenticated && (
                    <button
                        onClick={() => setIsAuthOpen(true)}
                        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Profile"
                    >
                      <UserCircle className="w-5 h-5"/>
                    </button>
                )}

                {/* Logout Button */}
                {isAuthenticated && (
                    <button
                        onClick={handleLogout}
                        className="p-2 text-red-500 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        aria-label="Logout"
                    >
                      <LogOut className="w-5 h-5"/>
                    </button>
                )}

                {/* Side Menu Button */}
                {isAuthenticated && (
                    <button
                        onClick={() => setIsMenuOpen(true)}
                        className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
                        aria-label="Open menu"
                    >
                      <Menu className="w-5 h-5"/>
                    </button>
                )}
              </div>
            </div>
          </div>
        </nav>

        {/* Side Menu */}
        {isAuthenticated && (
            <SideMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)}/>
        )}

        {/* Auth Modal */}
        {isAuthenticated && (
            <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)}/>
        )}
      </>
  );
}
