import React from "react";
import { TrendingUp, ArrowRight } from "lucide-react";

const mockOrganizations = [
    { name: "React", issues: 45, logo: "⚛️" },
    { name: "Django", issues: 38, logo: "🐍" },
    { name: "Docker", issues: 52, logo: "🐳" },
    { name: "TensorFlow", issues: 67, logo: "🧠" },
    { name: "Kubernetes", issues: 89, logo: "☸️" },
    { name: "Apache", issues: 156, logo: "🪶" },
];

export default function Organizations() {
    return (
        <>
            <div className="p-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockOrganizations.map((org) => (
                        <div
                            key={org.name}
                            className="bg-gray-800/70 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:border-yellow-500/30 transition-all group cursor-pointer"
                        >
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="text-4xl">{org.logo}</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-white group-hover:text-yellow-400 transition-colors">
                                        {org.name}
                                    </h3>
                                    <p className="text-gray-400">
                                        {org.issues} open issues
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-sm text-gray-400">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>Active this week</span>
                                </div>
                                <button className="text-yellow-400 hover:text-yellow-300 transition-colors">
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
