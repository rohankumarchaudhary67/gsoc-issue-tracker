import IssuesComp from "@/components/issues";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";

export default async function IssuesPage() {

    const session = await getServerSession(authOptions);

    if (!session) {
        return {
            redirect: {
                destination: "/",
                permanent: false,
            },
        };
    }
    return (
        <>
            <div className="paddings">
                <IssuesComp session={session} />
            </div>
        </>
    );
}