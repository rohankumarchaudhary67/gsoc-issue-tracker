import React from "react";
import { Eye, Bookmark, Users, Zap } from "lucide-react";

export default function Analytics() {
    return (
        <>
            <div className="p-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                Issues Viewed
                            </h3>
                            <Eye className="w-5 h-5 text-blue-400" />
                        </div>
                        <div className="text-3xl font-bold text-blue-400">
                            127
                        </div>
                        <div className="text-sm text-gray-400">
                            +23% from last week
                        </div>
                    </div>
                    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                Bookmarks
                            </h3>
                            <Bookmark className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div className="text-3xl font-bold text-yellow-400">
                            24
                        </div>
                        <div className="text-sm text-gray-400">
                            +5 this week
                        </div>
                    </div>
                    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                Organizations
                            </h3>
                            <Users className="w-5 h-5 text-green-400" />
                        </div>
                        <div className="text-3xl font-bold text-green-400">
                            18
                        </div>
                        <div className="text-sm text-gray-400">Explored</div>
                    </div>
                    <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-white">
                                Time Saved
                            </h3>
                            <Zap className="w-5 h-5 text-purple-400" />
                        </div>
                        <div className="text-3xl font-bold text-purple-400">
                            45h
                        </div>
                        <div className="text-sm text-gray-400">This month</div>
                    </div>
                </div>

                <div className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                    <h3 className="text-lg font-semibold text-white mb-4">
                        Activity Overview
                    </h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">
                                Most viewed language
                            </span>
                            <span className="text-yellow-400 font-medium">
                                Python
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">
                                Favorite organization
                            </span>
                            <span className="text-yellow-400 font-medium">
                                TensorFlow
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <span className="text-gray-300">
                                Preferred difficulty
                            </span>
                            <span className="text-yellow-400 font-medium">
                                Medium
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
