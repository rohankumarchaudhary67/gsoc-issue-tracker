"use client";
import { useState, useEffect, useCallback, useMemo } from "react";
import {
    Search,
    Filter,
    Github,
    Bookmark,
    Calendar,
    MessageSquare,
    ChevronDown,
    Loader2,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";
import axios from "axios";

// Types
interface Issue {
    id: number;
    github_id: number;
    title: string;
    body: string;
    number: number;
    state: string;
    labels: string[];
    comment_count: number;
    repo: {
        name: string;
        organization: {
            name: string;
        };
        languages: string[];
        difficulty: "Easy" | "Medium" | "Hard";
    };
    createdAt: string;
    isBookmarked?: boolean;
}

interface PaginationInfo {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
}

interface ApiResponse {
    success: boolean;
    data: {
        issues: Issue[];
        pagination: PaginationInfo;
    };
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default function IssuesTab() {
    // State
    const [issues, setIssues] = useState<Issue[]>([]);
    const [pagination, setPagination] = useState<PaginationInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [bookmarkedIssues, setBookmarkedIssues] = useState<Set<number>>(
        new Set()
    );

    // Filter state
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [selectedLabel, setSelectedLabel] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Bookmark loading state
    const [bookmarkLoading, setBookmarkLoading] = useState<Set<number>>(
        new Set()
    );

    // Debounced search term
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    // Static data
    const languages = [
        "JavaScript",
        "Python",
        "Go",
        "Java",
        "TypeScript",
        "Rust",
        "C++",
    ];
    const difficulties = ["EASY", "MEDIUM", "HARD"];

    // API call function for fetching issues
    const fetchIssues = useCallback(
        async (params: {
            page?: number;
            search?: string;
            difficulty?: string;
            languages?: string;
            label?: string;
        }) => {
            try {
                setLoading(true);
                setError(null);

                const queryParams = new URLSearchParams();

                if (params.page)
                    queryParams.append("page", params.page.toString());
                if (params.search?.trim())
                    queryParams.append("search", params.search.trim());
                if (params.difficulty?.trim())
                    queryParams.append("difficulty", params.difficulty.trim());
                if (params.languages?.trim())
                    queryParams.append("languages", params.languages.trim());
                if (params.label?.trim())
                    queryParams.append("label", params.label.trim());

                queryParams.append("limit", "50");

                console.log("API Query Parameters:", queryParams.toString()); // Debug log

                const response = await axios.get(
                    `/api/v1/issues/fetch?${queryParams.toString()}`
                );

                if (!response.data.success) {
                    throw new Error(
                        `API error: ${response.data.error || "Unknown error"}`
                    );
                }

                const data: ApiResponse = response.data;

                if (data.success) {
                    const issuesWithBookmarks = data.data.issues.map(
                        (issue) => ({
                            ...issue,
                            isBookmarked: bookmarkedIssues.has(issue.id),
                        })
                    );

                    setIssues(issuesWithBookmarks);
                    setPagination(data.data.pagination);
                } else {
                    throw new Error("Failed to fetch issues");
                }
            } catch (err) {
                let errorMessage = "An unexpected error occurred";

                if (axios.isAxiosError(err)) {
                    errorMessage = err.response?.data?.error || err.message;
                } else if (err instanceof Error) {
                    errorMessage = err.message;
                }

                setError(errorMessage);
                setIssues([]);
                setPagination(null);
                console.error("Error fetching issues:", err);
            } finally {
                setLoading(false);
            }
        },
        [bookmarkedIssues]
    );

    // Bookmark API functions
    const addBookmark = async (issueId: number): Promise<boolean> => {
        try {
            const response = await axios.post(
                "/api/v1/bookmark/add",
                {
                    issueId: issueId.toString(),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                return true;
            } else {
                throw new Error(
                    response.data.error || "Failed to add bookmark"
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.error || error.message;
                console.error("Error adding bookmark:", errorMessage);

                // Handle specific error cases
                if (error.response?.status === 429) {
                    setError(
                        "Bookmark limit reached. Please upgrade your plan."
                    );
                } else if (error.response?.status === 404) {
                    setError("Issue not found.");
                } else if (error.response?.status === 401) {
                    setError("Please log in to bookmark issues.");
                } else {
                    setError(`Failed to add bookmark: ${errorMessage}`);
                }
            } else {
                console.error("Error adding bookmark:", error);
                setError("An unexpected error occurred while adding bookmark.");
            }
            return false;
        }
    };

    const deleteBookmark = async (issueId: number): Promise<boolean> => {
        try {
            const response = await axios.post(
                "/api/v1/bookmark/delete",
                {
                    issueId: issueId.toString(),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            if (response.data.success) {
                return true;
            } else {
                throw new Error(
                    response.data.error || "Failed to delete bookmark"
                );
            }
        } catch (error) {
            if (axios.isAxiosError(error)) {
                const errorMessage =
                    error.response?.data?.error || error.message;
                console.error("Error deleting bookmark:", errorMessage);

                if (error.response?.status === 401) {
                    setError("Please log in to manage bookmarks.");
                } else {
                    setError(`Failed to delete bookmark: ${errorMessage}`);
                }
            } else {
                console.error("Error deleting bookmark:", error);
                setError(
                    "An unexpected error occurred while deleting bookmark."
                );
            }
            return false;
        }
    };

    // Updated toggle bookmark function with API integration
    const toggleBookmark = async (issueId: number) => {
        // Add to loading state
        setBookmarkLoading((prev) => new Set(prev).add(issueId));

        try {
            const isCurrentlyBookmarked = bookmarkedIssues.has(issueId);
            let success = false;

            if (isCurrentlyBookmarked) {
                // Remove bookmark
                success = await deleteBookmark(issueId);
            } else {
                // Add bookmark
                success = await addBookmark(issueId);
            }

            if (success) {
                // Update local state only if API call was successful
                const newBookmarkedIssues = new Set(bookmarkedIssues);
                if (isCurrentlyBookmarked) {
                    newBookmarkedIssues.delete(issueId);
                } else {
                    newBookmarkedIssues.add(issueId);
                }
                setBookmarkedIssues(newBookmarkedIssues);

                // Update the issue in the current list
                setIssues((prev) =>
                    prev.map((issue) =>
                        issue.id === issueId
                            ? { ...issue, isBookmarked: !issue.isBookmarked }
                            : issue
                    )
                );

                // Clear any previous errors
                setError(null);
            }
        } catch (error) {
            console.error("Error toggling bookmark:", error);
            setError("Failed to update bookmark. Please try again.");
        } finally {
            // Remove from loading state
            setBookmarkLoading((prev) => {
                const newSet = new Set(prev);
                newSet.delete(issueId);
                return newSet;
            });
        }
    };

    // Memoized filter parameters
    const filterParams = useMemo(() => {
        const params: {
            page: number;
            search?: string;
            difficulty?: string;
            languages?: string;
            label?: string;
        } = {
            page: currentPage,
        };

        // Only add non-empty values
        if (debouncedSearchTerm?.trim()) {
            params.search = debouncedSearchTerm.trim();
        }
        if (selectedDifficulty?.trim()) {
            params.difficulty = selectedDifficulty.trim();
        }
        if (selectedLanguage?.trim()) {
            params.languages = selectedLanguage.trim();
        }
        if (selectedLabel?.trim()) {
            params.label = selectedLabel.trim();
        }

        return params;
    }, [
        currentPage,
        debouncedSearchTerm,
        selectedDifficulty,
        selectedLanguage,
        selectedLabel,
    ]);

    // Fetch issues when filters change
    useEffect(() => {
        fetchIssues(filterParams);
    }, [fetchIssues, filterParams]);

    // Reset page when filters change (except page itself)
    useEffect(() => {
        if (currentPage !== 1) {
            setCurrentPage(1);
        }
    }, [
        debouncedSearchTerm,
        selectedDifficulty,
        selectedLanguage,
        selectedLabel,
    ]);

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

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    };

    const clearFilters = () => {
        setSearchTerm("");
        setSelectedLanguage("");
        setSelectedDifficulty("");
        setSelectedLabel("");
        setCurrentPage(1);
    };

    return (
        <div className="p-6 relative z-10">
            {/* Search and Filters */}
            <div className="mb-8 space-y-4">
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search issues..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50 focus:ring-2 focus:ring-yellow-500/20"
                        />
                        {loading && (
                            <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 animate-spin" />
                        )}
                    </div>
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="px-6 py-3 bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl hover:bg-gray-700/70 transition-all flex items-center space-x-2"
                    >
                        <Filter className="w-5 h-5" />
                        <span>Filters</span>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform ${showFilters ? "rotate-180" : ""}`}
                        />
                    </button>
                </div>

                {showFilters && (
                    <div className="p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Language
                                </label>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) => {
                                        console.log(
                                            "Language selected:",
                                            e.target.value
                                        ); // Debug log
                                        setSelectedLanguage(e.target.value);
                                    }}
                                    className="w-full p-3 bg-gray-700/70 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
                                >
                                    <option value="">All Languages</option>
                                    {languages.map((lang) => (
                                        <option key={lang} value={lang}>
                                            {lang}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Difficulty
                                </label>
                                <select
                                    value={selectedDifficulty}
                                    onChange={(e) => {
                                        console.log(
                                            "Difficulty selected:",
                                            e.target.value
                                        ); // Debug log
                                        setSelectedDifficulty(e.target.value);
                                    }}
                                    className="w-full p-3 bg-gray-700/70 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
                                >
                                    <option value="">All Difficulties</option>
                                    {difficulties.map((diff) => (
                                        <option key={diff} value={diff}>
                                            {diff}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Label
                                </label>
                                <input
                                    type="text"
                                    placeholder="Enter label..."
                                    value={selectedLabel}
                                    onChange={(e) =>
                                        setSelectedLabel(e.target.value)
                                    }
                                    className="w-full p-3 bg-gray-700/70 border border-gray-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-yellow-500/50"
                                />
                            </div>
                            <div className="flex items-end">
                                <button
                                    onClick={clearFilters}
                                    className="w-full px-4 py-3 bg-gray-600/50 hover:bg-gray-600/70 border border-gray-500/50 rounded-lg transition-all text-gray-300 hover:text-white"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Results Summary */}
                {pagination && (
                    <div className="flex items-center justify-between text-sm text-gray-400">
                        <span>
                            Showing{" "}
                            {(pagination.currentPage - 1) * pagination.limit +
                                1}{" "}
                            to{" "}
                            {Math.min(
                                pagination.currentPage * pagination.limit,
                                pagination.totalCount
                            )}{" "}
                            of {pagination.totalCount} issues
                        </span>
                    </div>
                )}
            </div>

            {/* Error State */}
            {error && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-xl flex items-center space-x-3">
                    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                    <div>
                        <p className="text-red-400 font-medium">
                            Error loading issues
                        </p>
                        <p className="text-red-300 text-sm">{error}</p>
                    </div>
                    <button
                        onClick={() => fetchIssues(filterParams)}
                        className="ml-auto px-3 py-1 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 rounded-lg text-red-400 text-sm transition-all"
                    >
                        Retry
                    </button>
                </div>
            )}

            {/* Loading State */}
            {loading && issues.length === 0 && (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 text-yellow-400 animate-spin" />
                    <span className="ml-3 text-gray-400">
                        Loading issues...
                    </span>
                </div>
            )}

            {/* Issues Grid */}
            {!loading && issues.length === 0 && !error && (
                <div className="text-center py-12">
                    <p className="text-gray-400 text-lg">No issues found</p>
                    <p className="text-gray-500 text-sm mt-2">
                        Try adjusting your filters or search terms
                    </p>
                </div>
            )}

            <div className="grid gap-6">
                {issues.map((issue) => (
                    <div
                        key={issue.id}
                        className="bg-gray-800/70 cursor-pointer backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-500/30 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                    <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                                        {issue.title}
                                    </h3>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            toggleBookmark(issue.id);
                                        }}
                                        disabled={bookmarkLoading.has(issue.id)}
                                        className={`p-1 rounded-lg transition-colors disabled:opacity-50 ${
                                            issue.isBookmarked
                                                ? "text-yellow-400 bg-yellow-500/20"
                                                : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"
                                        }`}
                                    >
                                        {bookmarkLoading.has(issue.id) ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Bookmark
                                                className="w-4 h-4"
                                                fill={
                                                    issue.isBookmarked
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                            />
                                        )}
                                    </button>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                                    <span className="flex items-center space-x-1">
                                        <Github className="w-4 h-4" />
                                        <span>
                                            {issue.repo.organization.name}/
                                            {issue.repo.name}
                                        </span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>
                                            {formatDate(issue.createdAt)}
                                        </span>
                                    </span>
                                    <span className="flex items-center space-x-1">
                                        <MessageSquare className="w-4 h-4" />
                                        <span>{issue.comment_count}</span>
                                    </span>
                                    <span className="text-gray-500">
                                        #{issue.number}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <p className="text-gray-300 mb-4 line-clamp-3">
                            {issue.body || "No description available"}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                                <span
                                    className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(
                                        issue.repo.difficulty
                                    )}`}
                                >
                                    {issue.repo.difficulty}
                                </span>
                                {issue.repo.languages.map((language) => (
                                    <span
                                        key={language}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30"
                                    >
                                        {language}
                                    </span>
                                ))}
                                {issue.labels.slice(0, 3).map((label) => (
                                    <span
                                        key={label}
                                        className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50"
                                    >
                                        {label}
                                    </span>
                                ))}
                                {issue.labels.length > 3 && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50">
                                        +{issue.labels.length - 3} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
                <div className="mt-8 flex items-center justify-center space-x-2">
                    <button
                        onClick={() =>
                            handlePageChange(pagination.currentPage - 1)
                        }
                        disabled={!pagination.hasPrevPage}
                        className="flex items-center space-x-1 px-3 py-2 bg-gray-800/70 border border-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/70 transition-all"
                    >
                        <ChevronLeft className="w-4 h-4" />
                        <span>Previous</span>
                    </button>

                    <div className="flex items-center space-x-1">
                        {Array.from(
                            { length: Math.min(5, pagination.totalPages) },
                            (_, i) => {
                                let pageNum;
                                if (pagination.totalPages <= 5) {
                                    pageNum = i + 1;
                                } else if (pagination.currentPage <= 3) {
                                    pageNum = i + 1;
                                } else if (
                                    pagination.currentPage >=
                                    pagination.totalPages - 2
                                ) {
                                    pageNum = pagination.totalPages - 4 + i;
                                } else {
                                    pageNum = pagination.currentPage - 2 + i;
                                }

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() =>
                                            handlePageChange(pageNum)
                                        }
                                        className={`px-3 py-2 rounded-lg transition-all ${
                                            pageNum === pagination.currentPage
                                                ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
                                                : "bg-gray-800/70 border border-gray-700/50 hover:bg-gray-700/70"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            }
                        )}
                    </div>

                    <button
                        onClick={() =>
                            handlePageChange(pagination.currentPage + 1)
                        }
                        disabled={!pagination.hasNextPage}
                        className="flex items-center space-x-1 px-3 py-2 bg-gray-800/70 border border-gray-700/50 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/70 transition-all"
                    >
                        <span>Next</span>
                        <ChevronRight className="w-4 h-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
