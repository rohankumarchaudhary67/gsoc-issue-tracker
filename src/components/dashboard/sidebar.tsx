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
} from "lucide-react";

export default function Sidebar({
    sidebarOpen,
    setSidebarOpen,
    setActiveTab,
    activeTab,
    setAiChatOpen,
    aiChatOpen,
}: {
    sidebarOpen: boolean;
    setSidebarOpen: (open: boolean) => void;
    activeTab: string;
    setActiveTab: (tab: string) => void;
    setAiChatOpen: (open: boolean) => void;
    aiChatOpen: boolean;
}) {
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
                            onClick={() => setActiveTab("issues")}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "issues" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <Code className="w-5 h-5" />
                            <span>Issues</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("organizations")}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "organizations" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <Users className="w-5 h-5" />
                            <span>Organizations</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("bookmarks")}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "bookmarks" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <Bookmark className="w-5 h-5" />
                            <span>Bookmarks</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("history")}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all cursor-pointer ${activeTab === "history" ? "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30" : "hover:bg-gray-800/50"}`}
                        >
                            <History className="w-5 h-5" />
                            <span>History</span>
                        </button>
                        <button
                            onClick={() => setActiveTab("analytics")}
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
        </>
    );
}
