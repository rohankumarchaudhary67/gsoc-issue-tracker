"use client";
import { useState, useEffect } from "react";
import {
    Github,
    Calendar,
    MessageSquare,
    Bookmark,
    ArrowLeft,
    ExternalLink,
    Tag,
    Loader2,
    AlertCircle,
    Send,
    Trash2,
    Plus,
    X,
    Eye,
    Zap,
    GitBranch,
} from "lucide-react";
import axios from "axios";

// Types
interface Organization {
    name: string;
    image: string;
    description: string;
}

interface Repo {
    name: string;
    languages: string[];
    difficulty: "Easy" | "Medium" | "Hard";
    organization: Organization;
}

interface Comment {
    id: string;
    comment: string;
    createdAt: string;
    user: {
        id: string;
        name: string;
        image: string;
    };
}

interface Issue {
    id: string;
    github_id: number;
    number: number;
    title: string;
    body: string;
    state: string;
    labels: string[];
    html_url: string;
    comments_count: number;
    createdAt: string;
    updatedAt: string;
    repo: Repo;
    isBookmarked: boolean;
    hasViewed: boolean;
    lastViewed: string | null;
    comments: Comment[];
}

interface ApiError {
    error: string;
    alreadyViewed?: boolean;
    subscription?: string;
    upgradeRequired?: boolean;
}

interface CurrentUser {
    id: string;
    name: string;
    email: string;
    image?: string;
}

