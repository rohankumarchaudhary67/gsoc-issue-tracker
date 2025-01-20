import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface IssueCardProps {
    issue: {
        id: string
        repository: string
        url: string
        number: number
        title: string
        state: string
        comments: number
        labels: string[]
        createdAt: string
    };
}

export default function IssueCard({ issue }: IssueCardProps) {
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-blue-400">{issue.repository}</span>
                        <span>{issue.comments} comments</span>
                    </div>
                    <Link href={`/issues/${issue.id}`}>
                        <CardTitle className="md:text-xl">{issue.title}</CardTitle>
                        <p className="text-muted-foreground">#{issue.number}</p>
                    </Link>
                    <div className="flex space-x-6 items-start justify-start">
                        <CardDescription>State : {issue.state}</CardDescription>
                        <CardDescription>Created At : {issue.createdAt}</CardDescription>
                    </div>
                </CardHeader>
                <CardFooter className="flex flex-wrap items-start justify-start">
                    {issue.labels.length != 0 ? (issue.labels.map((label: string, index: number) => (
                        <Badge key={index} variant={"outline"} className="rounded-full mx-1 my-1">{label}</Badge>
                    ))) : (
                        <div>
                            <p>No label found</p>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </>
    )
}