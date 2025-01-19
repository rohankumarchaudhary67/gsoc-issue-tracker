'use client';
import { useParams } from "next/navigation";
import IssueIdComp from "@/components/issues/issue-id-comp";

export default function IssueId() {
    const params = useParams(); 
    const { issueId } = params; 

    return (
        <div className="paddings">
            <IssueIdComp issueId={issueId} />
        </div>
    );
}
