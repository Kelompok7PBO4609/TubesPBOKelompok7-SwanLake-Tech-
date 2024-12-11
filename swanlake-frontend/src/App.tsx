import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ReviewPage from './pages/ReviewPage';
import { ThemeProvider } from './Theme/ThemeSwitcher';

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
            </Routes>
          </div>
        </Router>
      </ThemeProvider>
  );
}