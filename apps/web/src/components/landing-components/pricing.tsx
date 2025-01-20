import React from 'react';

const PriceCard = ({ plan }: any) => (
    <div
        className={`flex flex-col overflow-hidden rounded-lg ${plan.featured ? 'border-2 border-indigo-500' : 'border'} ${plan.offset ? 'sm:mt-8' : ''}`}
    >
        {plan.featured ? (
            <div className="bg-indigo-500 py-2 text-center text-sm font-semibold uppercase tracking-widest text-white">
                Premium plan
            </div>
        ) : (
            <div className={`h-2 ${plan.accentColor}`}></div>
        )}

        <div className="flex flex-1 flex-col p-6 pt-8">
            <div className="mb-12">
                <div className="mb-2 text-center text-2xl font-bold text-black dark:text-white">
                    {plan.title}
                </div>
                <p className="mb-8 px-8 text-center text-gray-700 dark:text-gray-400">
                    {plan.description}
                </p>
                <div className="space-y-4">
                    {plan.features.map((feature: any, i: any) => (
                        <div key={i} className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 shrink-0"
                                fill="none"
                                viewBox="0 0 16 16"
                            >
                                <circle
                                    cx="8"
                                    cy="8"
                                    r="8"
                                    fill="currentColor"
                                    className={plan.dotColor}
                                />
                                <circle
                                    cx="8"
                                    cy="8"
                                    r="3"
                                    fill="currentColor"
                                    className="dark:text-black text-white"
                                />
                            </svg>
                            <span className="text-black dark:text-white">
                                {feature}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-auto">
                <a
                    href="#"
                    className={`block rounded-lg ${plan.buttonColor} px-8 py-3 text-center text-sm font-semibold ${plan.buttonTextColor} outline-none ring-indigo-300 transition duration-100 hover:${plan.buttonHoverColor} focus-visible:ring active:${plan.buttonActiveColor} md:text-base`}
                >
                    {plan.price}
                </a>
            </div>
        </div>
    </div>
);

export default function Pricing() {
    const plans = [
        {
            title: 'Free Trial',
            description: 'Get started with basic features',
            features: [
                'Open/View 400 issues per month',
                '20 AI Questions per month',
                'Basic issue recommendations',
                'Comunity support',
            ],
            price: '$0 / Free',
            accentColor: 'bg-pink-500',
            dotColor: 'text-pink-500',
            buttonColor: 'bg-pink-600',
            buttonHoverColor: 'bg-pink-800',
            buttonActiveColor: 'text-gray-700',
            buttonTextColor: 'text-white',
            offset: true,
        },
        {
            title: 'Premium Plan',
            description: 'Enhanced AI assistant',
            features: [
                'Open/view 1000 issues per month',
                '100 AI Questions per month',
                'Advanced issues Recommendation',
                'Community Support',
            ],
            price: '$5 / month',
            featured: true,
            dotColor: 'text-blue-600',
            buttonColor: 'bg-blue-500',
            buttonHoverColor: 'bg-blue-600',
            buttonActiveColor: 'bg-blue-700',
            buttonTextColor: 'text-white',
        },
        {
            title: 'Unlimited Premium',
            description: 'Full access of application',
            features: [
                'Open/view unlimited issues',
                '500 AI Questions per month',
                'Advanced issues Recommendation',
                'Community Support',
            ],
            price: '$15 / month',
            accentColor: 'bg-yellow-500',
            dotColor: 'text-yellow-500',
            buttonColor: 'bg-yellow-600',
            buttonHoverColor: 'bg-gray-700',
            buttonActiveColor: 'bg-gray-600',
            buttonTextColor: 'text-white',
            offset: true,
        },
    ];

    return (
        <div className="bg-background py-6 sm:py-8 lg:py-12">
            <div className="mx-auto max-w-screen-xl px-4 md:px-8">
                <h2 className="mb-4 text-center text-2xl font-bold text-primary md:mb-8 lg:text-3xl xl:mb-12">
                    Pricing
                </h2>
                <div className="mb-6 grid gap-6 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 lg:gap-8">
                    {plans.map((plan, index) => (
                        <PriceCard key={index} plan={plan} />
                    ))}
                </div>
            </div>
        </div>
    );
}
