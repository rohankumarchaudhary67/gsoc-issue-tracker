import BookmarkComp from "@/components/bookmark";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";

export default async function BookmarksPage() {
    const session = await getServerSession(authOptions);
    return (
        <>
            <div className="paddings">
                <BookmarkComp session={session} />
            </div>
        </>
    )
}