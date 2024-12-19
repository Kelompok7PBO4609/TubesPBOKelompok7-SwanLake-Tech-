import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Carousel from '../components/Carousel';
import ReviewCard from '../components/ReviewCard';
import { Flame, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom'; // Import Link untuk routing

gsap.registerPlugin(ScrollTrigger);

const latestReviews = [
    {
        image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
        title: "iPhone 15 Pro Max Review",
        slug: "iphone-15-pro-max-review",
        description: "A comprehensive look at Apple's latest flagship phone, featuring the new A17 Pro chip and titanium design.",
        date: "2 days ago",
        badge: "Editor's Choice"
    },
    {
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
        title: "MacBook Pro M3 Max Review",
        slug: "macbook-pro-m3-max-review",
        description: "The most powerful MacBook ever made pushes the boundaries of what's possible on a laptop.",
        date: "5 days ago",
        badge: "Must Buy"
    },
    {
        image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=800",
        title: "PS5 Pro First Look",
        slug: "ps5-pro-first-look",
        description: "Sony's mid-generation upgrade brings 8K gaming and enhanced ray tracing capabilities.",
        date: "1 week ago"
    }
];

const trendingReviews = [
    {
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
        title: "Sony WH-1000XM5",
        slug: "sony-wh-1000xm5",
        description: "The king of noise-cancelling headphones gets even better with improved sound quality and comfort.",
        date: "Trending #1",
        badge: "Hot"
    },
    {
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&q=80&w=800",
        title: "ASUS ROG Phone 8",
        slug: "asus-rog-phone-8",
        description: "The ultimate gaming phone pushes mobile gaming to new heights with innovative cooling and controls.",
        date: "Trending #2",
        badge: "Rising"
    },
    {
        image: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&q=80&w=800",
        title: "Samsung S24 Ultra",
        slug: "samsung-s24-ultra",
        description: "Samsung's latest flagship brings AI features and improved camera capabilities to the masses.",
        date: "Trending #3"
    }
];

export default function HomePage() {
    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLDivElement>('.review-card').forEach((el) => {
                gsap.fromTo(
                    el as HTMLDivElement, // Pastikan elemen dikonversi ke tipe HTMLDivElement
                    { opacity: 0, y: 50 },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: el,
                            start: "top 80%",
                            toggleActions: "play none none none",
                            once: true
                        },
                        duration: 2,
                        ease: "power2.out"
                    }
                );
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <div className="min-h-screen transition-colors duration-200 dark:bg-gray-900">
            <main>
                {/* Carousel */}
                <Carousel />

                {/* Latest Reviews Section */}
                <section className="py-12 dark:bg-black/70">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center gap-2 mb-8">
                            <Flame className="w-6 h-6 text-orange-500" />
                            <h2 className="text-3xl font-bold dark:text-white">Latest Reviews</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {latestReviews.map((review, index) => (
                                <div key={index} className="review-card">
                                    <Link to={`/review/${review.slug}`} className="block">
                                        <ReviewCard {...review} index={index} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Trending Now Section */}
                <section className="py-12 bg-gray-50 dark:bg-black/75">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="flex items-center gap-2 mb-8">
                            <TrendingUp className="w-6 h-6 text-blue-500 dark:text-white" />
                            <h2 className="text-3xl font-bold dark:text-white">Trending Now</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {trendingReviews.map((review, index) => (
                                <div key={index} className="review-card">
                                    <Link to={`/review/${review.slug}`} className="block">
                                        <ReviewCard {...review} index={index} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="bg-white dark:bg-black text-black py-12 dark:text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold mb-2">SwanLake Tech</h3>
                            <p className="text-gray-400">
                                Your trusted source for in-depth gadget reviews and tech news.
                            </p>
                        </div>
                        <div className="text-sm text-gray-400">
                            © {new Date().getFullYear()} Swanlake Tech. All rights reserved.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}
