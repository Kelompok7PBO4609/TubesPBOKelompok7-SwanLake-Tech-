import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, Mail, Lock, Github, Chrome, User } from 'lucide-react';

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
    const [isLogin, setIsLogin] = useState(true);
    const modalRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const formRef = useRef<HTMLDivElement>(null);

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

    useEffect(() => {
        if (formRef.current) {
            gsap.fromTo(formRef.current,
                { opacity: 0, x: isLogin ? -20 : 20 },
                { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [isLogin]);

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
            onComplete: () => {
                onClose();
                setIsLogin(true); // Reset to login view when closing
            }
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
                className="bg-white dark:bg-black rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden"
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
                        {isLogin ? 'Welcome Back' : 'Create Account'}
                    </h2>

                    <div ref={formRef}>
                        <form className="space-y-4">
                            {!isLogin && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input
                                            type="text"
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                            placeholder="Enter your full name"
                                        />
                                    </div>
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Email
                                </label>
                                <div className="relative">
                                    <Mail className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="email"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder="Enter your email"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                    <input
                                        type="password"
                                        className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors"
                                        placeholder={isLogin ? "Enter your password" : "Create a password"}
                                    />
                                </div>
                            </div>

                            {isLogin ? (
                                <div className="flex items-center justify-between">
                                    <label className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Remember me</span>
                                    </label>
                                    <button type="button" className="text-sm text-blue-600 dark:text-white hover:text-blue-800 dark:hover:text-white">
                                        Forgot password?
                                    </button>
                                </div>
                            ) : (
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                    By signing up, you agree to our{' '}
                                    <button type="button" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                        Terms of Service
                                    </button>
                                    {' '}and{' '}
                                    <button type="button" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                        Privacy Policy
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                className="w-full bg-blue-600 dark:bg-black border dark:border-gray-600  hover:bg-blue-700 dark:hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                            >
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </button>
                        </form>

                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300 dark:border-whitek"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white dark:bg-black text-white">Or continue with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                <Chrome className="w-5 h-5 text-gray-700 dark:text-white" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Google</span>
                            </button>
                            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                                <Github className="w-5 h-5 text-gray-700 dark:text-white" />
                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">GitHub</span>
                            </button>
                        </div>

                        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                            <button
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-blue-600 dark:text-white hover:text-blue-800 dark:hover:text-white font-medium"
                            >
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}