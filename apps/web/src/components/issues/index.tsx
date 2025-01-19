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

export default function IssuesComp() {
    return (
        <>
            <div className="pt-4">
                <div className="flex items-center justify-between space-x-4 border-b pb-4">
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

                <div className="flex justify-between items-start space-x-4 pt-8 p-2">
                    <div className="w-full flex flex-col justify-start items-start space-y-4">
                        <div>
                            <h1 className="font-bold text-xl md:text-2xl">Avilable Issues</h1>
                        </div>
                        <div className="w-full flex flex-col space-y-4 items-start justify-start space-y-4">
                            <IssueCard />
                            <IssueCard />
                            <IssueCard />
                        </div>
                    </div>

                    <div className="border-2 p-4 rounded-lg flex flex-col space-y-2 items-start justify-start max-w-lg">
                        <div className="flex items-start justify-start space-x-2">
                            <span className="text-xl"><IoChatboxEllipsesSharp /></span>
                            <span className="text-xl font-bold">AI Assistant</span>
                        </div>
                        <p className="font-light text-gray-400">Ask AI Assistant to help you with your issues and get AI-powered guidance</p>
                        <div className="flex flex-col space-y-4 items-start justify-center w-full">
                            <Input placeholder="Ask AI Assistant" />
                            <Button className="w-full font-bold">Ask AI Assistant</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}