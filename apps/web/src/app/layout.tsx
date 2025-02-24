import type { Metadata } from 'next';
import '@/styles/globals.css';
import { ThemeProvider } from '@/providers/theme-provider';
import { Session_Provider } from '@/providers/session-provider';
import Navbar from '@/components/navbar';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
    title: 'Issue Scout | Discover Perfect Open Source Issues',
    icons: {
        icon: '/logo/logo.png',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Session_Provider>
                        <Navbar />
                        <div className="pt-16">{children}</div>
                        <Toaster richColors />
                    </Session_Provider>
                </ThemeProvider>
            </body>
        </html>
    );
}
