// import React, { useState, useEffect } from 'react';
// import {useParams, Navigate, useNavigate} from 'react-router-dom';
// import {Star, Heart, Scale, MessageSquare, Share2, ArrowLeft} from 'lucide-react';
// import ReactStars from 'react-stars';
// import { useReviewStore } from '../stores/ReviewStore';
// import CommentSection from '../components/CommentSection';
// import ProductSpecs from '../components/ProductSpecs';
// import CompareModal from '../components/CompareModal';
// import AuthorCard from '../components/Author';

// export default function ReviewPage() {
//     const { slug } = useParams<{ slug: string }>();
//     const getReviewBySlug = useReviewStore(state => state.getReviewBySlug);
//     const review = slug ? getReviewBySlug(slug) : undefined;
//     const navigate = useNavigate();

//     const [isWishlisted, setIsWishlisted] = useState(false);
//     const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, [slug]);

//     if (!review) {
//         return <Navigate to="/" replace />;
//     }

//     return (
//         <div className="max-w-7xl mx-auto px-4 py-8">
//             <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                 {/* Tombol Back */}
//                 <div className="fixed top-4 left-4 z-50">
//                     <button
//                         onClick={() => navigate("/")}
//                         className="flex items-center gap-2 dark:text-white bg-white dark:bg-black px-4 py-2 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//                     >
//                         <ArrowLeft className="w-5 h-5" />
//                         <span>Back</span>
//                     </button>
//                 </div>
//                 {/* Main Content */}
//                 <div className="lg:col-span-2">
//                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//                         <img
//                             src={review.image}
//                             alt={review.title}
//                             className="w-full h-96 object-cover"
//                         />

//                         <div className="p-6">
//                             <div className="flex items-center justify-between mb-4">
//                                 <h1 className="text-3xl font-bold dark:text-white">{review.title}</h1>
//                                 <div className="flex items-center gap-4">
//                                     <button
//                                         onClick={() => setIsWishlisted(!isWishlisted)}
//                                         className={`p-2 rounded-full transition-colors ${
//                                             isWishlisted
//                                                 ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300'
//                                                 : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
//                                         }`}
//                                     >
//                                         <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
//                                     </button>
//                                     <button
//                                         onClick={() => setIsCompareModalOpen(true)}
//                                         className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 transition-colors"
//                                     >
//                                         <Scale className="w-6 h-6" />
//                                     </button>
//                                     <button className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 transition-colors">
//                                         <Share2 className="w-6 h-6" />
//                                     </button>
//                                 </div>
//                             </div>

//                             <div className="flex items-center gap-4 mb-6">
//                                 <div className="flex items-center gap-2">
//                                     <ReactStars
//                                         count={5}
//                                         value={review.rating}
//                                         size={24}
//                                         color2="#FDB241"
//                                         edit={false}
//                                     />
//                                     <span className="text-lg font-semibold dark:text-white">{review.rating}</span>
//                                 </div>
//                                 <div className="text-gray-500 dark:text-gray-400">|</div>
//                                 <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
//                                     <MessageSquare className="w-5 h-5" />
//                                     <span>128 comments</span>
//                                 </div>
//                             </div>

//                             <div className="prose dark:prose-invert max-w-none">
//                                 <p className="text-gray-600 dark:text-gray-300 mb-6">
//                                     {review.description}
//                                 </p>

//                                 <h2 className="text-2xl font-bold dark:text-white mb-4">Key Features</h2>
//                                 <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300">
//                                     {review.keyFeatures.map((feature, index) => (
//                                         <li key={index}>{feature}</li>
//                                     ))}
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>

//                     <CommentSection />
//                 </div>

//                 {/* Sidebar */}
//                 <div className="space-y-6">
//                     <AuthorCard author={review.author} />
//                     <ProductSpecs specs={review.specs} />

//                     <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
//                         <h3 className="text-xl font-bold dark:text-white mb-4">Price Comparison</h3>
//                         <div className="space-y-4">
//                             <div className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
//                                 <div>
//                                     <h4 className="font-semibold dark:text-white">Tokopedia</h4>
//                                     <span className="text-gray-500 dark:text-gray-400">Free shipping</span>
//                                 </div>
//                                 <span className="text-xl font-bold text-green-600 dark:text-green-400">
//                   ${review.price}
//                 </span>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <CompareModal
//                 isOpen={isCompareModalOpen}
//                 onClose={() => setIsCompareModalOpen(false)}
//                 currentProduct={review}
//             />
//         </div>
//     );
// }

// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import { Star, Heart, Scale, MessageSquare, Share2, ArrowLeft } from 'lucide-react';
// import ReactStars from 'react-stars';
// import CommentSection from '../components/CommentSection';
// import ProductSpecs from '../components/ProductSpecs';
// import CompareModal from '../components/CompareModal';
// import AuthorCard from '../components/Author';
// import axios from 'axios';

// interface Review {
//   reviewID: string;
//   productName: string;
//   productType: string;
//   reviewTitle: string;
//   reviewText: string;
//   processor: string;
//   ram: string;
//   storage: string;
//   display: string;
//   battery: string;
//   camera: string;
//   price: number;
//   rating: number;
//   keyFeatures: string[];
//   performance: string;
//   imageName: string;
//   author: {
//     name: string;
//     avatar: string;
//   };
//   specs: Record<string, string>;
// }

