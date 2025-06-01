"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bookmark, Loader2, AlertCircle } from "lucide-react";

interface BookmarkIssue {
    id: string;
    title: string;
    body: string;
    repo: {
        name: string;
        organization: {
            name: string;
        };
        languages: string;
        difficulty: string;
    };
}

interface ApiResponse {
    success: boolean;
    data?: {
        bookmarkedIssues: BookmarkIssue[];
    };
    error?: string;
}

export default function Bookmarks() {
    const [bookmarkedIssues, setBookmarkedIssues] = useState<BookmarkIssue[]>(
        []
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());

    // Fetch bookmarked issues
    const fetchBookmarks = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get<ApiResponse>(
                "/api/v1/bookmark/fetch"
            );
            const data = response.data;

            if (data.success && data.data) {
                setBookmarkedIssues(data.data.bookmarkedIssues);
            } else {
                throw new Error(data.error || "Failed to fetch bookmarks");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error(
                    "Axios error:",
                    err.response?.data || err.message
                );
                setError(
                    err.response?.data?.error ||
                        err.message ||
                        "Failed to load bookmarks"
                );
            }
        } finally {
            setLoading(false);
        }
    };

    // Remove bookmark
    const removeBookmark = async (issueId: string) => {
        try {
            setRemovingIds((prev) => new Set(prev).add(issueId));

            const response = await axios.post("/api/v1/bookmark/delete", {
                issueId,
            });
            const data = response.data;

            if (data.success) {
                setBookmarkedIssues((prev) =>
                    prev.filter((issue) => issue.id !== issueId)
                );
            } else {
                throw new Error(data.error || "Failed to remove bookmark");
            }
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                console.error(
                    "Axios error:",
                    err.response?.data || err.message
                );
                setError(
                    err.response?.data?.error ||
                        err.message ||
                        "Failed to remove bookmark"
                );
            }
        } finally {
            setRemovingIds((prev) => {
                const newSet = new Set(prev);
                newSet.delete(issueId);
                return newSet;
            });
        }
    };

    // Load bookmarks on component mount
    useEffect(() => {
        fetchBookmarks();
    }, []);

    const handleRetry = () => {
        fetchBookmarks();
    };

    if (loading) {
        return (
            <div className="p-6 relative z-10">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
                        <p className="text-gray-300">Loading bookmarks...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 relative z-10">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <AlertCircle className="w-8 h-8 text-red-400 mx-auto mb-4" />
                        <p className="text-red-300 mb-4">{error}</p>
                        <button
                            onClick={handleRetry}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (bookmarkedIssues.length === 0) {
        return (
            <div className="p-6 relative z-10">
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <Bookmark className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">
                            No bookmarks yet
                        </h3>
                        <p className="text-gray-400">
                            Start bookmarking issues to see them here
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 relative z-10">
            <div className="grid gap-6">
                {bookmarkedIssues.map((issue) => (
                    <div
                        key={issue.id}
                        className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-xl font-semibold text-white">
                                {issue.title}
                            </h3>
                            <div className="flex items-center space-x-2">
                                <span className="text-yellow-400 bg-yellow-500/20 px-2 py-1 rounded-lg text-sm">
                                    Bookmarked
                                </span>
                                <button
                                    onClick={() => removeBookmark(issue.id)}
                                    disabled={removingIds.has(issue.id)}
                                    className="text-yellow-400 hover:text-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Remove bookmark"
                                >
                                    {removingIds.has(issue.id) ? (
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    ) : (
                                        <Bookmark
                                            className="w-4 h-4"
                                            fill="currentColor"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>

                        {issue.body && (
                            <p className="text-gray-300 mb-4 line-clamp-3">
                                {issue.body}
                            </p>
                        )}

                        <div className="flex flex-wrap items-center gap-2 text-sm text-gray-400">
                            <span>
                                {issue.repo.organization.name}/{issue.repo.name}
                            </span>
                            <span>•</span>
                            <span className="px-2 py-1 bg-blue-500/20 text-blue-300 rounded">
                                {issue.repo.languages}
                            </span>
                            <span>•</span>
                            <span
                                className={`px-2 py-1 rounded-full ${
                                    issue.repo.difficulty === "Easy"
                                        ? "bg-green-500/20 text-green-300"
                                        : issue.repo.difficulty === "Medium"
                                          ? "bg-yellow-500/20 text-yellow-300"
                                          : "bg-red-500/20 text-red-300"
                                }`}
                            >
                                {issue.repo.difficulty}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                <button
                    onClick={handleRetry}
                    className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm"
                >
                    Refresh bookmarks
                </button>
            </div>
        </div>
    );
}
