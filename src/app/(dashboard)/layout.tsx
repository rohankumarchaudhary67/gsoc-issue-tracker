import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
                {/* Background Effects */}
                <div className="fixed inset-0 bg-gradient-to-r from-yellow-500/5 via-orange-500/5 to-red-500/5 pointer-events-none"></div>
                <div className="fixed top-20 left-20 w-72 h-72 bg-yellow-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse pointer-events-none"></div>
                <div className="fixed top-40 right-20 w-72 h-72 bg-orange-500/10 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse delay-1000 pointer-events-none"></div>
                <Sidebar>{children}</Sidebar>
            </div>
        </>
    );
}
