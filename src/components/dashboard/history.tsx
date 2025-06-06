"use client";
import React, { useState, useEffect } from "react";
import { Clock, ArrowRight, Loader2 } from "lucide-react";
import axios from "axios";
import Link from "next/link";

interface HistoryItem {
    id: string;
    title: string;
    createdAt: string;
    updateAt: string;
}

interface ApiResponse {
    success: boolean;
    data: {
        openedIssues: HistoryItem[];
    };
    error?: string;
}

export default function Historys() {
    const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            setLoading(true);
            const response = await axios.get<ApiResponse>(
                "/api/v1/history/fetch"
            );

            if (response.data.success) {
                setHistoryData(response.data.data.openedIssues);
                setError(null);
            } else {
                throw new Error(
                    response.data.error || "Failed to fetch history"
                );
            }
        } catch (err: unknown) {
            let message = "An unexpected error occurred";

            if (axios.isAxiosError(err)) {
                message = err.response?.data?.error || err.message || message;
            } else if (err instanceof Error) {
                message = err.message;
            }

            setError(message);
            console.error("Error fetching history:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor(
            (now.getTime() - date.getTime()) / 1000
        );

        if (diffInSeconds < 60) return "Just now";
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)} minute${diffInSeconds >= 120 ? "s" : ""} ago`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)} hour${diffInSeconds >= 7200 ? "s" : ""} ago`;
        if (diffInSeconds < 2592000)
            return `${Math.floor(diffInSeconds / 86400)} day${diffInSeconds >= 172800 ? "s" : ""} ago`;
        return `${Math.floor(diffInSeconds / 2592000)} month${diffInSeconds >= 5184000 ? "s" : ""} ago`;
    };

    if (loading) {
        return (
            <div className="p-6 relative z-10">
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
                    <span className="ml-2 text-gray-400">
                        Loading history...
                    </span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 relative z-10">
                <div className="bg-red-800/70 backdrop-blur-sm border border-red-700/50 rounded-xl p-4">
                    <p className="text-red-400">
                        Error loading history: {error}
                    </p>
                    <button
                        onClick={fetchHistory}
                        className="mt-2 text-sm text-red-300 hover:text-red-200 underline"
                    >
                        Try again
                    </button>
                </div>
            </div>
        );
    }

    if (historyData.length === 0) {
        return (
            <div className="p-6 relative z-10">
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-8 text-center">
                    <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">No history found</p>
                    <p className="text-sm text-gray-500 mt-1">
                        Start viewing issues to build your history
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 relative z-10">
            <div className="space-y-4">
                {historyData.map((item, index) => (
                    <div
                        key={item.id || index}
                        className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 flex items-center justify-between hover:bg-gray-800/80 transition-colors"
                    >
                        <div className="flex items-center space-x-4">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                                <Clock className="w-4 h-4 text-yellow-400" />
                            </div>
                            <div>
                                <p className="text-white">
                                    Viewed issue:{" "}
                                    <Link
                                        href={`/issues/${item.id}`}
                                        className="hover:underline hover:decoration-yellow-500 cursor-pointer"
                                    >
                                        <span className="text-yellow-400">
                                            {item.title}
                                        </span>
                                    </Link>
                                </p>
                                <p className="text-sm text-gray-400 mt-1">
                                    {formatTimeAgo(item.updateAt)}
                                </p>
                            </div>
                        </div>
                        <button
                            className="text-gray-400 hover:text-white transition-colors"
                            onClick={() => {
                                console.log("Navigate to issue:", item.id);
                                // router.push(`/issues/${item.id}`)
                            }}
                        >
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
