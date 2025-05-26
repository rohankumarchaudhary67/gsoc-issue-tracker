import React from "react";
import { Github } from "lucide-react";
import Link from "next/link";

// Footer Component
const Footer = () => {
    return (
        <footer className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8 border-t border-gray-800">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                                <div className="w-6 h-6 bg-black rounded-sm relative">
                                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-1 bg-black rounded-full"></div>
                                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-yellow-400"></div>
                                </div>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                IssueHive
                            </span>
                        </div>
                        <p className="text-gray-400 mb-4 max-w-md">
                            Empowering GSoC contributors to find the perfect
                            issues and kickstart their open source journey with
                            AI-powered assistance.
                        </p>
                        <div className="flex space-x-4">
                            <Link
                                href="https://github.com/rohankumarchaudhary67/gsoc-issue-tracker"
                                target="_blank"
                                className="text-gray-400 hover:text-yellow-400 transition-colors"
                            >
                                <Github className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">
                            Product
                        </h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Features
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    API
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">
                            Support
                        </h3>
                        <ul className="space-y-2 text-gray-400">
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Documentation
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="hover:text-yellow-400 transition-colors"
                                >
                                    Contact
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                    <p>
                        &copy; 2024 IssueHive. All rights reserved. Built for
                        the GSoC community.
                    </p>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
