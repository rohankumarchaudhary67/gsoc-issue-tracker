import {
    Menu,
    Bell,
    Settings,
    Crown,
    Github,
    HelpCircle,
    LogOut,
    Check,
    Clock,
    AlertCircle,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

interface NotificationItem {
    id: string;
    title: string;
    message: string;
    time: string;
    type: "info" | "success" | "warning";
    read: boolean;
}

export default function Navbar({
    activeTab,
    setSidebarOpen,
}: {
    activeTab: string;
    setSidebarOpen: (open: boolean) => void;
}) {
    const session = useSession();
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const userDropdownRef = useRef<HTMLDivElement>(null);
    const notificationRef = useRef<HTMLDivElement>(null);

    // Sample notifications data
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);

    const unreadCount = notifications.filter((n) => !n.read).length;

    // Close dropdowns when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                userDropdownRef.current &&
                !userDropdownRef.current.contains(event.target as Node)
            ) {
                setShowUserDropdown(false);
            }
            if (
                notificationRef.current &&
                !notificationRef.current.contains(event.target as Node)
            ) {
                setShowNotifications(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((notif) =>
                notif.id === id ? { ...notif, read: true } : notif
            )
        );
    };

    // const markAllAsRead = () => {
    //     setNotifications(prev =>
    //         prev.map(notif => ({ ...notif, read: true }))
    //     );
    // };

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "success":
                return <Check className="w-4 h-4 text-green-400" />;
            case "warning":
                return <AlertCircle className="w-4 h-4 text-yellow-400" />;
            default:
                return <Bell className="w-4 h-4 text-blue-400" />;
        }
    };

    return (
        <>
            <header className="bg-gray-900/50 backdrop-blur-xl border-b border-gray-700/50 p-4 sticky top-0 z-30">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                        <h1 className="text-2xl font-bold">
                            {activeTab === "issues" &&
                                "Open Source & GSoC GitHub Issues"}
                            {activeTab === "organizations" &&
                                "Open Source & GSoC Organizations"}
                            {activeTab === "bookmarks" && "Bookmarked Issues"}
                            {activeTab === "history" && "Browse History"}
                            {activeTab === "analytics" && "Usage Analytics"}
                        </h1>
                    </div>

                    <div className="flex items-center space-x-4">
                        {/* Notifications */}
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() =>
                                    setShowNotifications(!showNotifications)
                                }
                                className="p-2 hover:bg-gray-800 rounded-lg transition-colors relative cursor-pointer"
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center">
                                        <span className="text-xs font-bold text-white">
                                            {unreadCount > 9
                                                ? "9+"
                                                : unreadCount}
                                        </span>
                                    </div>
                                )}
                            </button>

                            {/* Notifications Dropdown */}
                            {showNotifications && (
                                <div className="absolute right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-4 text-center text-gray-400">
                                                No notifications
                                            </div>
                                        ) : (
                                            notifications.map(
                                                (notification) => (
                                                    <div
                                                        key={notification.id}
                                                        onClick={() =>
                                                            markAsRead(
                                                                notification.id
                                                            )
                                                        }
                                                        className={`p-4 border-b border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors ${
                                                            !notification.read
                                                                ? "bg-gray-800/50"
                                                                : ""
                                                        }`}
                                                    >
                                                        <div className="flex items-start space-x-3">
                                                            <div className="mt-1">
                                                                {getNotificationIcon(
                                                                    notification.type
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <div className="flex items-center justify-between">
                                                                    <p className="font-medium text-white text-sm">
                                                                        {
                                                                            notification.title
                                                                        }
                                                                    </p>
                                                                    {!notification.read && (
                                                                        <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                                                                    )}
                                                                </div>
                                                                <p className="text-gray-400 text-sm mt-1">
                                                                    {
                                                                        notification.message
                                                                    }
                                                                </p>
                                                                <div className="flex items-center mt-2 text-xs text-gray-500">
                                                                    <Clock className="w-3 h-3 mr-1" />
                                                                    {
                                                                        notification.time
                                                                    }
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            )
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile */}
                        <div className="relative" ref={userDropdownRef}>
                            <button
                                onClick={() =>
                                    setShowUserDropdown(!showUserDropdown)
                                }
                                className="flex items-center space-x-2 p-1 cursor-pointer rounded-lg transition-colors"
                            >
                                <Image
                                    src={
                                        session.data?.user?.image ||
                                        "/icons/default-avatar.png"
                                    }
                                    alt="User Avatar"
                                    width={36}
                                    height={36}
                                    className="rounded-full hover:opacity-90 transition-opacity"
                                />
                            </button>

                            {/* User Dropdown */}
                            {showUserDropdown && (
                                <div className="absolute right-0 mt-2 w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50">
                                    {/* User Info Section */}
                                    <div className="p-4 border-b border-gray-700">
                                        <div className="flex items-center space-x-3">
                                            <Image
                                                src={
                                                    session.data?.user?.image ||
                                                    "/icons/default-avatar.png"
                                                }
                                                alt="User Avatar"
                                                width={48}
                                                height={48}
                                                className="rounded-full"
                                            />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-white truncate">
                                                    {session.data?.user?.name ||
                                                        "User"}
                                                </p>
                                                <p className="text-sm text-gray-400 truncate">
                                                    {session.data?.user
                                                        ?.email ||
                                                        "user@example.com"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Menu Items */}
                                    <div className="py-2">
                                        <Link
                                            href="https://github.com/rohankumarchaudhary67/gsoc-issue-tracker"
                                            target="_blank"
                                            className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-700 transition-colors cursor-pointer"
                                        >
                                            <Github className="w-4 h-4 text-gray-400" />
                                            <span className="text-white">
                                                GitHub
                                            </span>
                                        </Link>

                                        <button className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-700 transition-colors cursor-pointer">
                                            <Crown className="w-4 h-4 text-yellow-400" />
                                            <span className="text-white">
                                                Upgrade
                                            </span>
                                            <span className="ml-auto bg-yellow-500 text-xs text-black px-2 py-1 rounded-full font-bold">
                                                PRO
                                            </span>
                                        </button>

                                        <button className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-700 transition-colors cursor-pointer">
                                            <Settings className="w-4 h-4 text-gray-400" />
                                            <span className="text-white">
                                                Settings
                                            </span>
                                        </button>

                                        <button className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-700 transition-colors cursor-pointer">
                                            <HelpCircle className="w-4 h-4 text-gray-400" />
                                            <span className="text-white">
                                                Support
                                            </span>
                                        </button>
                                    </div>

                                    {/* Logout */}
                                    <div className="border-t border-gray-700 py-2">
                                        <button
                                            className="w-full px-4 py-2 text-left flex items-center space-x-3 hover:bg-gray-700 transition-colors cursor-pointer text-red-400"
                                            onClick={() => {
                                                signOut({ callbackUrl: "/" });
                                            }}
                                        >
                                            <LogOut className="w-4 h-4" />
                                            <span>Sign out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}
