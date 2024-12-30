import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ReviewPage from "./pages/ReviewPage";
import { ThemeProvider } from "./Theme/ThemeSwitcher";
import TopRatedReviewsPage from "./pages/TopRatedPage";
import TrendingReviewsPage from "./pages/TrendingReviews";
import UserList from "./pages/UserList";
import ReviewList from "./pages/ReviewList";
import LoginPage from "./auth/LoginPage";
import ProtectedRoute from "./auth/ProtectedRoute";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
          <Navbar />
          <Routes>
            {/* Halaman tanpa autentikasi */}
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<div>RegisterPage</div>} />

            {/* Halaman yang membutuhkan autentikasi */}
            <Route
              path="/category/:category"
              element={
                <ProtectedRoute>
                  <CategoryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/review/:slug"
              element={
                <ProtectedRoute>
                  <ReviewPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/top-rated/"
              element={
                <ProtectedRoute>
                  <TopRatedReviewsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/trending-review/"
              element={
                <ProtectedRoute>
                  <TrendingReviewsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/userlist/"
              element={
                <ProtectedRoute>
                  <UserList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/reviewlist/"
              element={
                <ProtectedRoute>
                  <ReviewList />
                </ProtectedRoute>
              }
            />
            <Route
              path="/homepage/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin-dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
