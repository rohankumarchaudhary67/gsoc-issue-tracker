import React from "react";
import { Github } from "lucide-react";
import { Bot, Filter, Search, Users, Zap } from "lucide-react";

// Features Section Component
const FeaturesSection = () => {
    const features = [
        {
            icon: <Github className="w-8 h-8" />,
            title: "GSoC Organization Focus",
            description:
                "Access issues exclusively from organizations participating in Google Summer of Code programs.",
            color: "from-blue-500 to-blue-600",
        },
        {
            icon: <Filter className="w-8 h-8" />,
            title: "Smart Filtering",
            description:
                "Filter issues by programming language, difficulty level, project type, and organization size.",
            color: "from-green-500 to-green-600",
        },
        {
            icon: <Bot className="w-8 h-8" />,
            title: "AI Assistant",
            description:
                "Get personalized issue recommendations and coding assistance powered by advanced AI.",
            color: "from-purple-500 to-purple-600",
        },
        {
            icon: <Search className="w-8 h-8" />,
            title: "Advanced Search",
            description:
                "Find issues using natural language queries and semantic search capabilities.",
            color: "from-yellow-500 to-orange-500",
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Community Driven",
            description:
                "Connect with other GSoC contributors and mentors in our growing community.",
            color: "from-pink-500 to-red-500",
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Real-time Updates",
            description:
                "Get instant notifications when new issues matching your criteria are available.",
            color: "from-indigo-500 to-indigo-600",
        },
    ];

    return (
        <section
            id="features"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-900"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Powerful Features for GSoC Success
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Everything you need to find, understand, and contribute
                        to open source projects during GSoC.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-2xl bg-gray-800/50 border border-gray-700/50 hover:border-gray-600 hover:bg-gray-800/70 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 backdrop-blur-sm"
                        >
                            <div
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                            >
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-4 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
