'use client';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/components/ui/card';
import { IoChatboxEllipsesSharp } from 'react-icons/io5';
import { Input } from '@/components/ui/input';
import { FaArrowRight, FaBookmark, FaRegBookmark } from 'react-icons/fa';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import axios, { AxiosError } from 'axios';
import IssueType from '@/types/issue-type';
import { AiSkeleton, IssueSkeleton } from '../skeleton';
import { toast } from 'sonner';
import { redirect } from 'next/navigation';
import { Session } from 'next-auth';

export default function IssueId({
    issueId,
    session,
}: {
    issueId: string | string[] | undefined;
    session: Session | null;
}) {
    const [issue, setIssue] = useState<IssueType>();
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
    const [question, setQuestion] = useState<string>('');
    const [AiQuestionAsked, setAiQuestionAsked] = useState<string>('');
    const [aiLoading, setAiLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchIssue = useCallback(async () => {
        setLoading(true);
        try {
            const accessToken = await session?.accessToken;
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/issue/fetch`,
                {
                    id: issueId,
                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                }
            );
            console.log(res.data.data);
            setIssue(res.data.data);
            setIsBookmarked(res.data.data.isBookmarked);
            setLoading(false);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (
                    error.response?.data?.message == 'free trial limit reached'
                ) {
                    toast.error('Oops, you have reached the free trial limit');
                    redirect('/upgrade');
                }
            }
        }
    }, [issueId, session?.accessToken]);

    const toggleBookmark = async () => {
        if (!isBookmarked) {
            toast.success('Bookmark added');
        } else {
            toast.error('Bookmark removed');
        }
        setIsBookmarked(!isBookmarked);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookmark/toggleBookmark`,
                {
                    id: issueId,
                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );
            setIsBookmarked(res.data.message === 'Bookmark added successfully');
        } catch (error: unknown) {
            console.error('Error toggling bookmark:', error);
            toast.error('Oops, something went wrong while toggling bookmark');
        }
    };

    const askAiQuestion = async () => {
        setQuestion('');
        setAiQuestionAsked('');
        setAiLoading(true);
        try {
            const res = await axios.post(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/ai-question/askWithIssue`,
                {
                    question: question,
                    issueId: issueId,
                },
                {
                    withCredentials: true,
                    headers: {
                        Authorization: `Bearer ${session?.accessToken}`,
                    },
                }
            );
            setAiQuestionAsked(res.data.data);
            setAiLoading(false);
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
                if (error.response?.data?.data === 'freeTrial limit reached') {
                    toast.error('Oops, you have reached the free trial limit');
                    redirect('/upgrade');
                }
            }
            setAiLoading(false);
            toast.error('Oops, something went wrong while asking AI Assistant');
        }
    };

    useEffect(() => {
        fetchIssue();
    }, [issueId, fetchIssue]);

    return (
        <>
            {loading ? (
                <IssueSkeleton />
            ) : (
                <div className="flex flex-col justify-center items-start">
                    <div className="pt-4 flex flex-col space-y-4 w-full">
                        <div className="flex items-center justify-between space-x-4">
                            <span className="text-xl text-secondary font-bold">
                                {issue?.repository}
                            </span>
                            <div className="flex space-x-4 items-center">
                                <span>No Assignee</span>
                                <span className="text-sm px-4 py-1 border font-bold rounded-full bg-slate-100 dark:bg-slate-900 ">
                                    {issue?.comments} Comments
                                </span>
                            </div>
                        </div>
                        <div className="flex items-center justify-between md:pr-2">
                            <div>
                                <h1 className="text-2xl md:text-3xl font-semibold">
                                    {issue?.title}
                                </h1>
                                <p className="text-gray-500">
                                    Open #{issue?.number}
                                </p>
                            </div>
                            <div
                                onClick={toggleBookmark}
                                className="cursor-pointer"
                            >
                                {isBookmarked ? (
                                    <FaBookmark />
                                ) : (
                                    <FaRegBookmark />
                                )}
                            </div>
                        </div>
                        <div className="flex flex-wrap items-start justify-start">
                            {issue?.labels.length != 0 ? (
                                issue?.labels.map(
                                    (label: string, index: number) => (
                                        <Badge
                                            key={index}
                                            variant={'default'}
                                            className="rounded-full mx-1 my-1"
                                        >
                                            {label}
                                        </Badge>
                                    )
                                )
                            ) : (
                                <div>
                                    <p>No label found</p>
                                </div>
                            )}
                        </div>
                        <Link
                            href={issue?.url || ''}
                            target={'_blank'}
                            className="flex items-center w-fit justify-start space-x-1 hover:text-secondary"
                        >
                            <span className="font-semibold">
                                View on GitHub
                            </span>
                            <FaArrowRight />
                        </Link>
                        <div className="flex items-center justify-end space-x-1">
                            <span className="text-gray-500">
                                {issue?.createdAt}
                            </span>
                        </div>
                    </div>
                    <div className="w-full">
                        <Card className="w-full mt-8">
                            <CardHeader>
                                <div className="flex items-center justify-start space-x-2 text-xl font-semibold">
                                    <IoChatboxEllipsesSharp />
                                    <span>AI Assistant</span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-gray-400">
                                    Ask AI Assistant to help you with your
                                    issues and get AI-powered guidance
                                </p>
                            </CardContent>
                            <CardFooter className="flex flex-wrap items-start justify-start space-y-4">
                                <div className="w-full flex flex-col space-y-2">
                                    <div className="flex items-start justify-start w-full space-x-4">
                                        <Input
                                            onChange={(e) => {
                                                setQuestion(e.target.value);
                                            }}
                                            value={question}
                                            placeholder="Ask AI Assistant"
                                            className="w-full"
                                        />
                                        <Button
                                            onClick={() => {
                                                askAiQuestion();
                                            }}
                                            className="font-bold bg-secondary text-white dark:text-black"
                                        >
                                            Ask to AI Assistant
                                        </Button>
                                    </div>
                                    <div className="flex flex-wrap space-x-2">
                                        <Badge
                                            variant={'outline'}
                                            onClick={() => {
                                                setQuestion('Give the summary');
                                            }}
                                            className="cursor-pointer hover:bg-gray-800 rounded-md px-4 py-2"
                                        >
                                            Give the summary
                                        </Badge>
                                        <Badge
                                            variant={'outline'}
                                            onClick={() => {
                                                setQuestion(
                                                    'How to solve that issue'
                                                );
                                            }}
                                            className="cursor-pointer hover:bg-gray-800 rounded-md px-4 py-2"
                                        >
                                            How to solve that issue
                                        </Badge>
                                        <Badge
                                            variant={'outline'}
                                            onClick={() => {
                                                setQuestion(
                                                    'Is this Good first issue'
                                                );
                                            }}
                                            className="cursor-pointer hover:bg-gray-800 rounded-md px-4 py-2"
                                        >
                                            Is this Good first issue
                                        </Badge>
                                        <Badge
                                            variant={'outline'}
                                            onClick={() => {
                                                setQuestion(
                                                    'Intermediate Issue v/s Advanced Issue'
                                                );
                                            }}
                                            className="cursor-pointer hover:bg-gray-800 rounded-md px-4 py-2"
                                        >
                                            Intermediate Issue v/s Advanced
                                            Issue
                                        </Badge>
                                    </div>
                                </div>
                                <div className="border-t pt-2 w-full ">
                                    {AiQuestionAsked != '' ? (
                                        <div>
                                            <p>{AiQuestionAsked}</p>
                                        </div>
                                    ) : (
                                        <div>{aiLoading && <AiSkeleton />}</div>
                                    )}
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            )}
        </>
    );
}
