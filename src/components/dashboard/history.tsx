import React from "react";
import { Clock, ArrowRight } from "lucide-react";

export default function Historys() {
    return (
        <>
            <div className="p-6 relative z-10">
                <div className="space-y-4">
                    {[
                        {
                            action: "Viewed issue",
                            item: "Add React 18 support",
                            time: "2 hours ago",
                        },
                        {
                            action: "Bookmarked",
                            item: "Docker optimization",
                            time: "1 day ago",
                        },
                        {
                            action: "Searched",
                            item: "Python machine learning",
                            time: "2 days ago",
                        },
                        {
                            action: "Viewed organization",
                            item: "TensorFlow",
                            time: "3 days ago",
                        },
                    ].map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 flex items-center justify-between"
                        >
                            <div className="flex items-center space-x-4">
                                <div className="w-8 h-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                                    <Clock className="w-4 h-4 text-yellow-400" />
                                </div>
                                <div>
                                    <p className="text-white">
                                        {item.action}:{" "}
                                        <span className="text-yellow-400">
                                            {item.item}
                                        </span>
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        {item.time}
                                    </p>
                                </div>
                            </div>
                            <button className="text-gray-400 hover:text-white transition-colors">
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
