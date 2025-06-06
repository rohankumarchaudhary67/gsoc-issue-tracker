import IssueIdComp from "@/components/dashboard/issues/issueId";

export default function IssueIdPage({
    params,
}: {
    params: { issueId: string };
}) {
    return (
        <>
            <IssueIdComp issueId={params.issueId} />
        </>
    );
}
