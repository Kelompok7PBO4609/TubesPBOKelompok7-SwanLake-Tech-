import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart, Scale, MessageSquare, Share2, User } from "lucide-react";
import ReactStars from "react-stars";
import CommentSection from "../components/CommentSection";
import ProductSpecs from "../components/ProductSpecs";
import CompareModal from "../components/CompareModal";
import AuthorCard from "../components/Author";
import axios from "axios";

export default function ReviewPage() {
  const { slug } = useParams<{ slug: string }>(); // Mendapatkan slug dari URL
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [rating] = useState(4.5);
  const [accounts, setAccounts] = useState([]);

  // Gunakan slug untuk mencari data review yang sesuai
  useEffect(() => {
    // Di sini bisa menambahkan logika untuk mengambil data berdasarkan slug
    console.log("Review for: ", slug); // Misalnya, melakukan fetch berdasarkan slug
    loadAccounts();
  }, [slug]);

  const loadAccounts = async () => {
    const result = await axios.get("htt[://localhost:8080/accounts");
    setAccounts(result.data);
  };

  return (
    <div className="min-h-screen dark:bg-black/60">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1400"
                alt="iPhone 15 Pro Max"
                className="w-full h-96 object-cover"
              />

              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h1 className="text-3xl font-bold dark:text-white">
                    {slug ? slug.replace("-", " ") : "Loading..."}
                  </h1>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-2 rounded-full transition-colors ${
                        isWishlisted
                          ? "bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300"
                          : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      <Heart
                        className={`w-6 h-6 ${
                          isWishlisted ? "fill-current" : ""
                        }`}
                      />
                    </button>
                    <button
                      onClick={() => setIsCompareModalOpen(true)}
                      className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 transition-colors"
                    >
                      <Scale className="w-6 h-6" />
                    </button>
                    <button className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 transition-colors">
                      <Share2 className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <ReactStars
                      count={5}
                      value={rating}
                      size={24}
                      color2="#FDB241"
                      edit={false}
                    />
                    <span className="text-lg font-semibold dark:text-white">
                      {rating}
                    </span>
                  </div>
                  <div className="text-gray-500 dark:text-gray-400">|</div>
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                    <MessageSquare className="w-5 h-5" />
                    <span>128 comments</span>
                  </div>
                </div>

                {/* TEST */}
                <div className="container">
                  <div className="py-4">
                    <table className="table border shadow">
                      <thead>
                        <tr>
                          <th scope="col">Account ID</th>
                          <th scope="col">Username</th>
                          <th scope="col">Password</th>
                          <th scope="col">Email</th>
                        </tr>
                      </thead>
                      <tbody>
                        {accounts.map((account, index) => (
                          <tr>
                            <th scope="row" key={index}>
                              {index + 1}
                            </th>
                            <td>{account.accountID}</td>
                            <td>{account.username}</td>
                            <td>{account.password}</td>
                            <td>{account.email}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    The iPhone 15 Pro Max represents Apple's most ambitious
                    smartphone yet, featuring groundbreaking innovations in
                    camera technology, performance, and design. With its
                    titanium frame and A17 Pro chip, it sets new standards for
                    what a flagship phone can be.
                  </p>

                  <h2 className="text-2xl font-bold dark:text-white mb-4">
                    Key Features
                  </h2>
                  <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300">
                    <li>A17 Pro chip with enhanced GPU performance</li>
                    <li>48MP main camera with 5x optical zoom</li>
                    <li>Titanium design with Action Button</li>
                    <li>USB-C with Thunderbolt speeds</li>
                  </ul>

                  <h2 className="text-2xl font-bold dark:text-white mb-4">
                    Performance
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6">
                    The A17 Pro chip delivers unprecedented performance,
                    handling complex tasks and gaming with ease. Our benchmarks
                    show up to 20% improvement in CPU performance and 30% in GPU
                    tasks compared to the previous generation.
                  </p>
                </div>
              </div>
            </div>

            <CommentSection />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <AuthorCard />
            <ProductSpecs />

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold dark:text-white mb-4">
                Price Comparison
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-semibold dark:text-white">Amazon</h4>
                    <span className="text-gray-500 dark:text-gray-400">
                      Free shipping
                    </span>
                  </div>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    $999
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-semibold dark:text-white">Best Buy</h4>
                    <span className="text-gray-500 dark:text-gray-400">
                      Store pickup
                    </span>
                  </div>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    $999
                  </span>
                </div>
                <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h4 className="font-semibold dark:text-white">
                      Apple Store
                    </h4>
                    <span className="text-gray-500 dark:text-gray-400">
                      Free shipping
                    </span>
                  </div>
                  <span className="text-xl font-bold text-green-600 dark:text-green-400">
                    $999
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CompareModal
          isOpen={isCompareModalOpen}
          onClose={() => setIsCompareModalOpen(false)}
        />
      </div>
    </div>
  );
}
