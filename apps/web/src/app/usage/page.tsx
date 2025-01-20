import UsageComp from '@/components/usage';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function UsagePage() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        redirect('/issues');
    }

    return (
        <>
            <div className="paddings">
                <UsageComp session={session} />
            </div>
        </>
    );
}
