import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ReviewPage from './pages/ReviewPage';
import { ThemeProvider } from './Theme/ThemeSwitcher';
import TopRatedReviewsPage from "./pages/TopRatedPage";
import TrendingReviewsPage from "./pages/TrendingReviews";

export default function App() {
  return (
      <ThemeProvider>
        <Router>
          <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/category/:category" element={<CategoryPage />} />
              <Route path="/review/:id" element={<ReviewPage />} />
                <Route path="/top-rated/" element={<TopRatedReviewsPage />} />
                <Route path="/trending-review/" element={<TrendingReviewsPage />} />
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
  );
}