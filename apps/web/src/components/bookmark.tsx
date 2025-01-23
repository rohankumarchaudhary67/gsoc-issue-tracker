'use client';
import IssueCard from './issues/issue-card';
import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import IssueType from '@/types/issue-type';
import { CardSkeleton } from './skeleton';
import { Session } from 'next-auth';

export default function BookmarkComp({ session }: { session: Session }) {
    const [issues, setIssues] = useState<IssueType[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBookmarks = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookmark/fetchAll`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );
            setIssues(res.data.data.issues);
            setLoading(false);
        } catch (error: unknown) {
            console.error('Error fetching bookmarks:', error);
            setLoading(false);
        }
    }, [session.accessToken]);

    useEffect(() => {
        fetchBookmarks();
    }, [session, fetchBookmarks]);

    return (
        <>
            <div className="flex flex-col items-start justify-center gap-2 py-6">
                <h1 className="text-xl md:text-2xl font-semibold">
                    Bookmarked Issues
                </h1>
                {loading ? (
                    <div className="w-full grid md:grid-cols-2 gap-4">
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                        <CardSkeleton />
                    </div>
                ) : (
                    <div className="w-full grid md:grid-cols-2 gap-4 md:grid pt-2">
                        {issues.length === 0 ? (
                            <>
                                <div>No Bookmarks Found</div>
                            </>
                        ) : (
                            <div>
                                {issues.map((issue, index) => {
                                    return (
                                        <IssueCard key={index} issue={issue} />
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </>
    );
}
