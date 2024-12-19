import { create } from 'zustand';
import { slugify } from '../utils/slugify';

export interface Review {
    slug: string;
    title: string;
    description: string;
    category: 'smartphones' | 'laptops' | 'gaming' | 'audio';
    image: string;
    rating: number;
    price: number;
    date: string;
    badge?: string;
    specs: {
        [key: string]: string | string[];
    };
    keyFeatures: string[];
    author: {
        name: string;
        role: string;
        avatar: string;
        joinDate: string;
        location: string;
        bio: string;
    };
}

interface ReviewStore {
    reviews: Review[];
    getReviewBySlug: (slug: string) => Review | undefined;
    getReviewsByCategory: (category: string) => Review[];
}

export const useReviewStore = create<ReviewStore>((set, get) => ({
    reviews: [
        {
            slug: 'iphone-15-pro-max-review',
            title: 'iPhone 15 Pro Max Review',
            description: 'A comprehensive look at Apple\'s latest flagship phone, featuring the new A17 Pro chip and titanium design.',
            category: 'smartphones',
            image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?auto=format&fit=crop&q=80&w=800',
            rating: 4.8,
            price: 999,
            date: '2 days ago',
            badge: 'Editor\'s Choice',
            specs: {
                processor: 'A17 Pro chip',
                storage: ['256GB', '512GB', '1TB'],
                display: '6.7" Super Retina XDR',
                battery: '4422 mAh'
            },
            keyFeatures: [
                'A17 Pro chip with enhanced GPU performance',
                '48MP main camera with 5x optical zoom',
                'Titanium design with Action Button',
                'USB-C with Thunderbolt speeds'
            ],
            author: {
                name: 'Johan Samser Naibaho',
                role: 'Senior Tech Reviewer',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100',
                joinDate: '2020',
                location: 'San Francisco, CA',
                bio: 'Passionate about technology and its impact on our daily lives. Specialized in mobile devices and photography.'
            }

        },
        // Add more reviews here...
    ],

    getReviewBySlug: (slug) => {
        return get().reviews.find(review => review.slug === slug);
    },

    getReviewsByCategory: (category) => {
        return get().reviews.filter(review => review.category === category);
    }
}));