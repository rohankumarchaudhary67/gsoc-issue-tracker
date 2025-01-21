'use client';
import { useParams } from 'next/navigation';
import IssueIdComp from '@/components/issues/issue-id-comp';
import { useSession } from 'next-auth/react';
import { IssueSkeleton } from '@/components/skeleton';

export default function IssueIdPage() {
    const params = useParams();
    const { issueId } = params;

    const { data: session, status } = useSession();

    if (status === 'loading') {
        return (
            <div className="paddings">
                <IssueSkeleton />
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="flex justify-center items-center h-[95vh]">
                Unauthenticated
            </div>
        );
    }

    return (
        <div className="paddings">
            <IssueIdComp issueId={issueId} session={session} />
        </div>
    );
}
