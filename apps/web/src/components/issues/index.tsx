'use client';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import IssueCard from './issue-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useEffect, useState } from 'react';
import axios from 'axios';
import IssueType from '@/types/issue-type';
import repoList from '@/data/repo-list';
import PaginationDemo from '../pagination';

export default function IssuesComp({ session }: { session: any }) {
    const [issues, setIssues] = useState<IssueType[]>([]);

    const fetchAll = async () => {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/issue/fetchAll?page=1&limit=10`,
            {
                withCredentials: true,
                headers: {
                    Authorization: `Bearer ${session.accessToken}`,
                },
            }
        );

        setIssues(res.data.data.issues);
    };

    useEffect(() => {
        fetchAll();
    }, []);

    return (
        <>
            <div className="pt-4">
                <div className="flex items-center justify-between space-x-4 pb-4 w-full">
                    <div className="w-full">
                        <Input placeholder="Search Issues" />
                    </div>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Organization" />
                        </SelectTrigger>
                        <SelectContent>
                            {repoList.map((repo, index) => {
                                return (
                                    <SelectItem value={repo} key={index}>
                                        {repo}
                                    </SelectItem>
                                );
                            })}
                        </SelectContent>
                    </Select>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder="All Difficulties" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="light">Beginner</SelectItem>
                            <SelectItem value="dark">Intermediate</SelectItem>
                            <SelectItem value="system">Advanced</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex justify-between items-start space-x-4 pt-4 p-2 w-full">
                    <div className="w-full flex flex-col justify-start items-start space-y-4">
                        <div className="flex justify-between items-center w-full">
                            <h1 className="font-bold text-xl md:text-2xl">
                                Avilable Issues
                            </h1>
                            <div>
                                <PaginationDemo />
                            </div>
                        </div>
                        <div className="w-full">
                            <ScrollArea className="w-full h-[75vh] overflow-y-auto">
                                <div className="w-full flex flex-col items-start justify-start space-y-4">
                                    {issues.map((issue, index) => {
                                        return (
                                            <IssueCard
                                                key={index}
                                                issue={issue}
                                            />
                                        );
                                    })}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
