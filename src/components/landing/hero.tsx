import React from "react";
import { Star, ArrowRight, Github } from "lucide-react";
import Link from "next/link";

// Hero Section Component
const HeroSection = () => {
    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10"></div>
            <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute top-40 right-20 w-72 h-72 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>

            <div className="max-w-7xl mx-auto text-center relative z-10">
                <div className="inline-flex items-center px-4 py-2 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-yellow-400 text-sm font-medium mb-8 backdrop-blur-sm">
                    <Star className="w-4 h-4 mr-2" />
                    Built for GSoC Contributors
                </div>

                <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-yellow-400 to-orange-500 bg-clip-text text-transparent leading-tight">
                    Find Perfect GitHub Issues for GSoC
                </h1>

                <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                    Discover open, unassigned issues from GSoC organizations.
                    Filter by your tech stack, get AI-powered assistance, and
                    kickstart your open source journey.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <Link href="/auth">
                        <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center cursor-pointer">
                            Start Exploring Issues
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </button>
                    </Link>
                    <Link
                        href="https://github.com/rohankumarchaudhary67/gsoc-issue-tracker"
                        target="_blank"
                    >
                        <button className="border cursor-pointer border-gray-600 text-gray-300 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-800 hover:border-gray-500 transition-all duration-300 flex items-center">
                            <Github className="w-5 h-5 mr-2" />
                            View Demo
                        </button>
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-2xl">
                        <div className="text-3xl font-bold text-yellow-400 mb-2">
                            500+
                        </div>
                        <div className="text-gray-400">GSoC Organizations</div>
                    </div>
                    <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-2xl">
                        <div className="text-3xl font-bold text-orange-400 mb-2">
                            10K+
                        </div>
                        <div className="text-gray-400">Open Issues</div>
                    </div>
                    <div className="bg-gray-800/70 backdrop-blur-sm p-6 rounded-2xl border border-gray-700/50 shadow-2xl">
                        <div className="text-3xl font-bold text-red-400 mb-2">
                            50+
                        </div>
                        <div className="text-gray-400">Tech Stacks</div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
