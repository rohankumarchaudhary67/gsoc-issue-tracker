import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"


export default function IssueCard() {
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle className="md:text-xl">Implement OAuth2 Authentication Flow</CardTitle>
                    <div className="flex space-x-6 items-start justify-start">
                        <CardDescription>Python</CardDescription>
                        <CardDescription>Tensforlow</CardDescription>
                        <CardDescription>3/10/2024</CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-stone-100">We need to implement OAuth2 authentication flow for our application. This will allow users to authenticate with our application using their Google account.</p>
                </CardContent>
                <CardFooter className="flex flex-wrap items-start justify-start">
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">authentication</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">good first issue</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                    <Badge variant={"outline"} className="rounded-full mx-1 my-1">help wanted</Badge>
                </CardFooter>
            </Card>
        </>
    )
}