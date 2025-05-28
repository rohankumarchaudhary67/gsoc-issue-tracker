import React from "react";
import { Sparkles, X, ArrowRight } from "lucide-react";

export default function AIChat({
    setAiChatOpen,
}: {
    setAiChatOpen: (open: boolean) => void;
}) {
    return (
        <>
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
                            Hi! I&apos;m your AI assistant. I can help you find
                            the perfect GSoC issues, explain technical concepts,
                            and suggest learning paths based on your interests!
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
                                Explain machine learning project requirements
                            </p>
                        </button>
                        <button className="w-full text-left p-3 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg transition-colors">
                            <p className="text-sm text-white">
                                Best practices for contributing to open source
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
        </>
    );
}
