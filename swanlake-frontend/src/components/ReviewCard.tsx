import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ReviewCardProps {
    image: string;
    title: string;
    description: string;
    date: string;
    badge?: string;
    slug: string; // Menambahkan slug di props
    index: number;
}

export default function ReviewCard({ image, title, description, date, badge, slug, index }: ReviewCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.from(cardRef.current, {
            y: 50,
            duration: 1.0,
            delay: index * 0.2,
            ease: "power3.out"
        });
    }, [index]);

    return (
        <div ref={cardRef} className="bg-white dark:bg-black rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-[1.02]">
            <div className="relative overflow-hidden group">
                <img src={image} alt={title} className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
            <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                    {badge && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-semibold rounded">
                            {badge}
                        </span>
                    )}
                    <span className="text-gray-500 dark:text-gray-400 text-sm">{date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">{description}</p>
                <Link to={`/review/${slug}`} className="group/btn flex items-center gap-2 text-blue-600 dark:text-white font-semibold hover:text-blue-800 dark:hover:text-white transition-colors">
                    Read More
                    <ArrowRight className="w-4 h-4 transform transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
