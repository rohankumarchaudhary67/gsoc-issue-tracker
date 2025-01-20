'use client'
import IssueCard from "./issues/issue-card";
import { useEffect, useState } from "react";
import axios from 'axios';
import IssueType from "@/types/issue-type";

export default function BookmarkComp({session}: {session: any}) {

    const [issues, setIssues] = useState<IssueType[]>([]);

    const fetchBookmarks = async () => {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/bookmark/fetchAll`, {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${session.accessToken}`,
            },
        });
        setIssues(res.data.data.issues);
    }

    useEffect(() => {
        fetchBookmarks();
    }, []);

    return (
        <>
            <div className="flex flex-col items-start justify-center gap-2 py-6">
                <h1 className="text-xl md:text-2xl font-semibold">Bookmarked Issues</h1>
                <div className="w-full grid md:grid-cols-2 gap-4 md:grid pt-2"> 
                    {issues.map((issue, index)=>{
                        return <IssueCard key={index} issue={issue} />
                    })}
                </div>
            </div>
        </>
    )
}