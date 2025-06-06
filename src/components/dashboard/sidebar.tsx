"use client";
import {
    Code,
    Users,
    Bookmark,
    History,
    BarChart3,
    Sparkles,
    Crown,
    Trophy,
    X,
    Menu,
    Bell,
    User,
} from "lucide-react";
import { useState } from "react";
import AIChat from "./aiChat";
import { redirect } from "next/navigation";

export default function Sidebar({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("issues");
    const [aiChatOpen, setAiChatOpen] = useState(false);

    const handleSidebarButtonClick = (tab: string) => {
        setActiveTab(tab);
        setSidebarOpen(false);
        redirect(`/${tab}`);
    };

    return (
        <>
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
                            onClick={() => {
                                handleSidebarButtonClick("issues");
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "issues" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <Code className="w-5 h-5" />
                            <span>Issues</span>
                        </button>
                        <button
                            onClick={() => {
                                handleSidebarButtonClick("organizations");
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "organizations" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <Users className="w-5 h-5" />
                            <span>Organizations</span>
                        </button>
                        <button
                            onClick={() => {
                                handleSidebarButtonClick("bookmarks");
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "bookmarks" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <Bookmark className="w-5 h-5" />
                            <span>Bookmarks</span>
                        </button>
                        <button
                            onClick={() => {
                                handleSidebarButtonClick("history");
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "history" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <History className="w-5 h-5" />
                            <span>History</span>
                        </button>
                        <button
                            onClick={() => {
                                handleSidebarButtonClick("analytics");
                            }}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "analytics" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <BarChart3 className="w-5 h-5" />
                            <span>Analytics</span>
                        </button>
                    </nav>

                    <div className="mt-8 pt-6 border-t border-gray-700/50">
                        <button
                            onClick={() => setAiChatOpen(!aiChatOpen)}
                            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 transition-all cursor-pointer"
                        >
                            <Sparkles className="w-5 h-5" />
                            <span>AI Assistant</span>
                        </button>

                        <button className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 hover:from-yellow-500/30 hover:to-orange-500/30 transition-all mt-3 cursor-pointer">
                            <Crown className="w-5 h-5" />
                            <span>Upgrade to Pro</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Header */}
            <div className="lg:ml-64 min-h-screen">
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
                                {activeTab === "issues" &&
                                    "Open Source & GSoC GitHub Issues"}
                                {activeTab === "organizations" &&
                                    "Open Source & GSoC Organizations"}
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

                {children}

                {/* AI Chat Panel */}
                {aiChatOpen && <AIChat setAiChatOpen={setAiChatOpen} />}

                {/* Floating Action Button for Mobile */}
                <button
                    onClick={() => setAiChatOpen(!aiChatOpen)}
                    className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 z-40 lg:hidden flex items-center justify-center"
                >
                    <Sparkles className="w-6 h-6" />
                </button>
            </div>
        </>
    );
}
