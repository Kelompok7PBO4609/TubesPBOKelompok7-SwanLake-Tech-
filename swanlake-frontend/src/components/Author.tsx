import React from 'react';
import { Calendar, MapPin } from 'lucide-react';

export default function AuthorCard() {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <div className="flex items-center gap-4 mb-4">
                <img
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100"
                    alt="Author"
                    className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                    <h3 className="text-xl font-bold dark:text-white">Johan Naibaho</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                        <span className="inline-block bg-blue-500 text-white text-sm font-semibold px-3 py-1 rounded-full">
                            Senior Tech Reviewer
                        </span>
                    </p>
                </div>
            </div>

            <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <Calendar className="w-4 h-4" />
                    <span>Admin since 2020</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
                    <MapPin className="w-4 h-4" />
                    <span>Bandung, Jawa Barat</span>
                </div>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
                Passionate about technology and its impact on our daily lives.
                Specialized in mobile devices and photography.
            </p>

            <div className="flex gap-2">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                    Follow
                </button>
                <button className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    Message
                </button>
            </div>
        </div>
    );
}
