'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { signOut } from 'next-auth/react';
import { MdLogout } from 'react-icons/md';
import { toast } from 'sonner';

export default function LogoutBtn() {
    const handleLogout = async () => {
        const loadId = toast.loading('Logging out...');
        try {
            await signOut();
            toast.dismiss(loadId);
        } catch (error: any) {
            toast.dismiss(loadId);
            toast.error('Oops, something went wrong while logging out.');
        }
    };

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <div className="relative flex select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:text-red-700 cursor-pointer font-semibold">
                    <MdLogout />
                    Logout
                </div>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>
                        Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. You will need to log in
                        again to access your account.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        className="bg-red-700 hover:bg-red-800 text-white"
                        onClick={handleLogout}
                    >
                        Logout
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
