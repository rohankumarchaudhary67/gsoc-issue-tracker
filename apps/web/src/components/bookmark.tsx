import IssueCard from "./issues/issue-card";

export default function BookmarkComp() {
    return (
        <>
            <div className="flex flex-col items-start justify-center gap-2 py-6">
                <h1 className="text-xl md:text-2xl font-semibold">Bookmarked Issues</h1>
                <div className="w-full grid-cols-2 gap-4 md:grid pt-2"> 
                    <IssueCard />
                    <IssueCard />
                    <IssueCard />
                    <IssueCard />
                    <IssueCard />
                    <IssueCard />
                    <IssueCard />
                    <IssueCard />
                    <IssueCard />
                </div>
            </div>
        </>
    )
}