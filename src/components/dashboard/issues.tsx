"use client";
import { useState } from "react";
import {
    Search,
    Filter,
    Star,
    Github,
    Bookmark,
    Calendar,
    ExternalLink,
    MessageSquare,
    ChevronDown,
} from "lucide-react";

// Mock data for demonstration
const mockIssues = [
    {
        id: 1,
        title: "Add support for React 18 concurrent features",
        organization: "React",
        repo: "react",
        labels: ["enhancement", "help wanted", "good first issue"],
        difficulty: "Medium",
        language: "JavaScript",
        created: "2024-05-20",
        comments: 12,
        stars: 8,
        isBookmarked: false,
        description:
            "Implement concurrent features for better performance in React applications.",
    },
    {
        id: 2,
        title: "Improve Docker container startup time",
        organization: "Docker",
        repo: "docker-ce",
        labels: ["performance", "help wanted"],
        difficulty: "Hard",
        language: "Go",
        created: "2024-05-18",
        comments: 8,
        stars: 15,
        isBookmarked: true,
        description:
            "Optimize container startup time by improving image layer caching.",
    },
    {
        id: 3,
        title: "Add dark mode support to admin panel",
        organization: "Django",
        repo: "django",
        labels: ["enhancement", "ui/ux", "good first issue"],
        difficulty: "Easy",
        language: "Python",
        created: "2024-05-22",
        comments: 5,
        stars: 23,
        isBookmarked: false,
        description: "Implement dark mode theme for Django admin interface.",
    },
    {
        id: 4,
        title: "Machine Learning model optimization",
        organization: "TensorFlow",
        repo: "tensorflow",
        labels: ["ml", "optimization", "help wanted"],
        difficulty: "Hard",
        language: "Python",
        created: "2024-05-15",
        comments: 18,
        stars: 42,
        isBookmarked: true,
        description:
            "Optimize TensorFlow models for better inference performance.",
    },
];

const mockOrganizations = [
    { name: "React", issues: 45, logo: "⚛️" },
    { name: "Django", issues: 38, logo: "🐍" },
    { name: "Docker", issues: 52, logo: "🐳" },
    { name: "TensorFlow", issues: 67, logo: "🧠" },
    { name: "Kubernetes", issues: 89, logo: "☸️" },
    { name: "Apache", issues: 156, logo: "🪶" },
];

export default function IssuesTab() {
    const [issues, setIssues] = useState(mockIssues);
    const [searchTerm, setSearchTerm] = useState("");
    const [showFilters, setShowFilters] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState("");
    const [selectedOrg, setSelectedOrg] = useState("");

    const languages = [
        "JavaScript",
        "Python",
        "Go",
        "Java",
        "TypeScript",
        "Rust",
        "C++",
    ];
    const difficulties = ["Easy", "Medium", "Hard"];

    const filteredIssues = issues.filter((issue) => {
        return (
            issue.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedLanguage === "" || issue.language === selectedLanguage) &&
            (selectedDifficulty === "" ||
                issue.difficulty === selectedDifficulty) &&
            (selectedOrg === "" || issue.organization === selectedOrg)
        );
    });

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

    const toggleBookmark = (issueId: number) => {
        setIssues(
            issues.map((issue) =>
                issue.id === issueId
                    ? { ...issue, isBookmarked: !issue.isBookmarked }
                    : issue
            )
        );
    };

    return (
        <>
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
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-700/50">
                            <div>
                                <label className="block text-sm font-medium mb-2">
                                    Language
                                </label>
                                <select
                                    value={selectedLanguage}
                                    onChange={(e) =>
                                        setSelectedLanguage(e.target.value)
                                    }
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
                                <label className="block text-sm font-medium mb-2">
                                    Difficulty
                                </label>
                                <select
                                    value={selectedDifficulty}
                                    onChange={(e) =>
                                        setSelectedDifficulty(e.target.value)
                                    }
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
                                <label className="block text-sm font-medium mb-2">
                                    Label
                                </label>
                                <select
                                    value={selectedOrg}
                                    onChange={(e) =>
                                        setSelectedOrg(e.target.value)
                                    }
                                    className="w-full p-3 bg-gray-700/70 border border-gray-600/50 rounded-lg text-white focus:outline-none focus:border-yellow-500/50"
                                >
                                    <option value="">All Organizations</option>
                                    {mockOrganizations.map((org) => (
                                        <option key={org.name} value={org.name}>
                                            {org.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </div>

                {/* Issues Grid */}
                <div className="grid gap-6">
                    {filteredIssues.map((issue) => (
                        <div
                            key={issue.id}
                            className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-500/30 transition-all group"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3 mb-2">
                                        <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                                            {issue.title}
                                        </h3>
                                        <button
                                            onClick={() =>
                                                toggleBookmark(issue.id)
                                            }
                                            className={`p-1 rounded-lg transition-colors ${issue.isBookmarked ? "text-yellow-400 bg-yellow-500/20" : "text-gray-400 hover:text-yellow-400 hover:bg-yellow-500/10"}`}
                                        >
                                            <Bookmark
                                                className="w-4 h-4"
                                                fill={
                                                    issue.isBookmarked
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                            />
                                        </button>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-gray-400 mb-3">
                                        <span className="flex items-center space-x-1">
                                            <Github className="w-4 h-4" />
                                            <span>
                                                {issue.organization}/
                                                {issue.repo}
                                            </span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Calendar className="w-4 h-4" />
                                            <span>{issue.created}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <MessageSquare className="w-4 h-4" />
                                            <span>{issue.comments}</span>
                                        </span>
                                        <span className="flex items-center space-x-1">
                                            <Star className="w-4 h-4" />
                                            <span>{issue.stars}</span>
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-gray-300 mb-4">
                                {issue.description}
                            </p>

                            <div className="flex items-center justify-between">
                                <div className="flex flex-wrap gap-2">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(issue.difficulty)}`}
                                    >
                                        {issue.difficulty}
                                    </span>
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                        {issue.language}
                                    </span>
                                    {issue.labels.map((label) => (
                                        <span
                                            key={label}
                                            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-700/50 text-gray-300 border border-gray-600/50"
                                        >
                                            {label}
                                        </span>
                                    ))}
                                </div>
                                <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-lg hover:from-yellow-500/30 hover:to-orange-500/30 transition-all text-yellow-400">
                                    <span>View Issue</span>
                                    <ExternalLink className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
