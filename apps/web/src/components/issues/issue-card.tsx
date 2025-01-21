import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import IssueArrayType from '@/types';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default function IssueCard({ issue }: IssueArrayType) {
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <span className="font-semibold text-secondary">
                            {issue.repository}
                        </span>
                        <span>{issue.comments} comments</span>
                    </div>
                    <Link
                        href={`/issues/${issue.id}`}
                        className="cursor-pointer"
                    >
                        <CardTitle className="md:text-xl">
                            {issue.title}
                        </CardTitle>
                        <p className="text-muted-foreground">#{issue.number}</p>
                    </Link>
                    <div className="flex space-x-6 items-start justify-start">
                        <CardDescription>State : {issue.state}</CardDescription>
                        <CardDescription>
                            Created At : {issue.createdAt}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardFooter className="flex flex-wrap items-start justify-start">
                    {issue.labels.length != 0 ? (
                        issue.labels.map((label: string, index: number) => (
                            <Badge
                                key={index}
                                variant={'default'}
                                className="rounded-full mx-1 my-1"
                            >
                                {label}
                            </Badge>
                        ))
                    ) : (
                        <div>
                            <p>No label found</p>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </>
    );
}
