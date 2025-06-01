import React from "react";
import { Check } from "lucide-react";

// Pricing Section Component
const PricingSection = () => {
    const plans = [
        {
            name: "Free Explorer",
            price: "$0",
            period: "forever",
            description: "Perfect for getting started with GSoC contributions",
            features: [
                "Access to 49+ organizations",
                "99+ bookmarking options",
                "499+ issues to explore",
                "100 AI quries per month",
                "Basic support",
                "Community access",
            ],
            color: "border-gray-700",
            buttonColor: "bg-gray-700 hover:bg-gray-600",
            popular: false,
        },
        {
            name: "Pro Contributor",
            price: "$19",
            period: "per month",
            description: "Advanced features for serious GSoC participants",
            features: [
                "Access to 499+ organizations",
                "Unlimited bookmarking",
                "Unlimited issues to explore",
                "Unlimited AI queries",
                "Priority support",
                "Exclusive community access",
            ],
            color: "border-yellow-500 ring-4 ring-yellow-500/20",
            buttonColor:
                "bg-gradient-to-r from-yellow-500 to-orange-500 hover:shadow-lg hover:shadow-yellow-500/25",
            popular: true,
        },
    ];

    return (
        <section
            id="pricing"
            className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-black via-gray-900 to-gray-800"
        >
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                        Choose Your Plan
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Start free and upgrade when you&apos;re ready to
                        supercharge your GSoC journey.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={index}
                            className={`relative bg-gray-800/70 backdrop-blur-sm rounded-3xl p-8 border-2 ${plan.color} transition-all duration-300 hover:shadow-2xl hover:-translate-y-1`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                                    <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            <div className="text-center mb-8">
                                <h3 className="text-2xl font-bold text-white mb-2">
                                    {plan.name}
                                </h3>
                                <div className="flex items-baseline justify-center mb-2">
                                    <span className="text-5xl font-bold text-white">
                                        {plan.price}
                                    </span>
                                    <span className="text-gray-400 ml-2">
                                        /{plan.period}
                                    </span>
                                </div>
                                <p className="text-gray-400">
                                    {plan.description}
                                </p>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, featureIndex) => (
                                    <li
                                        key={featureIndex}
                                        className="flex items-start"
                                    >
                                        <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <span className="text-gray-300">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button
                                className={`w-full py-4 px-6 rounded-xl text-white font-semibold transition-all duration-300 transform hover:-translate-y-0.5 ${plan.buttonColor}`}
                            >
                                {plan.price === "$0"
                                    ? "Start Free"
                                    : "Start Pro Trial"}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
