"use client";

import React, { useState, useEffect } from "react";
import {
    ArrowLeft,
    Calendar,
    ExternalLink,
    Tag,
    MessageSquare,
    Loader2,
    AlertCircle,
    BookOpen,
    Code,
    ChevronDown,
    ChevronUp,
    Eye,
    EyeOff,
} from "lucide-react";
import Link from "next/link";

// Types
interface Organization {
    id: string;
    name: string;
    image: string;
    description: string;
    openIssues: number;
    totalRepos: number;
    totalIssues: number;
    repos: Repository[];
    createdAt: string;
    updatedAt: string;
}

interface Repository {
    id: string;
    name: string;
    language: string;
    difficulty: string;
    totalIssues: number;
    createdAt: string;
    updatedAt: string;
    issues: Issue[];
}

interface Issue {
    id: string;
    githubId: string;
    number: number;
    title: string;
    body: string;
    state: string;
    html_url: string;
    comments_count: number;
    labels: string[];
    createdAt: string;
    updatedAt: string;
}

interface ApiResponse {
    success: boolean;
    data?: Organization;
    error?: string;
}

export default function OrganizationId({
    organizationId,
}: {
    organizationId: string;
}) {
    const [organization, setOrganization] = useState<Organization | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedRepos, setExpandedRepos] = useState<Set<string>>(new Set());

    useEffect(() => {
        fetchOrganization();
    }, [organizationId]);

    const fetchOrganization = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `/api/v1/organization/${organizationId}`
            );
            const result: ApiResponse = await response.json();

            if (!response.ok) {
                throw new Error(result.error || "Failed to fetch organization");
            }

            if (result.success && result.data) {
                setOrganization(result.data);
            } else {
                throw new Error("Invalid response format");
            }
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "An unexpected error occurred"
            );
        } finally {
            setLoading(false);
        }
    };

    const toggleRepoExpansion = (repoId: string) => {
        setExpandedRepos((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(repoId)) {
                newSet.delete(repoId);
            } else {
                newSet.add(repoId);
            }
            return newSet;
        });
    };

    const formatRelativeTime = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor(
            (now.getTime() - date.getTime()) / 1000
        );

        if (diffInSeconds < 60) return "just now";
        if (diffInSeconds < 3600)
            return `${Math.floor(diffInSeconds / 60)}m ago`;
        if (diffInSeconds < 86400)
            return `${Math.floor(diffInSeconds / 3600)}h ago`;
        if (diffInSeconds < 2592000)
            return `${Math.floor(diffInSeconds / 86400)}d ago`;
        return date.toLocaleDateString();
    };

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty.toLowerCase()) {
            case "easy":
                return "bg-emerald-500/10 text-emerald-300 border-emerald-500/20";
            case "medium":
                return "bg-yellow-500/10 text-yellow-300 border-yellow-500/20";
            case "hard":
                return "bg-red-500/10 text-red-300 border-red-500/20";
            default:
                return "bg-slate-500/10 text-slate-300 border-slate-500/20";
        }
    };

    const getLanguageColor = (index: number) => {
        const colors = [
            "bg-blue-500/10 text-blue-300 border-blue-500/20",
            "bg-purple-500/10 text-purple-300 border-purple-500/20",
            "bg-teal-500/10 text-teal-300 border-teal-500/20",
            "bg-orange-500/10 text-orange-300 border-orange-500/20",
            "bg-pink-500/10 text-pink-300 border-pink-500/20",
        ];
        return colors[index % colors.length];
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-indigo-400" />
                    <p className="text-slate-300 text-lg">
                        Loading organization...
                    </p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white flex items-center justify-center">
                <div className="text-center max-w-md mx-auto p-6">
                    <AlertCircle className="w-16 h-16 mx-auto mb-4 text-red-400" />
                    <h2 className="text-2xl font-bold mb-2 text-white">
                        Error Loading Organization
                    </h2>
                    <p className="text-slate-300 mb-6">{error}</p>
                    <button
                        onClick={fetchOrganization}
                        className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium rounded-xl transition-all duration-200 hover:scale-105"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    if (!organization) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-slate-300 text-lg">
                        Organization not found
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white relative overflow-hidden">
            <div className="relative z-10 p-3 sm:p-4 lg:p-6">
                <div className="mx-auto max-w-7xl space-y-4 sm:space-y-6">
                    {/* Enhanced back button */}
                    <button
                        onClick={() => window.history.back()}
                        className="group flex items-center space-x-2 text-slate-400 hover:text-white cursor-pointer"
                    >
                        <div className="p-2 rounded-xl bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 group-hover:border-indigo-500/30">
                            <ArrowLeft className="w-4 h-4" />
                        </div>
                        <span className="font-medium text-lg sm:text-xl">
                            Back to Organizations
                        </span>
                    </button>

                    {/* Organization Header */}
                    <div className="relative group">
                        <div className="relative bg-slate-900/80 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl p-6 sm:p-8 hover:border-indigo-500/30 transition-all duration-300">
                            <div className="flex items-start space-x-4 sm:space-x-6">
                                <div className="relative flex-shrink-0">
                                    <img
                                        src={
                                            organization.image ||
                                            "/api/placeholder/80/80"
                                        }
                                        alt={organization.name}
                                        className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-xl border-2 border-slate-600/50"
                                    />
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 bg-emerald-500 rounded-full border-2 border-slate-900"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight bg-gradient-to-r from-white to-slate-300 bg-clip-text mb-2">
                                        {organization.name}
                                    </h1>
                                    <p className="text-slate-300 text-base sm:text-lg mb-4 line-clamp-2">
                                        {organization.description}
                                    </p>
                                    <div className="flex flex-wrap gap-4 sm:gap-6 text-sm sm:text-base">
                                        <div className="flex items-center space-x-2 text-slate-400">
                                            <BookOpen className="w-4 h-4 text-blue-400" />
                                            <span>
                                                {organization.totalRepos}{" "}
                                                repositories
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-slate-400">
                                            <AlertCircle className="w-4 h-4 text-yellow-400" />
                                            <span>
                                                {organization.openIssues} open
                                                issues
                                            </span>
                                        </div>
                                        <div className="flex items-center space-x-2 text-slate-400">
                                            <MessageSquare className="w-4 h-4 text-green-400" />
                                            <span>
                                                {organization.totalIssues} total
                                                issues
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Repositories Grid */}
                    <div className="space-y-4 sm:space-y-6">
                        <h2 className="text-xl sm:text-2xl font-semibold text-white flex items-center space-x-3">
                            <Code className="w-6 h-6 text-indigo-400" />
                            <span>Repositories</span>
                            <span className="bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full text-sm border border-indigo-500/20">
                                {organization.repos.length}
                            </span>
                        </h2>

                        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {organization.repos.map((repo) => {
                                const isExpanded = expandedRepos.has(repo.id);
                                return (
                                    <div
                                        key={repo.id}
                                        className="relative group"
                                    >
                                        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-slate-700/50 rounded-xl p-4 sm:p-6 hover:border-purple-500/30 transition-all duration-300 h-full">
                                            <div className="flex items-start justify-between mb-4">
                                                <h3 className="text-lg font-semibold text-white truncate flex-1 mr-2">
                                                    {repo.name}
                                                </h3>
                                                <span
                                                    className={`inline-flex items-center px-2 py-1 rounded-lg text-xs font-medium border ${getDifficultyColor(repo.difficulty)}`}
                                                >
                                                    <div className="w-1.5 h-1.5 rounded-full bg-current mr-1"></div>
                                                    {repo.difficulty}
                                                </span>
                                            </div>

                                            <div className="space-y-3">
                                                <div>
                                                    <p className="text-xs text-slate-400 mb-1 uppercase tracking-wide">
                                                        Language
                                                    </p>
                                                    <span
                                                        className={`px-2 py-1 rounded-lg text-xs font-medium border ${getLanguageColor(0)}`}
                                                    >
                                                        {repo.language}
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 text-sm">
                                                    <div className="flex items-center space-x-2 text-slate-400">
                                                        <AlertCircle className="w-4 h-4 text-yellow-400" />
                                                        <span>
                                                            {repo.totalIssues}{" "}
                                                            issues
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center space-x-2 text-slate-400">
                                                        <Calendar className="w-4 h-4 text-blue-400" />
                                                        <span>
                                                            {formatRelativeTime(
                                                                repo.updatedAt
                                                            )}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* All Issues Section */}
                                            {repo.issues.length > 0 && (
                                                <div className="mt-4 pt-4 border-t border-slate-700/30">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <p className="text-xs text-slate-400 uppercase tracking-wide">
                                                            All Issues (
                                                            {repo.issues.length}
                                                            )
                                                        </p>
                                                        <button
                                                            onClick={() =>
                                                                toggleRepoExpansion(
                                                                    repo.id
                                                                )
                                                            }
                                                            className="flex items-center space-x-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                                                        >
                                                            {isExpanded ? (
                                                                <>
                                                                    <EyeOff className="w-3 h-3" />
                                                                    <span>
                                                                        Collapse
                                                                    </span>
                                                                    <ChevronUp className="w-3 h-3" />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <Eye className="w-3 h-3" />
                                                                    <span>
                                                                        View All
                                                                    </span>
                                                                    <ChevronDown className="w-3 h-3" />
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>

                                                    <div
                                                        className={`space-y-2 transition-all duration-300 ${
                                                            isExpanded
                                                                ? "max-h-96 overflow-y-auto"
                                                                : "max-h-24 overflow-hidden"
                                                        }`}
                                                    >
                                                        {repo.issues.map(
                                                            (issue, index) => (
                                                                <div
                                                                    key={
                                                                        issue.id
                                                                    }
                                                                    className={`flex items-start space-x-2 p-2 rounded-lg transition-all duration-200 ${
                                                                        !isExpanded &&
                                                                        index >=
                                                                            2
                                                                            ? "opacity-50"
                                                                            : ""
                                                                    } hover:bg-slate-800/30`}
                                                                >
                                                                    <Tag className="w-3 h-3 text-indigo-400 mt-1 flex-shrink-0" />
                                                                    <div className="flex-1 min-w-0">
                                                                        <p className="text-slate-300 text-xs">
                                                                            <span className="font-medium">
                                                                                #
                                                                                {
                                                                                    issue.number
                                                                                }
                                                                            </span>{" "}
                                                                            {
                                                                                issue.title
                                                                            }
                                                                        </p>
                                                                        <div className="flex items-center space-x-2 mt-1">
                                                                            <span
                                                                                className={`text-xs px-1.5 py-0.5 rounded ${
                                                                                    issue.state ===
                                                                                    "open"
                                                                                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                                                                                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                                                                                }`}
                                                                            >
                                                                                {
                                                                                    issue.state
                                                                                }
                                                                            </span>
                                                                            <span className="text-xs text-slate-500">
                                                                                {
                                                                                    issue.comments_count
                                                                                }{" "}
                                                                                comments
                                                                            </span>
                                                                            <span className="text-xs text-slate-500">
                                                                                {formatRelativeTime(
                                                                                    issue.createdAt
                                                                                )}
                                                                            </span>
                                                                        </div>
                                                                        {issue
                                                                            .labels
                                                                            .length >
                                                                            0 && (
                                                                            <div className="flex flex-wrap gap-1 mt-1">
                                                                                {issue.labels
                                                                                    .slice(
                                                                                        0,
                                                                                        3
                                                                                    )
                                                                                    .map(
                                                                                        (
                                                                                            label,
                                                                                            labelIndex
                                                                                        ) => (
                                                                                            <span
                                                                                                key={
                                                                                                    labelIndex
                                                                                                }
                                                                                                className="text-xs px-1.5 py-0.5 bg-slate-700/50 text-slate-400 rounded border border-slate-600/30"
                                                                                            >
                                                                                                {
                                                                                                    label
                                                                                                }
                                                                                            </span>
                                                                                        )
                                                                                    )}
                                                                                {issue
                                                                                    .labels
                                                                                    .length >
                                                                                    3 && (
                                                                                    <span className="text-xs text-slate-500">
                                                                                        +
                                                                                        {issue
                                                                                            .labels
                                                                                            .length -
                                                                                            3}{" "}
                                                                                        more
                                                                                    </span>
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                    </div>
                                                                    <Link
                                                                        href={
                                                                            "/issues/" +
                                                                            issue.id
                                                                        }
                                                                        target="_blank"
                                                                        rel="noopener noreferrer"
                                                                        className="text-slate-400 hover:text-indigo-400 transition-colors p-1 hover:bg-slate-800/50 rounded"
                                                                    >
                                                                        <ExternalLink className="w-3 h-3" />
                                                                    </Link>
                                                                </div>
                                                            )
                                                        )}
                                                    </div>

                                                    {!isExpanded &&
                                                        repo.issues.length >
                                                            3 && (
                                                            <div className="mt-2 text-center">
                                                                <button
                                                                    onClick={() =>
                                                                        toggleRepoExpansion(
                                                                            repo.id
                                                                        )
                                                                    }
                                                                    className="text-xs text-indigo-400 hover:text-indigo-300 hover:underline"
                                                                >
                                                                    +
                                                                    {repo.issues
                                                                        .length -
                                                                        3}{" "}
                                                                    more issues
                                                                </button>
                                                            </div>
                                                        )}
                                                </div>
                                            )}

                                            {repo.issues.length === 0 && (
                                                <div className="mt-4 pt-4 border-t border-slate-700/30">
                                                    <p className="text-xs text-slate-500 text-center py-2">
                                                        No issues found for this
                                                        repository
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
