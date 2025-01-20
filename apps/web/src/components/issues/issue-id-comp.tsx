'use client'
import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { FaArrowRight, FaBookmark, FaRegBookmark } from "react-icons/fa";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from 'axios';
import IssueType from "@/types/issue-type";


export default function IssueId({ issueId, session }: { issueId: string | string[] | undefined, session: any }) {

    const [issue, setIssue] = useState<IssueType>();
    const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

    const fetchIssue = async () => {

        const accessToken = await session?.accessToken;
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/issue/fetch`, {
            id: issueId,
        }, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        setIssue(res.data.data);
        setIsBookmarked(res.data.data.isBookmarked);
    };

    const toggleBookmark = async () => {
        setIsBookmarked(!isBookmarked);
        const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookmark/toggleBookmark`, {
            id: issueId
        }, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${session?.accessToken}`,
            },
        });
        setIsBookmarked(res.data.message === "Bookmark added successfully");
    };

    useEffect(() => {
        fetchIssue();
    }, []);

    return (
        <>
            <div className="flex justify-between items-start space-x-4">
                <div className="pt-4 flex flex-col space-y-4 w-full">
                    <div className="flex items-center justify-between space-x-4">
                        <span className="text-xl text-blue-300 font-bold">{issue?.repository}</span>
                        <div className="flex space-x-4 items-center">
                            <span>No Assignee</span>
                            <span className="text-white text-sm px-4 py-1 border bg-blue-600 rounded-full">{issue?.comments} Comments</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between md:pr-2">
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold">{issue?.title}</h1>
                            <p className="text-gray-500">Open #{issue?.number}</p>
                        </div>
                        <div onClick={toggleBookmark} className="cursor-pointer">
                            {isBookmarked ? <FaBookmark /> : <FaRegBookmark />}
                        </div>
                    </div>
                    <div className="flex flex-wrap items-start justify-start">
                        {issue?.labels.length != 0 ? (issue?.labels.map((label: string, index: number) => (
                            <Badge key={index} variant={"outline"} className="rounded-full mx-1 my-1">{label}</Badge>
                        ))) : (
                            <div>
                                <p>No label found</p>
                            </div>
                        )}
                    </div>
                    <Link href={issue?.url || ""} target={"_blank"} className="flex items-center justify-start space-x-1 text-blue-400">
                        <span className="font-semibold">View on GitHub</span>
                        <FaArrowRight />
                    </Link>
                    <div className="flex items-center justify-end space-x-1">
                        <span className="text-gray-500">{issue?.createdAt}</span>
                    </div>
                </div>
                <div>
                    <Card className="max-w-2xl mt-4">
                        <CardHeader>
                            <div className="flex items-center justify-start space-x-2 text-xl font-semibold">
                                <IoChatboxEllipsesSharp />
                                <span>AI Assistant</span>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-gray-400">Ask AI Assistant to help you with your issues and get AI-powered guidance</p>
                        </CardContent>
                        <CardFooter className="flex flex-wrap items-start justify-start space-y-6">
                            <Input placeholder="Ask AI Assistant" />
                            <Button className="w-full font-bold">Ask AI Assistant</Button>
                            {/* <div className="border-t pt-2">
                                <ScrollArea className="h-[40vh] overflow-y-auto">
                                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quidem enim quasi, fugiat temporibus perspiciatis repellendus rem saepe facere tempore molestias asperiores eveniet, molestiae adipisci. Explicabo, ducimus nam? Quis consectetur magnam labore accusantium quos adipisci alias cumque et a eligendi voluptates, odit suscipit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quidem enim quasi, fugiat temporibus perspiciatis repellendus rem saepe facere tempore molestias asperiores eveniet, molestiae adipisci. Explicabo, ducimus nam? Quis consectetur magnam labore accusantium quos adipisci alias cumque et a eligendi voluptates, odit suscipit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quidem enim quasi, fugiat temporibus perspiciatis repellendus rem saepe facere tempore molestias asperiores eveniet, molestiae adipisci. Explicabo, ducimus nam? Quis consectetur magnam labore accusantium quos adipisci alias cumque et a eligendi voluptates, odit suscipit!</p>
                                </ScrollArea>
                            </div> */}
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </>
    );
}