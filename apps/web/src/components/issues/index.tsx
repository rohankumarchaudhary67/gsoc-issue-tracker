'use client';

import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import IssueCard from './issue-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { CardSkeleton } from '@/components/skeleton';
import IssueType from '@/types/issue-type';
import { toast } from 'sonner';
import { Session } from 'next-auth';

export default function IssuesComp({ session }: { session: Session }) {
    const [issues, setIssues] = useState<IssueType[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        try {
            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/issue/fetchAll`,
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${session.accessToken}`,
                    },
                }
            );
            setIssues(res.data.data.issues);
        } catch (error: unknown) {
            console.error('Failed to fetch issues:', error);
            toast.error('Oops, something went wrong while fetching issues.');
        } finally {
            setLoading(false);
        }
    }, [session.accessToken]);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    return (
        <div className="pt-4">
            <div className="flex justify-between items-start space-x-4 pt-4 p-2 w-full">
                <div className="w-full flex flex-col justify-start items-start space-y-4">
                    <div className="flex justify-between items-center w-full">
                        <h1 className="font-bold text-xl md:text-2xl">
                            Available Issues
                        </h1>
                    </div>
                    <div className="w-full">
                        <ScrollArea className="w-full h-[100vh] overflow-y-auto">
                            <div className="w-full grid md:grid-cols-2 gap-4">
                                {loading
                                    ? Array.from({ length: 6 }).map(
                                          (_, index) => (
                                              <CardSkeleton key={index} />
                                          )
                                      )
                                    : issues.map((issue) => (
                                          <IssueCard
                                              key={issue.id}
                                              issue={issue}
                                          />
                                      ))}
                            </div>
                        </ScrollArea>
                    </div>
                </div>
            </div>
        </div>
    );
}
