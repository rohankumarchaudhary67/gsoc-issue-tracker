"use client";
import React, { useState } from "react";
import { Sparkles, Menu, User, Bell } from "lucide-react";
import IssuesTab from "./issues";
import Organizations from "./organizations";
import Bookmarks from "./bookmarks";
import Historys from "./history";
import Analytics from "./analytics";
import AIChat from "./aiChat";
import Sidebar from "./sidebar";

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

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                setAiChatOpen={setAiChatOpen}
                aiChatOpen={aiChatOpen}
            />

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
            {aiChatOpen && <AIChat setAiChatOpen={setAiChatOpen} />}

            {/* Floating Action Button for Mobile */}
            <button
                onClick={() => setAiChatOpen(!aiChatOpen)}
                className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-110 z-40 lg:hidden flex items-center justify-center"
            >
                <Sparkles className="w-6 h-6" />
            </button>

            {/* Quick Stats Bar */}
            {/* <div className="fixed bottom-0 left-0 right-0 lg:left-64 bg-gray-900/90 backdrop-blur-xl border-t border-gray-700/50 p-4 z-30">
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
            </div> */}

            {/* Keyboard Shortcuts Handler */}
            <div className="hidden">
                {/* This would handle keyboard shortcuts in a real app */}
            </div>
        </div>
    );
};

export default DashboardComp;
