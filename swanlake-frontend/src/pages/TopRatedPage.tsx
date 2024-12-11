import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import ReviewCard from '../components/ReviewCard';
import { SortDesc, ArrowLeft } from 'lucide-react';

interface ReviewData {
    image: string;
    title: string;
    description: string;
    date: string;
    badge?: string;
    slug: string;
    rating: number;
}

// Data dummy untuk review
const reviewData: ReviewData[] = [
    {
        image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
        title: "iPhone 15 Pro Max Review",
        slug: "iphone-15-pro-max-review",
        description: "A comprehensive look at Apple's latest flagship phone.",
        date: "2 days ago",
        badge: "Editor's Choice",
        rating: 4.8,
    },
    {
        image: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&q=80&w=800",
        title: "Samsung S24 Ultra Review",
        slug: "samsung-s24-ultra-review",
        description: "Samsung's latest flagship with groundbreaking AI features.",
        date: "1 week ago",
        badge: "Must See",
        rating: 4.5,
    },
    {
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=800",
        title: "PS5 Pro First Look",
        slug: "ps5-pro-first-look",
        description: "Sony's mid-generation upgrade brings 8K gaming.",
        date: "1 week ago",
        badge: "Hot",
        rating: 4.7,
    },
    {
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
        title: "Sony WH-1000XM5",
        slug: "sony-wh-1000xm5",
        description: "The king of noise-cancelling headphones.",
        date: "3 days ago",
        badge: "Hot",
        rating: 4.9,
    },
];

export default function TopRatedReviewsPage() {
    const [sortedReviews, setSortedReviews] = useState<ReviewData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Mengatur data awal dengan sorting berdasarkan rating
        const sorted = [...reviewData].sort((a, b) => b.rating - a.rating);
        setSortedReviews(sorted);

        // Animasi header
        gsap.fromTo(
            ".page-header",
            { opacity: 0, y: -50 },
            { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
        );
    }, []);

    return (
        <div className="min-h-screen dark:bg-black">
            {/* Tombol Back */}
            <div className="fixed top-4 left-4 z-50">
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 dark:text-white bg-white dark:bg-black px-4 py-2 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Back</span>
                </button>
            </div>

            {/* Header */}
            <div className="page-header relative h-[40vh] flex items-center justify-center"
                 style={{
                     backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1400")`,
                     backgroundSize: "cover",
                     backgroundPosition: "center",
                 }}
            >
                <div className="text-center text-white">
                    <h1 className="text-5xl font-bold mb-4">Top Rated Reviews</h1>
                    <p className="text-xl max-w-2xl mx-auto">
                        Explore the highest-rated products reviewed by our experts.
                    </p>
                </div>
            </div>

            {/* Konten */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="flex justify-between items-center mb-8">
                    <button
                        onClick={() => setSortedReviews([...sortedReviews].sort((a, b) => b.rating - a.rating))}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/80 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                        <SortDesc className="w-5 h-5" />
                        <span>Sort by Rating</span>
                    </button>
                    <p className="text-gray-600 dark:text-white/80">
                        Showing {sortedReviews.length} reviews
                    </p>
                </div>

                {/* Review Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedReviews.map((review, index) => (
                        <ReviewCard
                            key={review.slug}
                            {...review}
                            index={index} // Untuk animasi berbasis indeks
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