// export default function ReviewPage() {
//   const { reviewID } = useParams<{ reviewID: string }>();
//   const [review, setReview] = useState<Review | null>(null);
//   const [isWishlisted, setIsWishlisted] = useState(false);
//   const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     if (reviewID) {
//       fetchReview(reviewID);
//     }
//   }, [reviewID]);

//   const fetchReview = async (id: string) => {
//     try {
//       const result = await axios.get(`http://localhost:8080/get/review/${id}`);
//       setReview(result.data);
//     } catch (error) {
//       console.error('Error fetching review:', error);
//     }
//   };

//   if (!review) {
//     return <div className="container mx-auto p-6">Loading...</div>;
//   }

//   return (
//     <div className="max-w-7xl mx-auto px-4 py-8">
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Back Button */}
//         <div className="fixed top-4 left-4 z-50">
//           <button
//             onClick={() => navigate('/')}
//             className="flex items-center gap-2 dark:text-white bg-white dark:bg-black px-4 py-2 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5" />
//             <span>Back</span>
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className="lg:col-span-2">
//           <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
//             <img
//               src={review.imageName}
//               alt={review.productName}
//               className="w-full h-96 object-cover"
//             />

//             <div className="p-6">
//               <div className="flex items-center justify-between mb-4">
//                 <h1 className="text-3xl font-bold dark:text-white">{review.reviewTitle}</h1>
//                 <div className="flex items-center gap-4">
//                   <button
//                     onClick={() => setIsWishlisted(!isWishlisted)}
//                     className={`p-2 rounded-full transition-colors ${
//                       isWishlisted
//                         ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300'
//                         : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'
//                     }`}
//                   >
//                     <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
//                   </button>
//                   <button
//                     onClick={() => setIsCompareModalOpen(true)}
//                     className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 transition-colors"
//                   >
//                     <Scale className="w-6 h-6" />
//                   </button>
//                   <button className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 transition-colors">
//                     <Share2 className="w-6 h-6" />
//                   </button>
//                 </div>
//               </div>

//               <div className="flex items-center gap-4 mb-6">
//                 <div className="flex items-center gap-2">
//                   <ReactStars count={5} value={review.rating} size={24} color2="#FDB241" edit={false} />
//                   <span className="text-lg font-semibold dark:text-white">{review.rating}</span>
//                 </div>
//                 <div className="text-gray-500 dark:text-gray-400">|</div>
//                 <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
//                   <MessageSquare className="w-5 h-5" />
//                   <span>128 comments</span>
//                 </div>
//               </div>

//               {/* <div className="prose dark:prose-invert max-w-none">
//                 <p className="text-gray-600 dark:text-gray-300 mb-6">{review.reviewText}</p>
//                 <h2 className="text-2xl font-bold dark:text-white mb-4">Key Features</h2>
//                 <ul className="list-disc pl-6 mb-6 text-gray-600 dark:text-gray-300">
//                   {review.keyFeatures.map((feature, index) => (
//                     <li key={index}>{feature}</li>
//                   ))}
//                 </ul>
//               </div> */}
//             </div>
//           </div>

//           <CommentSection />
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, Scale, Share2, ArrowLeft, MessageSquare } from "lucide-react";
import ReactStars from "react-stars";
import CommentSection from "../components/CommentSection";
import ProductSpecs from "../components/ProductSpecs";
import axios from "axios";

interface Review {
  reviewID: string;
  productName: string;
  productType: string;
  reviewTitle: string;
  reviewText: string;
  imageName: string;
  price: number;
  rating: number;
  keyFeatures: string[];
  processor: string; // Tambahkan properti ini
  processorDesc: string; // Tambahkan deskripsi prosesor
  storage: string; // Tambahkan properti ini
  storageDesc: string; // Tambahkan deskripsi penyimpanan
  display: string; // Tambahkan properti ini
  displayDesc: string; // Tambahkan deskripsi layar
  battery: string; // Tambahkan properti ini
  batteryDesc: string; // Tambahkan deskripsi baterai
}

export default function ReviewPage() {
  const { reviewID } = useParams<{ reviewID: string }>();
  const [review, setReview] = useState<Review | null>(null);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (reviewID) {
      fetchReview(reviewID);
    }
  }, [reviewID]);

  const fetchReview = async (id: string) => {
    try {
      const result = await axios.get(`http://localhost:8080/get/review/${id}`);
      setReview(result.data);
    } catch (error) {
      console.error("Error fetching review:", error);
    }
  };

  if (!review) {
    return <div className="container mx-auto p-6">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Back Button */}
        <div className="fixed top-4 left-4 z-50">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 dark:text-white bg-white dark:bg-black px-4 py-2 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <img
              src={`${review.imageName}`}
              alt={review.productName}
              className="w-full h-96 object-cover"
            />

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold dark:text-white">
                  {review.reviewTitle}
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
                  <button className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 transition-colors">
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
                    value={review.rating}
                    size={24}
                    color2="#FDB241"
                    edit={false}
                  />
                  <span className="text-lg font-semibold dark:text-white">
                    {review.rating}
                  </span>
                </div>
                <div className="text-gray-500 dark:text-gray-400">|</div>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <MessageSquare className="w-5 h-5" />
                  <span>128 comments</span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {review.reviewText}
              </p>
            </div>
          </div>

          <CommentSection />
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="space-y-6">
            <ProductSpecs
              specs={{
                processor: review.processor,
                processorDesc: review.processorDesc,
                storage: review.storage,
                storageDesc: review.storageDesc,
                display: review.display,
                displayDesc: review.displayDesc,
                battery: review.battery,
                batteryDesc: review.batteryDesc,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
