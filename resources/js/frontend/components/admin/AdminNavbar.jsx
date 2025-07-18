import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function AdminNavbar() {
    const { post } = useForm();
    const { url } = usePage();
    const { auth } = usePage().props;

    const [profileOpen, setProfileOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        setProfileOpen(false);
        setSidebarOpen(false);
    }, [url]);

    function logout(e) {
        e.preventDefault();
        post("/admin/logout");
    }

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const isHiddenRoute = url === "/admin" || url === "/admin/register";

    return (
        <>
            {!isHiddenRoute && (
                <nav className="w-full bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow flex items-center justify-between px-6 py-3">
                    {/* Logo */}
                    <img
                        className="h-7"
                        src="https://merakiui.com/images/logo.svg"
                        alt="Logo"
                    />
                    <div className="flex items-center gap-4 justify-center w-full">
                        <Link
                            href="/admin/dashboard"
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
                        >
                            Vezérlőpult
                        </Link>
                        <Link
                            href="/admin/locations"
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
                        >
                            Helyszínek
                        </Link>
                        <Link
                            href="/admin/tables"
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
                        >
                            Asztalok
                        </Link>
                        <Link
                            href="/admin/reservations"
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
                        >
                            Foglalások
                        </Link>
                        <Link
                            href="/admin/openings"
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
                        >
                            Nyitvatartás
                        </Link>
                        <Link
                            href="/admin/exceptions"
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
                        >
                            Ünnepek/kivételek
                        </Link>
                        <Link
                            href="/admin/setting"
                            className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-indigo-600 transition"
                        >
                            Settings
                        </Link>
                    </div>
                    {/* User Profile */}
                    <div className="relative">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center gap-2 px-3 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                        >
                            <img
                                className="w-8 h-8 rounded-full object-cover"
                                src={
                                    auth?.user?.profile_photo_url ||
                                    "https://via.placeholder.com/40"
                                }
                                alt="avatar"
                            />
                            <span className="text-gray-700 dark:text-gray-200">
                                {auth?.user?.name || "User"}
                            </span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${
                                    profileOpen ? "rotate-180" : "rotate-0"
                                }`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19 9l-7 7-7-7"
                                ></path>
                            </svg>
                        </button>
                        {profileOpen && (
                            <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-900 rounded-md shadow-lg z-10">
                                <Link
                                    href="/admin/profile"
                                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    Profil
                                </Link>
                                <button
                                    onClick={logout}
                                    className="block w-full px-4 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                >
                                    Kijelentkezés
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </>
    );
}
