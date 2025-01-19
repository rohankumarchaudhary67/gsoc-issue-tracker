import { Button } from "../ui/button";

export default function Header() {
    return (
        <>
            <div className="flex justify-center items-center">
                <div className="pb-24">
                    <p className="text-center text-4xl sm:text-7xl font-bold z-20 bg-clip-text text-transparent bg-gradient-to-b from-blue-900 to-blue-600 py-8">
                        Discover Perfect <br /> Open Source Issues
                    </p>
                    <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-700 dark:text-neutral-400 text-center">
                        Find beginner-friendly issues and contribute to open source with AI-powered guidance
                    </p>
                    <div className="w-full flex justify-center items-center space-x-4 p-4">
                        <Button variant={"customPrimary"} className="md:min-w-32">Login Now</Button>
                        <Button variant={"customPrimary"} className="md:min-w-32">Explore Now</Button>
                    </div>
                </div>
            </div>
        </>
    )
}