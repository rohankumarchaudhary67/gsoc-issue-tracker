"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";

// Header Component
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-md border-b border-gray-800 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                            <div className="w-6 h-6 bg-black rounded-sm relative">
                                <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-black rounded-full"></div>
                                <div className="absolute -top-1 left-1 w-1 h-1 bg-black rounded-full"></div>
                                <div className="absolute -top-1 right-1 w-1 h-1 bg-black rounded-full"></div>
                                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-yellow-400"></div>
                            </div>
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                            IssueHive
                        </span>
                    </div>

                    <nav className="hidden md:flex items-center space-x-8">
                        <a
                            href="#features"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Features
                        </a>
                        <a
                            href="#pricing"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            Pricing
                        </a>
                        <a
                            href="#about"
                            className="text-gray-300 hover:text-white transition-colors"
                        >
                            About
                        </a>
                        <Link href="auth">
                            <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg hover:shadow-lg hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer">
                                Get Started
                            </button>
                        </Link>
                    </nav>

                    <button
                        className="md:hidden text-gray-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {isMenuOpen && (
                    <div className="md:hidden border-t border-gray-800 py-4">
                        <div className="flex flex-col space-y-4">
                            <a
                                href="#features"
                                className="text-gray-300 hover:text-white"
                            >
                                Features
                            </a>
                            <a
                                href="#pricing"
                                className="text-gray-300 hover:text-white"
                            >
                                Pricing
                            </a>
                            <a
                                href="#about"
                                className="text-gray-300 hover:text-white"
                            >
                                About
                            </a>
                            <Link href="/auth">
                                <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-lg w-full">
                                    Get Started
                                </button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
