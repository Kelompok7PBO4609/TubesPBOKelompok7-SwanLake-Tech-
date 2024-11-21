import React from 'react';
import Navbar from './components/Navbar';
import Carousel from './components/Carousel';
import { ThemeProvider } from './Theme/ThemeSwitcher';

function App() {
  return (
      <ThemeProvider>
        <div className="min-h-screen transition-colors duration-200 dark:bg-black">
          <Navbar/>

          <main>
            <Carousel/>

            <section className="py-12 dark:bg-black">
              <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-8 dark:text-white">Trending</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden">
                        <img
                            src={`https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800`}
                            alt="Product"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-6">
                          <div className="flex items-center gap-2 mb-2">
                        <span
                            className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-semibold rounded">
                          Admin's Choice
                        </span>
                            <span className="text-gray-500 dark:text-gray-400 text-sm">2 days ago</span>
                          </div>
                          <h3 className="text-xl font-semibold mb-2 dark:text-white">iPhone 16: Innovation or Just Another Price Hike?</h3>
                          <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
                            A comprehensive look at Apple's latest flagship phone, featuring the new A18 Pro chip and
                            titanium design.
                          </p>
                          <button
                              className="text-blue-600 dark:text-white font-semibold hover:text-blue-800 dark:hover:text-white">
                            Read More →
                          </button>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </section>
          </main>

          <footer className="py-12 bg-white shadow-md dark:bg-black transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold mb-2 text-black dark:text-white">
                    SwanLake Tech
                  </h3>
                  <p className="text-black dark:text-gray-300">
                    Your trusted source for in-depth gadget reviews and news.
                  </p>
                </div>
                <div className="text-sm text-black dark:text-white">
                  © {new Date().getFullYear()} SwanLake Tech. All rights reserved.
                </div>
              </div>
            </div>
          </footer>
        </div>
      </ThemeProvider>
  );
}

export default App;
