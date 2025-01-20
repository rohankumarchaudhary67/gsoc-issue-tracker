import IssuesComp from '@/components/issues';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';

export default async function IssuesPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/');
    }

    return (
        <>
            <div className="paddings">
                <IssuesComp session={session} />
            </div>
        </>
    );
}
