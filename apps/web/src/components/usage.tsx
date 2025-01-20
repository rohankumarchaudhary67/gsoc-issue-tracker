import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function UsageComp() {
    return (
        <>
            <div className="flex flex-col items-start justify-center gap-2 py-10">
                <h1 className="text-xl md:text-2xl font-semibold">Free Trial (Basic Features)</h1>
                <p>Your usage details and limits are displayed here.</p>
                <div className="flex flex-col gap-6 py-6 w-full md:pl-4">
                    <div className="flex items-start justify-between gap-2 w-full">
                        <span className="text-lg font-semibold w-full">
                            Open/View Issues Limit
                        </span>
                        <div className="flex flex-col items-start justify-start gap-2 w-full">
                            <span>123/400</span>
                            <Progress
                                value={30}
                                className="h-2 w-full"
                            />
                        </div>
                    </div>

                    <div className="flex items-start justify-between gap-2 w-full">
                        <span className="text-lg font-semibold w-full">
                            AI Question Limit
                        </span>
                        <div className="flex flex-col items-start justify-start gap-2 w-full">
                            <span className="text-blue-400">20/20</span>
                            <Progress
                                value={100}
                                className="h-2 w-full"
                            />
                            <span className="text-red-400">Upgrade plan to increase limit.</span>
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end pt-4">
                <Link href={"/upgrade"}><Button>Upgrade Plan</Button></Link>
                </div>
            </div>
        </>
    )
}