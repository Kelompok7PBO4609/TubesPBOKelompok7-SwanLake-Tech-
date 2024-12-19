    import React, { useEffect } from 'react';
    import {useParams, useNavigate, Link} from 'react-router-dom';
    import { gsap } from 'gsap';
    import ReviewCard from '../components/ReviewCard';
    import { Filter, SortDesc, ArrowLeft } from 'lucide-react';

    const categoryData = {
        smartphones: {
            title: "Smartphones",
            description: "Latest reviews of flagship and mid-range smartphones",
            image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=1400",
            reviews: [
                {
                    image: "https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800",
                    title: "iPhone 15 Pro Max Review",
                    slug: "iphone-15-pro-max-review",
                    description: "A comprehensive look at Apple's latest flagship phone.",
                    date: "2 days ago",
                    badge: "Editor's Choice"
                },
                {
                    image: "https://images.unsplash.com/photo-1593642634443-44adaa06623a?auto=format&fit=crop&q=80&w=800",
                    title: "Samsung S24 Ultra Review",
                    slug: "samsung-s24-Ultra-Review",
                    description: "Samsung's latest flagship with groundbreaking AI features.",
                    date: "1 week ago",
                    badge: "Must See"
                }
            ]
        },
        laptops: {
            title: "Laptops & Desktops",
            description: "Professional reviews of the latest laptops and notebooks",
            image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=1400",
            reviews: [
                {
                    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&q=80&w=800",
                    title: "MacBook Pro M3 Max Review",
                    slug: "macbook-pro-m3-max-review",
                    description: "The most powerful MacBook ever made.",
                    date: "5 days ago",
                    badge: "Must Buy"
                }
            ]
        },
        consoles: {
            title: "Consoles",
            description: "Reviews of consoles, and its accessories",
            image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=1400",
            reviews: [
                {
                    image: "https://images.unsplash.com/photo-1612287230202-1ff1d85d1bdf?auto=format&fit=crop&q=80&w=800",
                    title: "PS5 Pro First Look",
                    slug: "ps5-pro-First-Look",
                    description: "Sony's mid-generation upgrade brings 8K gaming.",
                    date: "1 week ago"
                }
            ]
        },
        accessories: {
            title: "Accessories",
            description: "Expert reviews of headphones, speakers, and any other trendy accessories",
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=1400",
            reviews: [
                {
                    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&q=80&w=800",
                    title: "Sony WH-1000XM5",
                    slug: "sony-wh-1000XM5",
                    description: "The king of noise-cancelling headphones.",
                    date: "3 days ago",
                    badge: "Hot"
                }
            ]
        }
    };
    export default function CategoryPage() {
        const { category } = useParams<{ category: keyof typeof categoryData }>();
        const data = category ? categoryData[category] : null;
        const navigate = useNavigate();

        useEffect(() => {
            if (data) {
                // Animasi header
                gsap.fromTo(
                    ".category-header",
                    { opacity: 0, y: -50 },
                    { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
                );

                // Animasi review cards
                gsap.fromTo(
                    ".review-card",
                    { opacity: 0, scale: 0.8 },
                    {
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.2,
                    }
                );
            }
        }, [data]);

        if (!data) return <div>Category not found</div>;

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
                <div
                    className="category-header relative h-[40vh] flex items-center justify-center"
                    style={{
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url(${data.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                    <div className="text-center text-white">
                        <h1 className="text-5xl font-bold mb-4">{data.title}</h1>
                        <p className="text-xl max-w-2xl mx-auto">{data.description}</p>
                    </div>
                </div>

                {/* Konten */}
                <div className="max-w-7xl mx-auto px-4 py-12">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/80 rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <Filter className="w-5 h-5" />
                                <span>Filter</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-white/80  rounded-lg shadow hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <SortDesc className="w-5 h-5" />
                                <span>Sort</span>
                            </button>
                        </div>
                        <p className="text-gray-600 dark:text-white/80">
                            Showing {data.reviews.length} reviews
                        </p>
                    </div>

                    {/* Review Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" >
                        {data.reviews.map((review, index) => (
                            <div key={index} className="review-card">
                                <Link to={`/review/${review.slug}`} className="block">
                                    <ReviewCard {...review} index={index} />
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        );
    }