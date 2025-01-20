import {
    Header,
    Footer,
    Pricing,
    Statics,
    Features,
} from '@/components/landing-components';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Home() {
    const session = await getServerSession(authOptions);

    if (session?.user) {
        redirect('/issues');
    }

    return (
        <>
            <div className="pt-16">
                <Header />
                <Features />
                <Statics />
                <Pricing />
                <Footer />
            </div>
        </>
    );
}
