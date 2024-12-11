import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { X } from 'lucide-react';

interface CompareModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CompareModal({ isOpen, onClose }: CompareModalProps) {
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen) {
            gsap.to(modalRef.current, {
                opacity: 1,
                duration: 0.3,
                ease: "power2.out"
            });

            gsap.fromTo(contentRef.current,
                {
                    opacity: 0,
                    y: 20,
                    scale: 0.95
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                }
            );
        }
    }, [isOpen]);

    const handleClose = () => {
        gsap.to(modalRef.current, {
            opacity: 0,
            duration: 0.2,
            ease: "power2.in"
        });
        gsap.to(contentRef.current, {
            opacity: 0,
            y: 20,
            scale: 0.95,
            duration: 0.2,
            ease: "power2.in",
            onComplete: onClose
        });
    };

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center opacity-0"
            onClick={handleClose}
        >
            <div
                ref={contentRef}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-4xl mx-4 overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                <div className="relative p-6">
                    <button
                        onClick={handleClose}
                        className="absolute right-4 top-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Compare Products
                    </h2>

                    <div className="grid grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-semibold dark:text-white mb-4">iPhone 15 Pro Max</h3>
                            <img
                                src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=800"
                                alt="iPhone 15 Pro Max"
                                className="w-full h-48 object-cover rounded-lg mb-4"
                            />
                            <div className="space-y-2">
                                <CompareItem label="Processor" value="A17 Pro" />
                                <CompareItem label="RAM" value="8GB" />
                                <CompareItem label="Storage" value="256GB" />
                                <CompareItem label="Battery" value="4422 mAh" />
                                <CompareItem label="Price" value="$999" highlight />
                            </div>
                        </div>

                        <div>
                            <select className="w-full p-2 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                                <option value="">Select a product to compare</option>
                                <option value="s24">Samsung Galaxy S24 Ultra</option>
                                <option value="pixel">Google Pixel 8 Pro</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function CompareItem({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
    return (
        <div className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <span className="text-gray-600 dark:text-gray-300">{label}</span>
            <span className={`font-semibold ${highlight ? 'text-green-600 dark:text-green-400' : 'dark:text-white'}`}>
        {value}
      </span>
        </div>
    );
}