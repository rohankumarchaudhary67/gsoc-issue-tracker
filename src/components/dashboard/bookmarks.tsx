"use client";
import React, { useState } from "react";
import { Bookmark } from "lucide-react";

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

export default function Bookmarks() {
    const [issues, setIssues] = useState(mockIssues);

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
                <div className="grid gap-6">
                    {issues
                        .filter((issue) => issue.isBookmarked)
                        .map((issue) => (
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
                                            onClick={() =>
                                                toggleBookmark(issue.id)
                                            }
                                            className="text-yellow-400 hover:text-gray-400 transition-colors"
                                        >
                                            <Bookmark
                                                className="w-4 h-4"
                                                fill="currentColor"
                                            />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-gray-300 mb-4">
                                    {issue.description}
                                </p>
                                <div className="text-sm text-gray-400">
                                    {issue.organization}/{issue.repo} •{" "}
                                    {issue.language} • {issue.difficulty}
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </>
    );
}
