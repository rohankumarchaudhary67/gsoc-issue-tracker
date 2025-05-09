"use client";

import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export default function AuthComponent() {
    const [isGithubLoading, setIsGithubLoading] = useState(false);
    const [isGoogleLoading, setIsGoogleLoading] = useState(false);

    const handleGithubSignIn = () => {
        setIsGithubLoading(true);
        // GitHub authentication logic would go here
        setTimeout(() => setIsGithubLoading(false), 1000); // Simulating API call
    };

    const handleGoogleSignIn = () => {
        setIsGoogleLoading(true);
        // Google authentication logic would go here
        setTimeout(() => setIsGoogleLoading(false), 1000); // Simulating API call
    };

    return (
        <div className="flex items-center justify-center min-h-screen p-4">
            <div className="w-full max-w-md">
                <Card className="border-2 shadow-lg">
                    <CardHeader className="space-y-1 text-center">
                        <div className="flex justify-center mb-4">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-10 w-10 text-blue-600"
                            >
                                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
                            </svg>
                        </div>
                        <CardTitle className="text-2xl font-bold">
                            Issue Hive
                        </CardTitle>
                        <CardDescription className="text-gray-500">
                            GSoC Issue Tracker
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="grid gap-6 pt-4">
                        <div className="text-center text-sm text-gray-600">
                            Sign in to track, collaborate, and contribute to
                            GSoC projects
                        </div>

                        <div className="grid gap-4">
                            <Button
                                variant="outline"
                                className="bg-white hover:bg-gray-50 cursor-pointer border border-gray-300 h-12"
                                onClick={handleGoogleSignIn}
                                disabled={isGoogleLoading}
                            >
                                {isGoogleLoading ? (
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-black"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    <svg
                                        className="mr-2 h-5 w-5"
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
                                Sign in with Google
                            </Button>

                            <Button
                                variant="outline"
                                className="bg-black hover:bg-gray-900 text-white h-12 cursor-pointer"
                                onClick={handleGithubSignIn}
                                disabled={isGithubLoading}
                            >
                                {isGithubLoading ? (
                                    <svg
                                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                ) : (
                                    <Github className="mr-2 h-5 w-5" />
                                )}
                                Sign in with GitHub
                            </Button>
                        </div>
                    </CardContent>

                    <CardFooter className="flex flex-col space-y-2 pb-6 pt-2">
                        <div className="text-xs text-center text-gray-500">
                            By continuing, you agree to Issue Hive&apos;s Terms
                            of Service and Privacy Policy.
                        </div>
                        <div className="text-xs text-center">
                            <span className="text-gray-500">
                                New to Issue Hive?{" "}
                            </span>
                            <span className="text-blue-600 hover:underline cursor-pointer">
                                Learn more
                            </span>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </div>
    );
}
