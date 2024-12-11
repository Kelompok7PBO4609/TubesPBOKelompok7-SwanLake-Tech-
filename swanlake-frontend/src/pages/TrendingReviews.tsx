import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Star, Heart, Scale, MessageSquare, Share2, User } from 'lucide-react';
import ReactStars from 'react-stars';
import CommentSection from '../components/CommentSection';
import ProductSpecs from '../components/ProductSpecs';
import CompareModal from '../components/CompareModal';
import AuthorCard from '../components/Author';

// Dummy data for trending reviews
const trendingReviews = [
    {
        title: "Samsung Galaxy S24 Ultra Review",
        image: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&q=80&w=800",
        slug: "samsung-galaxy-s24-ultra-review",
        description: "Exploring the most powerful features of the Galaxy S24 Ultra.",
        rating: 4.7,
    },
    {
        title: "Apple Watch Ultra Review",
        image: "https://images.unsplash.com/photo-1594785251292-5a1e9d6e7c19?auto=format&fit=crop&q=80&w=800",
        slug: "apple-watch-ultra-review",
        description: "The ultimate smartwatch experience with fitness tracking.",
        rating: 4.8,
    },
    {
        title: "MacBook Pro 16-inch Review",
        image: "https://images.unsplash.com/photo-1612458033607-c750fd81d66f?auto=format&fit=crop&q=80&w=800",
        slug: "macbook-pro-16-inch-review",
        description: "The powerhouse laptop for professionals.",
        rating: 4.9,
    },
];

export default function ReviewPage() {
    const { slug } = useParams<{ slug: string }>(); // Mendapatkan slug dari URL
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
    const [rating] = useState(4.5);

    // Use slug to find the specific review data (Example logic for slug)
    useEffect(() => {
        console.log('Review for: ', slug);
    }, [slug]);

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
                                    <h1 className="text-3xl font-bold dark:text-white">{slug ? slug.replace('-', ' ') : 'Loading...'}</h1>
                                    <div className="flex items-center gap-4">
                                        <button
                                            onClick={() => setIsWishlisted(!isWishlisted)}
                                            className={`p-2 rounded-full transition-colors ${isWishlisted ? 'bg-red-100 text-red-500 dark:bg-red-900 dark:text-red-300' : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300'}`}
                                        >
                                            <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-current' : ''}`} />
                                        </button>
                                        <button onClick={() => setIsCompareModalOpen(true)} className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 transition-colors">
                                            <Scale className="w-6 h-6" />
                                        </button>
                                        <button className="p-2 rounded-full bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-300 transition-colors">
                                            <Share2 className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-2">
                                        <ReactStars count={5} value={rating} size={24} color2="#FDB241" edit={false} />
                                        <span className="text-lg font-semibold dark:text-white">{rating}</span>
                                    </div>
                                    <div className="text-gray-500 dark:text-gray-400">|</div>
                                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                                        <MessageSquare className="w-5 h-5" />
                                        <span>128 comments</span>
                                    </div>
                                </div>

                                <div className="prose dark:prose-invert max-w-none">
                                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                                        The iPhone 15 Pro Max represents Apple's most ambitious smartphone yet, featuring groundbreaking innovations in camera technology, performance, and design.
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

                        {/* Trending Reviews Section */}
                        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-bold dark:text-white mb-4">Trending Reviews</h3>
                            <div className="space-y-4">
                                {trendingReviews.map((review) => (
                                    <div key={review.slug} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div>
                                            <h4 className="font-semibold dark:text-white">{review.title}</h4>
                                            <p className="text-gray-500 dark:text-gray-400">{review.description}</p>
                                        </div>
                                        <span className="text-xl font-bold text-green-600 dark:text-green-400">{review.rating} <Star className="w-4 h-4 inline-block" /></span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <CompareModal isOpen={isCompareModalOpen} onClose={() => setIsCompareModalOpen(false)} />
            </div>
        </div>
    );
}
