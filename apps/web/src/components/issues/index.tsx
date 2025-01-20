'use client'
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { Button } from "../ui/button";
import IssueCard from "./issue-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import axios from "axios";

interface IssueCardProps {
    id: string
        repository: string
        url: string
        number: number
        title: string
        state: string
        comments: number
        labels: string[]
        createdAt: string
}

export default function IssuesComp({session}: {session: any}) {

    const [issues, setIssues] = useState<IssueCardProps[]>([]);

    const fetchAll = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/issue/fetchAll`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
        
        setIssues(res.data.data.issues);
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <>
            <div className="pt-4">
                <div className="flex items-center justify-between space-x-4 pb-4">
                    <div className="w-full">
                        <Input placeholder="Search Issues" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Organization" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Difficulties" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-between items-start space-x-4 pt-4 p-2">
                    <div className="w-full flex flex-col justify-start items-start space-y-4">
                        <div>
                            <h1 className="font-bold text-xl md:text-2xl">Avilable Issues</h1>
                        </div>
                        <div className="w-full">
                            <ScrollArea className="w-full h-[75vh] overflow-y-auto">
                                <div className="w-full flex flex-col items-start justify-start space-y-4">
                                    {issues.map((issue, index)=>{
                                        return <IssueCard key={index} issue={issue} />
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    <div>
                        <Card className="max-w-xl">
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
                                <div className="border-t pt-2">
                                    <ScrollArea className="h-[40vh] overflow-y-auto">
                                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quidem enim quasi, fugiat temporibus perspiciatis repellendus rem saepe facere tempore molestias asperiores eveniet, molestiae adipisci. Explicabo, ducimus nam? Quis consectetur magnam labore accusantium quos adipisci alias cumque et a eligendi voluptates, odit suscipit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quidem enim quasi, fugiat temporibus perspiciatis repellendus rem saepe facere tempore molestias asperiores eveniet, molestiae adipisci. Explicabo, ducimus nam? Quis consectetur magnam labore accusantium quos adipisci alias cumque et a eligendi voluptates, odit suscipit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui quidem enim quasi, fugiat temporibus perspiciatis repellendus rem saepe facere tempore molestias asperiores eveniet, molestiae adipisci. Explicabo, ducimus nam? Quis consectetur magnam labore accusantium quos adipisci alias cumque et a eligendi voluptates, odit suscipit!</p>
                                    </ScrollArea>
                                </div>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    );
}