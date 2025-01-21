'use client';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MdDataUsage, MdBookmarkAdd } from 'react-icons/md';
import { TbPremiumRights } from 'react-icons/tb';
import LogoutBtn from './logout-btn';
import Link from 'next/link';

export default function ProfileBtn() {

    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                    <img
                        src="/logo/avatar.jpeg"
                        className="h-10 rounded-full"
                        alt=""
                    />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="min-w-48">
                    <DropdownMenuLabel className="text-yellow-400">
                        My Account
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link href="/usage">
                        <DropdownMenuItem className="font-semibold cursor-pointer">
                            <MdDataUsage />
                            Usage
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/bookmarks">
                        <DropdownMenuItem className="font-semibold cursor-pointer">
                            <MdBookmarkAdd />
                            Bookmarks
                        </DropdownMenuItem>
                    </Link>
                    <Link href="/upgrade">
                        <DropdownMenuItem className="font-semibold cursor-pointer">
                            <TbPremiumRights />
                            Upgrade Plan
                        </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <LogoutBtn />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
