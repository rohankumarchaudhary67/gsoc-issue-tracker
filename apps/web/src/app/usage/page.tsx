import UsageComp from "@/components/usage";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function UsagePage() {
    const session = await getServerSession(authOptions);
    return (
        <>
            <div className="paddings">
                <UsageComp session={session} />
            </div>
        </>
    )
}