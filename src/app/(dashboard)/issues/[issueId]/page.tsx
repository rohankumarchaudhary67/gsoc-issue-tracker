import IssueIdComp from "@/components/dashboard/issues/issueId";

export default async function IssueIdPage({
    params,
}: {
    params: Promise<{ issueId: string }>;
}) {
    const { issueId } = await params;

    return (
        <>
            <IssueIdComp issueId={issueId} />
        </>
    );
}
