import { BsStars } from "react-icons/bs";
import { FaFilter, FaBookOpen, FaRobot, FaCode, FaChartLine } from "react-icons/fa";

export default function Features() {
    return (
        <>
            <div className="w-full flex flex-col justify-center items-center space-y-4">
                {/* First Row of Features */}
                <div className="flex justify-center items-center space-x-4">
                    <div className="border px-4 py-4 rounded-lg max-w-96 min-h-44 flex flex-col justify-start items-start space-y-2">
                        <span className="text-yellow-600 text-2xl"><BsStars /></span>
                        <span className="font-semibold text-xl">AI Powered Analysis</span>
                        <p className="text-blue-900 dark:text-blue-100">Get instant AI summaries of issues and personalized recommendations for your skill level.</p>
                    </div>
                    <div className="border px-4 py-4 rounded-lg max-w-96 min-h-44 flex flex-col justify-start items-start space-y-2">
                        <span className="text-yellow-600 text-2xl"><FaFilter /></span>
                        <span className="font-semibold text-xl">Smart Filtering</span>
                        <p className="text-blue-900 dark:text-blue-100">Find issues matching your experience level and technology preferences easily.</p>
                    </div>
                    <div className="border px-4 py-4 rounded-lg max-w-96 min-h-44 flex flex-col justify-start items-start space-y-2">
                        <span className="text-yellow-600 text-2xl"><FaBookOpen /></span>
                        <span className="font-semibold text-xl">Interactive Learning</span>
                        <p className="text-blue-900 dark:text-blue-100">Ask questions and get AI-powered guidance as you work on issues.</p>
                    </div>
                </div>

                {/* Second Row of Features */}
                <div className="flex justify-center items-center space-x-4">
                    <div className="border px-4 py-4 rounded-lg max-w-96 min-h-44 flex flex-col justify-start items-start space-y-2">
                        <span className="text-yellow-600 text-2xl"><FaRobot /></span>
                        <span className="font-semibold text-xl">Automated Assistance</span>
                        <p className="text-blue-900 dark:text-blue-100">Leverage AI to automate repetitive tasks and streamline workflows.</p>
                    </div>
                    <div className="border px-4 py-4 rounded-lg max-w-96 min-h-44 flex flex-col justify-start items-start space-y-2">
                        <span className="text-yellow-600 text-2xl"><FaCode /></span>
                        <span className="font-semibold text-xl">Code Optimization</span>
                        <p className="text-blue-900 dark:text-blue-100">Get suggestions for cleaner and more efficient code as you work.</p>
                    </div>
                    <div className="border px-4 py-4 rounded-lg max-w-96 min-h-44 flex flex-col justify-start items-start space-y-2">
                        <span className="text-yellow-600 text-2xl"><FaChartLine /></span>
                        <span className="font-semibold text-xl">Progress Tracking</span>
                        <p className="text-blue-900 dark:text-blue-100">Track your progress and milestones with real-time analytics.</p>
                    </div>
                </div>
            </div>
        </>
    );
}
