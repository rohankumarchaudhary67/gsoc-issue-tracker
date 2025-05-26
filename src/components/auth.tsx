"use client";
import React, { useState } from "react";
import { Github, Loader2 } from "lucide-react";
import Link from "next/link";

const AuthComponent = () => {
    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleGithubSignIn = async () => {
        setIsGithubLoading(true);
        // Simulate API call
        setTimeout(() => setIsGithubLoading(false), 2000);
    };

    const handleGoogleSignIn = async () => {
        setIsGoogleLoading(true);
        // Simulate API call
        setTimeout(() => setIsGoogleLoading(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-red-500/10"></div>
            <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
            <div className="absolute bottom-20 right-20 w-72 h-72 bg-orange-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse delay-1000"></div>

            {/* Main Auth Card */}
            <div className="w-full max-w-md relative z-10">
                <div className="bg-gray-800/70 backdrop-blur-xl border-2 border-gray-700/50 shadow-2xl rounded-3xl p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        {/* Logo */}
                        <div className="flex justify-center mb-4">
                            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <div className="w-10 h-10 bg-black rounded-lg relative">
                                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-1.5 bg-black rounded-full"></div>
                                    <div className="absolute -top-1 left-1.5 w-1.5 h-1.5 bg-black rounded-full"></div>
                                    <div className="absolute -top-1 right-1.5 w-1.5 h-1.5 bg-black rounded-full"></div>
                                    <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1.5 h-3 bg-yellow-400 rounded-sm"></div>
                                    <div className="absolute top-2 left-2 w-1 h-1 bg-black rounded-full"></div>
                                    <div className="absolute top-2 right-2 w-1 h-1 bg-black rounded-full"></div>
                                    <div className="absolute bottom-1 left-1 w-2 h-1 bg-black rounded-full"></div>
                                    <div className="absolute bottom-1 right-1 w-2 h-1 bg-black rounded-full"></div>
                                </div>
                            </div>
                        </div>

                        <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
                            Issue Hive
                        </h1>
                        <p className="text-yellow-400 font-medium mb-2">
                            GSoC Issue Tracker
                        </p>
                        <p className="text-gray-400 text-sm">
                            Sign in to track, collaborate, and contribute to
                            GSoC projects
                        </p>
                    </div>

                    {/* Sign In Buttons */}
                    <div className="space-y-4">
                        {/* Google Sign In */}
                        <button
                            onClick={handleGoogleSignIn}
                            disabled={isGoogleLoading || isGithubLoading}
                            className="w-full h-14 bg-white hover:bg-gray-50 disabled:bg-gray-100 border border-gray-300 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg disabled:transform-none disabled:shadow-none group cursor-pointer"
                        >
                            {isGoogleLoading ? (
                                <Loader2 className="w-5 h-5 text-gray-600 animate-spin" />
                            ) : (
                                <svg
                                    className="w-5 h-5"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                                        <path
                                            fill="#4285F4"
                                            d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"
                                        />
                                        <path
                                            fill="#34A853"
                                            d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"
                                        />
                                        <path
                                            fill="#FBBC05"
                                            d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"
                                        />
                                        <path
                                            fill="#EA4335"
                                            d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"
                                        />
                                    </g>
                                </svg>
                            )}
                            <span className="text-gray-700 font-medium">
                                {isGoogleLoading
                                    ? "Signing in..."
                                    : "Sign in with Google"}
                            </span>
                        </button>

                        {/* GitHub Sign In */}
                        <button
                            onClick={handleGithubSignIn}
                            disabled={isGithubLoading || isGoogleLoading}
                            className="w-full h-14 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-700 border border-gray-600 rounded-xl flex items-center justify-center space-x-3 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-gray-900/25 disabled:transform-none disabled:shadow-none group cursor-pointer"
                        >
                            {isGithubLoading ? (
                                <Loader2 className="w-5 h-5 text-white animate-spin" />
                            ) : (
                                <Github className="w-5 h-5 text-white" />
                            )}
                            <span className="text-white font-medium">
                                {isGithubLoading
                                    ? "Signing in..."
                                    : "Sign in with GitHub"}
                            </span>
                        </button>
                    </div>

                    {/* Divider */}
                    <div className="flex items-center my-8">
                        <div className="flex-1 border-t border-gray-600"></div>
                        <div className="px-4 text-gray-500 text-sm">
                            Trusted by GSoC contributors
                        </div>
                        <div className="flex-1 border-t border-gray-600"></div>
                    </div>

                    {/* Features Preview */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="text-center p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                            <div className="text-yellow-400 text-2xl font-bold mb-1">
                                500+
                            </div>
                            <div className="text-gray-400 text-xs">
                                Organizations
                            </div>
                        </div>
                        <div className="text-center p-4 bg-gray-700/30 rounded-xl border border-gray-600/30">
                            <div className="text-orange-400 text-2xl font-bold mb-1">
                                10K+
                            </div>
                            <div className="text-gray-400 text-xs">
                                Open Issues
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center">
                        <p className="text-xs text-gray-500">
                            By continuing, you agree to Issue Hive&apos;s{" "}
                            <a
                                href="#"
                                className="text-yellow-400 hover:text-yellow-300 transition-colors"
                            >
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a
                                href="#"
                                className="text-yellow-400 hover:text-yellow-300 transition-colors"
                            >
                                Privacy Policy
                            </a>
                            .
                        </p>
                    </div>
                </div>

                {/* Back to Home Link */}
                <div className="text-center mt-6">
                    <Link
                        href="/"
                        className="text-gray-400 hover:text-yellow-400 transition-colors text-sm flex items-center justify-center space-x-2"
                    >
                        <span>← Back to home</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;