export default function IssueIdComp({ issueId }: { issueId: string }) {
    // State variables
    const [issue, setIssue] = useState<Issue | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [bookmarkLoading, setBookmarkLoading] = useState(false);
    const [upgradeRequired, setUpgradeRequired] = useState(false);
    const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);

    // Comment form state
    const [showCommentForm, setShowCommentForm] = useState(false);
    const [newComment, setNewComment] = useState("");
    const [submittingComment, setSubmittingComment] = useState(false);
    const [commentError, setCommentError] = useState<string | null>(null);

    console.log(loading);
    console.log(commentError);

    // Delete comment state
    const [deletingCommentId, setDeletingCommentId] = useState<string | null>(
        null
    );

    // Fetch current user
    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch("/api/v1/user/fetch", {
                    credentials: "include",
                });
                if (response.ok) {
                    const userData = await response.json();
                    setCurrentUser(userData);
                }
            } catch (err) {
                console.error("Error fetching current user:", err);
            }
        };

        fetchCurrentUser();
    }, []);

    const fetchIssue = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(`/api/v1/issues/${issueId}`, {
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = (await response.json()) as ApiError;
                const errorMessage =
                    errorData?.error || "An unexpected error occurred";
                let requiresUpgrade = false;

                if (errorData?.upgradeRequired) {
                    requiresUpgrade = true;
                    console.log(requiresUpgrade);
                    setUpgradeRequired(true);
                }

                setError(errorMessage);
                return;
            }

            const issueData = await response.json();
            setIssue(issueData);
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("An unexpected error occurred");
            }
        }
    };

    // Fetch issue details
    useEffect(() => {
        fetchIssue();
    }, [issueId]);

    // Bookmark functions
    const addBookmark = async (issueId: string): Promise<boolean> => {
        try {
            const response = await axios.post(
                "/api/v1/bookmark/add",
                { issueId },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data.success;
        } catch (error) {
            console.error("Error adding bookmark:", error);
            return false;
        }
    };

    const deleteBookmark = async (issueId: string): Promise<boolean> => {
        try {
            const response = await axios.post(
                "/api/v1/bookmark/delete",
                { issueId },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );
            return response.data.success;
        } catch (error) {
            console.error("Error deleting bookmark:", error);
            return false;
        }
    };

    const toggleBookmark = async () => {
        if (!issue) return;

        setBookmarkLoading(true);

        try {
            let success = false;
            if (issue.isBookmarked) {
                success = await deleteBookmark(issue.id);
            } else {
                success = await addBookmark(issue.id);
            }

            if (success) {
                setIssue((prev) =>
                    prev ? { ...prev, isBookmarked: !prev.isBookmarked } : null
                );
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
        } finally {
            setBookmarkLoading(false);
        }
    };

    // Comment functions
    const submitComment = async () => {
        if (!newComment.trim() || !issue) return;

        setSubmittingComment(true);
        setCommentError(null);

        try {
            const response = await axios.post(
                "/api/v1/comment/add",
                {
                    issueId: issue.id,
                    comment: newComment.trim(),
                },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.data.message === "Comment added successfully") {
                // Create a new comment object to add to the UI
                const newCommentObj: Comment = {
                    id: `temp-${Date.now()}`, // Temporary ID
                    comment: newComment.trim(),
                    createdAt: new Date().toISOString(),
                    user: {
                        id: currentUser?.id || "unknown",
                        name: currentUser?.name || "You",
                        image: currentUser?.image || "",
                    },
                };

                setIssue((prev) =>
                    prev
                        ? {
                              ...prev,
                              comments: [...prev.comments, newCommentObj],
                              comments_count: prev.comments_count + 1,
                          }
                        : null
                );

                setNewComment("");
                setShowCommentForm(false);
            }
        } catch (err) {
            let errorMessage = "Failed to post comment";
            if (axios.isAxiosError(err)) {
                const errorData = err.response?.data as ApiError;
                errorMessage = errorData?.error || err.message;
            }
            setCommentError(errorMessage);
        } finally {
            setSubmittingComment(false);
        }
    };

    const deleteComment = async (commentId: string) => {
        setDeletingCommentId(commentId);

        try {
            const response = await axios.post(
                "/api/v1/comment/delete",
                { commentId },
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true,
                }
            );

            if (response.data.message === "Comment deleted successfully") {
                setIssue((prev) =>
                    prev
                        ? {
                              ...prev,
                              comments: prev.comments.filter(
                                  (comment) => comment.id !== commentId
                              ),
                              comments_count: Math.max(
                                  0,
                                  prev.comments_count - 1
                              ),
                          }
                        : null
                );
            }
        } catch (err) {
            console.error("Error deleting comment:", err);
            // You might want to show an error message here
        } finally {
            setDeletingCommentId(null);
        }
    };

    // Utility functions
    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "Easy":
                return "bg-green-500/20 text-green-400 border-green-500/30";
            case "Medium":
                return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
            case "Hard":
                return "bg-red-500/20 text-red-400 border-red-500/30";
            default:
                return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const formatRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60)
        );

        if (diffInHours < 1) return "Just now";
        if (diffInHours < 24) return `${diffInHours}h ago`;

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) return `${diffInDays}d ago`;

        return formatDate(dateString);
    };

    const canDeleteComment = (comment: Comment) => {
        return currentUser && comment.user.id === currentUser.id;
    };

    console.log(canDeleteComment);

    // Error state
    if (error && !issue) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950 p-6">
                <div className="max-w-4xl mx-auto">
                    {/* Back button */}
                    <button
                        onClick={() => window.history.back()}
                        className="mb-6 flex items-center space-x-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Back to Issues</span>
                    </button>

                    <div className="bg-red-500/20 border border-red-500/30 rounded-xl p-8 text-center">
                        <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
                        <h2 className="text-xl font-semibold text-red-400 mb-2">
                            {upgradeRequired
                                ? "Upgrade Required"
                                : "Error Loading Issue"}
                        </h2>
                        <p className="text-red-300 mb-4">{error}</p>

                        {upgradeRequired ? (
                            <button className="px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold rounded-xl transition-colors">
                                Upgrade to PRO
                            </button>
                        ) : (
                            <button
                                onClick={() => window.location.reload()}
                                className="px-6 py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-xl text-red-400 transition-colors"
                            >
                                Try Again
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (!issue) return null;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
            <div className="relative z-10 p-4 sm:p-6">
                <div className="mx-auto space-y-6">
                    {/* Enhanced back button */}
                    <button
                        onClick={() => window.history.back()}
                        className="group flex items-center space-x-2 text-slate-400 hover:text-white cursor-pointer"
                    >
                        <div className="p-2 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 group-hover:border-indigo-500/30">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-xl">
                            Back to Issues
                        </span>
                    </button>

                    {/* Main content grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Enhanced left sidebar */}
                        <div className="lg:col-span-1 space-y-6">
                            {/* Repository card with glass effect */}
                            <div className="relative group">
                                {/* <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div> */}
                                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-indigo-500/30 transition-all duration-300">
                                    <div className="flex items-start space-x-4 mb-6">
                                        <div className="relative">
                                            <img
                                                src={
                                                    issue.repo.organization
                                                        .image
                                                }
                                                alt={
                                                    issue.repo.organization.name
                                                }
                                                className="w-12 h-12 rounded-xl border-2 border-slate-600/50"
                                            />
                                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-white font-semibold text-lg tracking-tight">
                                                {issue.repo.organization.name}
                                            </h3>
                                            <p className="text-indigo-300 font-medium">
                                                {issue.repo.name}
                                            </p>
                                            <p className="text-slate-400 text-sm line-clamp-2 mt-1">
                                                {
                                                    issue.repo.organization
                                                        .description
                                                }
                                            </p>
                                        </div>
                                    </div>

                                    {/* Enhanced metadata */}
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl border border-slate-700/30">
                                            <div className="flex items-center space-x-2 text-slate-300">
                                                <Tag className="w-4 h-4 text-indigo-400" />
                                                <span className="font-medium">
                                                    #{issue.number}
                                                </span>
                                            </div>
                                            <span className="text-xs text-slate-500 bg-slate-700/50 px-2 py-1 rounded-full">
                                                {issue.state.toUpperCase()}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div className="flex items-center space-x-2 text-slate-400 text-sm">
                                                <Calendar className="w-4 h-4 text-blue-400" />
                                                <span>
                                                    {formatRelativeTime(
                                                        issue.createdAt
                                                    )}
                                                </span>
                                            </div>
                                            <div className="flex items-center space-x-2 text-slate-400 text-sm">
                                                <MessageSquare className="w-4 h-4 text-green-400" />
                                                <span>
                                                    {issue.comments_count}
                                                </span>
                                            </div>
                                        </div>

                                        {issue.hasViewed && (
                                            <div className="flex items-center space-x-2 text-slate-400 text-sm p-2 bg-slate-800/30 rounded-lg">
                                                <Eye className="w-4 h-4 text-purple-400" />
                                                <span>
                                                    Viewed{" "}
                                                    {formatRelativeTime(
                                                        issue.lastViewed!
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Enhanced GitHub link */}
                                    <a
                                        href={issue.html_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="mt-6 w-full flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-slate-700/50 to-slate-800/50 hover:from-indigo-600/50 hover:to-purple-600/50 border border-slate-600/50 hover:border-indigo-500/50 rounded-xl text-slate-300 hover:text-white transition-all duration-200 group"
                                    >
                                        <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="font-medium">
                                            View on GitHub
                                        </span>
                                        <ExternalLink className="w-4 h-4 opacity-60" />
                                    </a>
                                </div>
                            </div>

                            {/* Enhanced details card */}
                            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 hover:border-purple-500/30 transition-all duration-300">
                                <h3 className="text-white font-semibold mb-4 flex items-center space-x-2">
                                    <Zap className="w-5 h-5 text-yellow-400" />
                                    <span>Details</span>
                                </h3>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">
                                            Difficulty
                                        </p>
                                        <span
                                            className={`inline-flex items-center px-3 py-2 rounded-xl text-sm font-semibold border shadow-lg ${getDifficultyColor(issue.repo.difficulty)}`}
                                        >
                                            <div className="w-2 h-2 rounded-full bg-current mr-2"></div>
                                            {issue.repo.difficulty}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">
                                            Languages
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {issue.repo.languages.map(
                                                (language, index) => (
                                                    <span
                                                        key={language}
                                                        className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all duration-200 hover:scale-105 ${
                                                            index === 0
                                                                ? "bg-blue-500/10 text-blue-300 border-blue-500/20"
                                                                : index === 1
                                                                  ? "bg-purple-500/10 text-purple-300 border-purple-500/20"
                                                                  : "bg-teal-500/10 text-teal-300 border-teal-500/20"
                                                        }`}
                                                    >
                                                        {language}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-xs text-slate-400 mb-2 uppercase tracking-wide">
                                            Labels
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {issue.labels.map(
                                                (label, index) => (
                                                    <span
                                                        key={index}
                                                        className={`px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 hover:scale-105 ${
                                                            label ===
                                                            "good first issue"
                                                                ? "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                                                                : "bg-slate-700/50 text-slate-300 border border-slate-600/30 hover:border-slate-500/50"
                                                        }`}
                                                    >
                                                        {label}
                                                    </span>
                                                )
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Enhanced main content */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Enhanced issue header */}
                            <div className="relative group">
                                {/* <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div> */}
                                <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-blue-500/30 transition-all duration-300">
                                    <div className="flex justify-between items-start mb-6">
                                        <h1 className="text-3xl font-bold text-white leading-tight pr-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text">
                                            {issue.title}
                                        </h1>
                                        <button
                                            onClick={toggleBookmark}
                                            disabled={bookmarkLoading}
                                            className={`p-3 rounded-xl transition-all duration-200 hover:scale-110 cursor-pointer ${
                                                issue.isBookmarked
                                                    ? "text-yellow-400 bg-yellow-500/10 border border-yellow-500/20 shadow-yellow-500/20 shadow-lg"
                                                    : "text-slate-400 hover:text-yellow-400 bg-slate-800/50 hover:bg-yellow-500/10 border border-slate-700/50 hover:border-yellow-500/20"
                                            }`}
                                        >
                                            {bookmarkLoading ? (
                                                <Loader2 className="w-6 h-6 animate-spin" />
                                            ) : (
                                                <Bookmark
                                                    className="w-6 h-6"
                                                    fill={
                                                        issue.isBookmarked
                                                            ? "currentColor"
                                                            : "none"
                                                    }
                                                />
                                            )}
                                        </button>
                                    </div>

                                    {/* Enhanced issue body */}
                                    <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-6">
                                        <h2 className="text-xl font-semibold text-white mb-4 flex items-center space-x-2">
                                            <GitBranch className="w-5 h-5 text-indigo-400" />
                                            <span>Description</span>
                                        </h2>
                                        <div className="prose prose-invert max-w-none">
                                            <pre className="whitespace-pre-wrap text-slate-300 leading-relaxed font-sans text-base">
                                                {issue.body}
                                            </pre>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Enhanced comments section */}
                            <div className="bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 hover:border-green-500/30 transition-all duration-300">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-2xl font-semibold text-white flex items-center space-x-3">
                                        <MessageSquare className="w-6 h-6 text-green-400" />
                                        <span>Discussion</span>
                                        <span className="bg-green-500/10 text-green-300 px-3 py-1 rounded-full text-sm border border-green-500/20">
                                            {issue.comments.length}
                                        </span>
                                    </h2>
                                    {currentUser && (
                                        <button
                                            onClick={() =>
                                                setShowCommentForm(
                                                    !showCommentForm
                                                )
                                            }
                                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 hover:scale-105 cursor-pointer ${
                                                showCommentForm
                                                    ? "bg-red-500/10 text-red-300 border border-red-500/20 hover:bg-red-500/20"
                                                    : "bg-blue-500/10 text-blue-300 border border-blue-500/20 hover:bg-blue-500/20"
                                            }`}
                                        >
                                            {showCommentForm ? (
                                                <>
                                                    <X className="w-4 h-4" />
                                                    <span>Cancel</span>
                                                </>
                                            ) : (
                                                <>
                                                    <Plus className="w-4 h-4" />
                                                    <span>Add Comment</span>
                                                </>
                                            )}
                                        </button>
                                    )}
                                </div>

                                {/* Enhanced comment form */}
                                {showCommentForm && currentUser && (
                                    <div className="mb-8 p-6 bg-slate-800/30 rounded-xl border border-slate-700/30">
                                        <div className="flex items-start space-x-4">
                                            <img
                                                src={currentUser.image}
                                                alt={currentUser.name}
                                                className="w-10 h-10 rounded-full border-2 border-indigo-500/30"
                                            />
                                            <div className="flex-1">
                                                <textarea
                                                    value={newComment}
                                                    onChange={(e) =>
                                                        setNewComment(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="Share your thoughts..."
                                                    className="w-full p-4 bg-slate-900/50 border border-slate-600/50 rounded-xl text-white placeholder-slate-400 resize-none focus:outline-none focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
                                                    rows={4}
                                                    disabled={submittingComment}
                                                />
                                                <div className="flex justify-end mt-3">
                                                    <button
                                                        onClick={submitComment}
                                                        disabled={
                                                            !newComment.trim() ||
                                                            submittingComment
                                                        }
                                                        className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-slate-600 disabled:to-slate-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg cursor-pointer"
                                                    >
                                                        {submittingComment ? (
                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                        ) : (
                                                            <Send className="w-4 h-4" />
                                                        )}
                                                        <span>
                                                            Post Comment
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Enhanced comments list */}
                                {issue.comments.length > 0 ? (
                                    <div className="space-y-6">
                                        {issue.comments.map(
                                            (comment, index) => (
                                                <div
                                                    key={index}
                                                    className="group relative"
                                                >
                                                    <div className="absolute left-5 top-12 bottom-0 w-px bg-gradient-to-b from-slate-600/50 to-transparent"></div>
                                                    <div className="flex items-start space-x-4 relative">
                                                        <img
                                                            src={
                                                                comment.user
                                                                    .image
                                                            }
                                                            alt={
                                                                comment.user
                                                                    .name
                                                            }
                                                            className="w-10 h-10 rounded-full border-2 border-slate-600/50 group-hover:border-indigo-500/30 transition-all duration-200 relative z-10 bg-slate-900"
                                                        />
                                                        <div className="flex-1 bg-slate-800/30 border border-slate-700/30 rounded-xl p-5 group-hover:border-indigo-500/20 transition-all duration-200">
                                                            <div className="flex items-baseline justify-between mb-3">
                                                                <div className="flex items-center space-x-3">
                                                                    <span className="font-semibold text-white">
                                                                        {
                                                                            comment
                                                                                .user
                                                                                .name
                                                                        }
                                                                    </span>
                                                                    <span className="text-xs text-slate-400 bg-slate-700/50 px-2 py-1 rounded-full">
                                                                        {formatRelativeTime(
                                                                            comment.createdAt
                                                                        )}
                                                                    </span>
                                                                </div>
                                                                {comment.user
                                                                    .id ===
                                                                    currentUser?.id && (
                                                                    <button
                                                                        onClick={() =>
                                                                            deleteComment(
                                                                                comment.id
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            deletingCommentId ===
                                                                            comment.id
                                                                        }
                                                                        className="text-slate-400 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-500/10 cursor-pointer"
                                                                    >
                                                                        {deletingCommentId ===
                                                                        comment.id ? (
                                                                            <Loader2 className="w-4 h-4 animate-spin" />
                                                                        ) : (
                                                                            <Trash2 className="w-4 h-4" />
                                                                        )}
                                                                    </button>
                                                                )}
                                                            </div>
                                                            <div className="text-slate-300 leading-relaxed">
                                                                <pre className="whitespace-pre-wrap font-sans text-sm">
                                                                    {
                                                                        comment.comment
                                                                    }
                                                                </pre>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        )}
                                    </div>
                                ) : (
                                    <div className="text-center py-12">
                                        <MessageSquare className="w-12 h-12 mx-auto mb-4 text-slate-500" />
                                        <p className="text-slate-400 text-lg">
                                            No comments yet
                                        </p>
                                        <p className="text-slate-500 mt-1">
                                            Be the first to share your thoughts!
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
