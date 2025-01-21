'use client';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { UsageSkeleton } from './skeleton';

export default function UsageComp({ session }: { session: any }) {
    const [usage, setUsage] = useState<any>();
    const [plan, setPlan] = useState<any>();
    const [loading, setLoading] = useState(true);

    const fetchUsage = async () => {
        setLoading(true);
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/usage/fetch`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );
        setUsage(res.data.data);
        setLoading(false);
        if (res.data.data.currentPlan === 'freeTrial') {
            setPlan('Free Trial (Basic Features)');
        } else if (res.data.data.currentPlan === 'premiumPlan') {
            setPlan('Premium Plan (Enhanced AI Assistant)');
        } else if (res.data.data.currentPlan === 'unlimitedPremium') {
            setPlan('Unlimited Premium Plan (All Features)');
        }
    };

    useEffect(() => {
        fetchUsage();
    }, []);

    return (
        <>
            {loading ? (
                <>
                    <div className='w-full'>
                    <UsageSkeleton />
                    </div>
                </>
            ) : (<div className="flex flex-col items-start justify-center gap-2 py-10">
                <h1 className="text-xl md:text-2xl font-semibold">{plan}</h1>
                <p>Your usage details and limits are displayed here.</p>
                <div className="flex flex-col gap-12 pt-12 w-full md:pl-4">
                    <div className="flex items-start justify-between gap-2 w-full">
                        <span className="text-xl md:text-2xl font-semibold w-full">
                            Open/View Issues Limit
                        </span>
                        <div className="flex flex-col items-start justify-start gap-2 w-full">
                            <span className="text-xl font-bold">
                                {usage?.currentOpenIssue} /{' '}
                                {usage?.openIssueLimit}
                            </span>
                            <Progress
                                value={
                                    (usage?.currentOpenIssue /
                                        usage?.openIssueLimit) *
                                    100
                                }
                                className="h-2 w-full"
                            />
                            {usage?.currentOpenIssue >=
                                usage?.openIssueLimit && (
                                    <span className="text-red-400">
                                        Upgrade plan to increase limit.
                                    </span>
                                )}
                        </div>
                    </div>

                    <div className="flex items-start justify-between gap-2 w-full">
                        <span className="text-xl md:text-2xl font-semibold w-full">
                            AI Question Limit
                        </span>
                        <div className="flex flex-col items-start justify-start gap-2 w-full">
                            <span className="text-xl">
                                {usage?.currentAiQuestion}/
                                {usage?.aiQuestionLimit}
                            </span>
                            <Progress
                                value={
                                    (usage?.currentAiQuestion /
                                        usage?.aiQuestionLimit) *
                                    100
                                }
                                className="h-2 w-full"
                            />
                            {usage?.currentAiQuestion >=
                                usage?.aiQuestionLimit && (
                                    <span className="text-red-400">
                                        Upgrade plan to increase limit.
                                    </span>
                                )}
                        </div>
                    </div>
                </div>
                <div className="w-full flex justify-end pt-12">
                    <Link href={'/upgrade'}>
                        <Button className="font-semibold">Upgrade Plan</Button>
                    </Link>
                </div>
            </div>)}
        </>
    );
}
