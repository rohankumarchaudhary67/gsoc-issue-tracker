import { Badge } from "@/components/ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { IoChatboxEllipsesSharp } from "react-icons/io5";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FaArrowRight, FaBookmark, FaRegBookmark } from "react-icons/fa";
import Link from "next/link";

export default function IssueId({ issueId }: { issueId: string | string[] | undefined }) {

    return (
        <>
            <div className="flex justify-between items-start space-x-4">
                <div className="pt-4 flex flex-col space-y-4 w-full">
                    <div className="flex items-center justify-between space-x-4">
                        <span className="text-xl text-blue-300 font-bold">Tensorflow</span>
                        <div className="flex space-x-4 items-center">
                            <span>No Assignee</span>
                            <span className="text-white text-sm px-4 py-1 border bg-blue-600 rounded-full">0 Comments</span>
                        </div>
                    </div>
                    <div className="flex items-center justify-between md:pr-2">
                        <div>
                            <h1 className="text-xl md:text-2xl font-semibold">Inplement OAuth2 Authentication Flow</h1>
                            <p className="text-gray-500">Open #2712</p>
                        </div>
                        <FaRegBookmark />
                    </div>
                    <p className="text-md font-light text-gray-200">We need to implement OAuth2 authentication flow for our application. This will allow users to authenticate with our application using their Google account. We need to implement OAuth2 authentication flow for our application. This will allow users to authenticate with our application using their Google account. We need to implement OAuth2 authentication flow for our application. This will allow users to authenticate with our application using their Google account. We need to implement OAuth2 authentication flow for our application. This will allow users to authenticate with our application using their Google account.</p>
                    <div className="flex flex-wrap items-start justify-start">
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
                    </div>
                    <Link href={`/issues/${issueId}`} target={"_blank"} className="flex items-center justify-start space-x-1 text-blue-400">
                        <span className="font-semibold">View on GitHub</span>
                        <FaArrowRight />
                    </Link>
                    <div className="flex items-center justify-end space-x-1">
                        <span className="text-gray-500">2025-01-17T17:26:20.447Z</span>
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