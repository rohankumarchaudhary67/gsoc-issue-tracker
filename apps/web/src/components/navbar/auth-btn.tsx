'use client';
import { signIn } from 'next-auth/react';
import { Button } from '../ui/button';
import { FaGithub } from 'react-icons/fa6';
import { toast } from 'sonner';

export default function AuthBtn() {
    const handleLogin = async () => {
        toast.loading('Logging in...');
        await signIn('github');
    };

    return (
        <Button
            onClick={handleLogin}
            className="flex items-center gap-2 font-bold"
        >
            Login with <FaGithub /> GitHub
        </Button>
    );
}
