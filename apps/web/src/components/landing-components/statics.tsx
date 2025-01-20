export default function Statics() {
    const stats = [
        { value: "1500+", label: "Issues" },
        { value: "200+", label: "Repositories" },
        { value: "120+", label: "Organizations" },
        { value: "∞", label: "Bookmarks" },
    ];

    return (
        <div className="bg-white dark:bg-background pt-24 py-12">
            <div className="mx-auto max-w-screen-lg px-4 md:px-8">
                <div className="mb-8 md:mb-12 text-center">
                    <h2 className="mb-4 text-2xl font-bold text-primary md:mb-6 lg:text-3xl">
                        Empowering Open Source Collaboration
                    </h2>
                    <p className="mx-auto max-w-screen-md text-gray-700 dark:text-gray-400 md:text-lg">
                        Discover and contribute to impactful open-source projects with insights into thousands of issues, repositories, and organizations. Designed to support GSOC contributors and open-source enthusiasts.
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6 rounded-lg p-6 md:grid-cols-4 md:gap-8 md:p-8">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <div className="text-xl font-bold text-secondary sm:text-2xl md:text-3xl">
                                {stat.value}
                            </div>
                            <div className="text-sm text-gray-900 dark:text-gray-200 sm:text-base">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
