"use client";
import React, { useState, useEffect } from "react";
import { Eye, Bookmark, Users, Zap, Loader2, AlertCircle } from "lucide-react";

interface AnalyticsData {
    openedIssues: number;
    bookmarks: number;
    aiQueries: number;
    organizationAccess: number;
}

export default function Analytics() {
    const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(
        null
    );
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await fetch("/api/v1/analytics/fetch");
            const data = await response.json();

            if (data.success) {
                setAnalyticsData(data.data);
            } else {
                setError(data.error || "Failed to fetch analytics data");
            }
        } catch (err) {
            console.error("Error fetching analytics:", err);
            setError("Failed to load analytics");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-6 relative z-10">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="flex items-center space-x-3">
                        <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                        <span className="text-white text-lg">
                            Loading analytics...
                        </span>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 relative z-10">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="bg-red-900/20 border border-red-700/50 rounded-2xl p-6 max-w-md">
                        <div className="flex items-center space-x-3 mb-4">
                            <AlertCircle className="w-6 h-6 text-red-400" />
                            <span className="text-red-400 font-semibold">
                                Error
                            </span>
                        </div>
                        <p className="text-gray-300 mb-4">{error}</p>
                        <button
                            onClick={fetchAnalytics}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">
                            Issues Opened
                        </h3>
                        <Eye className="w-5 h-5 text-blue-400" />
                    </div>
                    <div className="text-3xl font-bold text-blue-400">
                        {analyticsData?.openedIssues || 0}
                    </div>
                    <div className="text-sm text-gray-400">Total opened</div>
                </div>

                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">
                            Bookmarks
                        </h3>
                        <Bookmark className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div className="text-3xl font-bold text-yellow-400">
                        {analyticsData?.bookmarks || 0}
                    </div>
                    <div className="text-sm text-gray-400">Saved items</div>
                </div>

                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">
                            AI Queries
                        </h3>
                        <Zap className="w-5 h-5 text-purple-400" />
                    </div>
                    <div className="text-3xl font-bold text-purple-400">
                        {analyticsData?.aiQueries || 0}
                    </div>
                    <div className="text-sm text-gray-400">Queries made</div>
                </div>

                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">
                            Organizations
                        </h3>
                        <Users className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="text-3xl font-bold text-green-400">
                        {analyticsData?.organizationAccess || 0}
                    </div>
                    <div className="text-sm text-gray-400">Accessed</div>
                </div>
            </div>

            <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-white mb-4">
                    Account Information
                </h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-gray-300">
                            Total Issues Opened
                        </span>
                        <span className="text-blue-400 font-medium">
                            {analyticsData?.openedIssues || 0}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-300">Total Bookmarks</span>
                        <span className="text-yellow-400 font-medium">
                            {analyticsData?.bookmarks || 0}
                        </span>
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-gray-300">Total AI Queries</span>
                        <span className="text-purple-400 font-medium">
                            {analyticsData?.aiQueries || 0}
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-4 flex justify-end">
                <button
                    onClick={fetchAnalytics}
                    className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2 cursor-pointer"
                >
                    <span>Refresh</span>
                </button>
            </div>
        </div>
    );
}
