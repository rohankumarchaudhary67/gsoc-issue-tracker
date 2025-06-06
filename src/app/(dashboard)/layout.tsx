import Sidebar from "@/components/dashboard/sidebar";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black text-white">
                <Sidebar>{children}</Sidebar>
            </div>
        </>
    );
}
