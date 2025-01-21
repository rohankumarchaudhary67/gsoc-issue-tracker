import BookmarkComp from '@/components/bookmark';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function BookmarksPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/issues');
    }

    return (
        <>
            <div className="paddings">
                <BookmarkComp session={session} />
            </div>
        </>
    );
}
