import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MdDataUsage, MdBookmarkAdd } from "react-icons/md";
import { TbPremiumRights } from "react-icons/tb";
import LogoutBtn from "./logout-btn";

export default function ProfileBtn() {
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <img src="/logo/avatar.jpeg" className="h-10 rounded-full" alt="" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-48">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="font-semibold"><MdDataUsage />Usage</DropdownMenuItem>
                    <DropdownMenuItem className="font-semibold"><MdBookmarkAdd />Bookmark</DropdownMenuItem>
                    <DropdownMenuItem className="font-semibold"><TbPremiumRights />Upgrade Plan</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <LogoutBtn />
                </DropdownMenuContent>
            </DropdownMenu>

        </>
    )
}