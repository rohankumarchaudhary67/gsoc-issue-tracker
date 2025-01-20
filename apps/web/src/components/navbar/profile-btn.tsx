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
import { redirect } from 'next/navigation';

export default function ProfileBtn() {
    const redirectUsage = async () => {
        redirect('/usage');
    };

    const redirectBookmarks = async () => {
        redirect('/bookmarks');
    };

    const redirectUpgrade = async () => {
        redirect('/upgrade');
    };

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
                    <div onClick={redirectUsage}>
                        <DropdownMenuItem className="font-semibold cursor-pointer">
                            <MdDataUsage />
                            Usage
                        </DropdownMenuItem>
                    </div>
                    <div onClick={redirectBookmarks}>
                        <DropdownMenuItem className="font-semibold cursor-pointer">
                            <MdBookmarkAdd />
                            Bookmarks
                        </DropdownMenuItem>
                    </div>
                    <div onClick={redirectUpgrade}>
                        <DropdownMenuItem className="font-semibold cursor-pointer">
                            <TbPremiumRights />
                            Upgrade Plan
                        </DropdownMenuItem>
                    </div>
                    <DropdownMenuSeparator />
                    <LogoutBtn />
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}
