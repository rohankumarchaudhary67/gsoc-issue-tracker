import { ModeToggle } from '../toggle-mode';
import AuthBtn from './auth-btn';
import Link from 'next/link';
import ProfileBtn from './profile-btn';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Image from 'next/image';

export default async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <>
            <div className="fixed h-16 border-b flex  backdrop-blur-lg justify-center items-center w-full z-50">
                <div className="h-8 w-full paddings flex justify-between items-center">
                    <Link href={'/'}>
                        <div className="flex justify-center items-center space-x-3">
                            <Image
                                src="/logo/logo.png"
                                className="h-10"
                                alt=""
                                width={45}
                                height={100}
                            />
                            <span className="font-bold text-xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-t from-yellow-400 to-yellow-800">
                                Issue-Scout
                            </span>
                        </div>
                    </Link>
                    <div className="flex justify-center items-center space-x-4">
                        <ModeToggle />
                        {session?.user ? <ProfileBtn /> : <AuthBtn />}
                    </div>
                </div>
            </div>
        </>
    );
}
