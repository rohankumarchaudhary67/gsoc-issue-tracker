"use client";
import React, { useState } from "react";
import {
    ArrowRight,
    Bookmark,
    History,
    Users,
    Code,
    Trophy,
    Sparkles,
    Menu,
    X,
    BarChart3,
    Crown,
    User,
    Bell,
} from "lucide-react";
import IssuesTab from "./issues";
import Organizations from "./organizations";
import Bookmarks from "./bookmarks";
import Historys from "./history";
import Analytics from "./analytics";

const DashboardComp = () => {
    const [activeTab, setActiveTab] = useState("issues");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [aiChatOpen, setAiChatOpen] = useState(false);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Background Effects */}
            <div className="fixed inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 pointer-events-none"></div>
            <div className="fixed top-20 left-20 w-72 h-72 bg-yellow-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse pointer-events-none"></div>
            <div className="fixed top-40 right-20 w-72 h-72 bg-orange-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000 pointer-events-none"></div>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <div
                className={`fixed top-0 left-0 h-full w-64 bg-gray-900/90 backdrop-blur-xl border-r border-gray-700/50 z-50 transform transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
            >
                <div className="p-6">
                    <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
                                <Trophy className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                                GSoC Hub
                            </span>
                        </div>
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="lg:hidden p-1 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <nav className="space-y-2">
                        <button
                            onClick={() => setActiveTab("issues")}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "issues" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <Code className="w-5 h-5" />
                            <span>Issues</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("organizations")}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "organizations" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <Users className="w-5 h-5" />
                            <span>Organizations</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("bookmarks")}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "bookmarks" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <Bookmark className="w-5 h-5" />
                            <span>Bookmarks</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "history" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <History className="w-5 h-5" />
                            <span>History</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("analytics")}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${activeTab === "analytics" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <BarChart3 className="w-5 h-5" />
                            <span>Analytics</span>
                        </button>
                    </nav>

                    <div className="mt-8 pt-6 border-t border-gray-700/50">
                        <button
                            onClick={() => setAiChatOpen(!aiChatOpen)}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span>AI Assistant</span>
                        </button>

                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all mt-3">
                            <Crown className="w-5 h-5" />
                            <span>Upgrade to Pro</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:ml-64 min-h-screen">
                {/* Header */}
                <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-700/50 p-4 sticky top-0 z-30">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                            >
                                <Menu className="w-5 h-5" />
                            </button>
                            <h1 className="text-2xl font-bold">
                                {activeTab === "issues" && "GitHub Issues"}
                                {activeTab === "organizations" &&
                                    "GSoC Organizations"}
                                {activeTab === "bookmarks" &&
                                    "Bookmarked Issues"}
                                {activeTab === "history" && "Browse History"}
                                {activeTab === "analytics" && "Usage Analytics"}
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative">
                                <Bell className="w-5 h-5" />
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full"></div>
                            </button>
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                                <User className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </header>

                {activeTab === "issues" && <IssuesTab />}

                {/* Organizations Tab */}
                {activeTab === "organizations" && <Organizations />}

                {/* Bookmarks Tab */}
                {activeTab === "bookmarks" && <Bookmarks />}

                {/* History Tab */}
                {activeTab === "history" && <Historys />}

                {/* Analytics Tab */}
                {activeTab === "analytics" && <Analytics />}
            </div>

            {/* AI Chat Panel */}
            {aiChatOpen && (
                <div className="fixed bottom-4 right-4 w-96 h-96 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-2xl shadow-2xl z-50">
                    <div className="flex items-center justify-between p-4 border-b border-gray-700/50">
                        <div className="flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 text-purple-400" />
                            <span className="font-semibold">AI Assistant</span>
                        </div>
                        <button
                            onClick={() => setAiChatOpen(false)}
                            className="p-1 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="p-4 h-64 overflow-y-auto">
                        <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-3 mb-3">
                            <p className="text-sm text-purple-300">
                                Hi! I&apos;m your AI assistant. I can help you
                                find the perfect GSoC issues, explain technical
                                concepts, and suggest learning paths based on
                                your interests!
                            </p>
                        </div>
                        <div className="space-y-3">
                            <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <p className="text-sm text-white">
                                    Find issues for Python beginners
                                </p>
                            </button>
                            <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <p className="text-sm text-white">
                                    Explain machine learning project
                                    requirements
                                </p>
                            </button>
                            <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                                <p className="text-sm text-white">
                                    Best practices for contributing to open
                                    source
                                </p>
                            </button>
                        </div>
                    </div>
                    <div className="p-4 border-t border-gray-700/50">
                        <div className="flex space-x-2">
                            <input
                                type="text"
                                placeholder="Ask me anything..."
                                className="flex-1 p-2 bg-gray-800/70 border border-gray-700/50 rounded-lg text-white placeholder-gray-400 text-sm focus:outline-none focus:border-purple-500/50"
                            />
                            <button className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Floating Action Button for Mobile */}
            <button
                onClick={() => setAiChatOpen(!aiChatOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 z-40 lg:hidden flex items-center justify-center"
            >
                <Sparkles className="w-6 h-6" />
            </button>

            {/* Quick Stats Bar */}
            <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-gray-900/90 backdrop-blur-xl border-t border-gray-700/50 p-4 z-30">
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-gray-400">
                                Live data updated
                            </span>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center space-x-4 text-gray-400">
                        <span>Press</span>
                        <kbd className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-xs">
                            Ctrl+K
                        </kbd>
                        <span>for quick search</span>
                    </div>
                </div>
            </div>

            {/* Pro Features Modal Trigger */}
            <div className="fixed top-1/2 right-0 transform -translate-y-1/2 z-40">
                <button className="bg-gradient-to-t from-yellow-500 to-orange-500 text-white p-3 rounded-l-xl shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 transform hover:scale-105 group">
                    <div className="flex items-center space-x-2">
                        <Crown className="w-5 h-5" />
                        <div className="text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            <div className="font-semibold">Upgrade to Pro</div>
                            <div className="text-yellow-100">
                                Unlimited filters & AI
                            </div>
                        </div>
                    </div>
                </button>
            </div>

            {/* Keyboard Shortcuts Handler */}
            <div className="hidden">
                {/* This would handle keyboard shortcuts in a real app */}
            </div>
        </div>
    );
};

export default DashboardComp;
