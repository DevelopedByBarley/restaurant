import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function AdminNavbar() {
    const { post } = useForm();
    const [profileOpen, setProfileOpen] = useState(false);
    const { url } = usePage();
    const { auth } = usePage().props;

    useEffect(() => {
        setProfileOpen(false);
    }, [url]);

    function logout(e) {
        e.preventDefault();
        post("/admin/logout");
    }

    function toggleProfileMenu() {
        setProfileOpen(!profileOpen);
    }

    return (
        <>
            {url !== "/admin" && url !== "/admin/register" && (
                <>
                    <div className="lg:hidden py-16 text-center">
                        <button
                            type="button"
                            className="py-2 px-3 inline-flex justify-center items-center gap-x-2 text-start bg-gray-800 border border-gray-800 text-white text-sm font-medium rounded-lg shadow-2xs align-middle hover:bg-gray-950 focus:outline-hidden focus:bg-gray-900 dark:bg-white dark:text-neutral-800 dark:hover:bg-neutral-200 dark:focus:bg-neutral-200"
                            aria-haspopup="dialog"
                            aria-expanded="false"
                            aria-controls="hs-sidebar-collapsible-group"
                            aria-label="Toggle navigation"
                        >
                            Open
                        </button>
                    </div>

                    <div
                        id="hs-sidebar-collapsible-group"
                        className="hs-overlay [--auto-close:lg] lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 w-64
                        hs-overlay-open:translate-x-0
                        -translate-x-full transition-all duration-300 transform
                        h-full
                        hidden
                        fixed top-0 start-0 bottom-0 z-60
                        bg-white border-e border-gray-200 dark:bg-neutral-800 dark:border-neutral-700"
                        role="dialog"
                        tabIndex="-1"
                        aria-label="Sidebar"
                    >
                        <div className="relative flex flex-col h-full max-h-full ">
                            <header className="p-4 flex justify-between items-center gap-x-2">
                                <div className="flex items-center justify-between w-full gap-x-2">
                                    <Link
                                        href="/admin/dashboard"
                                        className="flex-none font-semibold text-xl text-black focus:outline-hidden focus:opacity-80 dark:text-white"
                                        aria-label="Brand"
                                    >
                                        Admin
                                    </Link>
                                    {auth.admin && auth.admin.level > 2 && (
                                        <Link
                                            href={"/admin/create"}
                                            type="button"
                                            className="text-xs inline-flex w-full justify-center rounded-md px-3 py-2 font-semibold text-slate-600 hover:text-white hover:bg-slate-600 border shadow-xs sm:ml-3 sm:w-auto cursor-pointer"
                                        >
                                            + Admin
                                        </Link>
                                    )}
                                </div>

                                <div className="lg:hidden -me-2">
                                    <button
                                        type="button"
                                        className="flex justify-center items-center gap-x-3 size-6 bg-white border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:hover:text-neutral-200 dark:focus:text-neutral-200"
                                    >
                                        <svg
                                            className="shrink-0 size-4"
                                            xmlns=""
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M18 6 6 18" />
                                            <path d="m6 6 12 12" />
                                        </svg>
                                        <span className="sr-only">Bezár</span>
                                    </button>
                                </div>
                            </header>

                            <nav className="h-full overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500">
                                <div className="pb-0 px-2  w-full flex flex-col flex-wrap">
                                    <ul className="space-y-1">
                                        <li>
                                            <Link
                                                className="flex items-center gap-x-3.5 py-2 px-2.5 bg-gray-100 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-700 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-white"
                                                href="/admin/dashboard"
                                            >
                                                <svg
                                                    xmlns=""
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"
                                                    />
                                                </svg>
                                                Irányítópult
                                            </Link>
                                        </li>

                                        {/* Többi menüpont marad változatlan */}

                                        <li id="account-accordion">
                                            <button
                                                type="button"
                                                onClick={toggleProfileMenu} // Profil menü toggle
                                                className="cursor-pointer w-full text-start flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200"
                                                aria-expanded={profileOpen}
                                                aria-controls="account-accordion-sub-1-collapse-1"
                                            >
                                                <svg
                                                    xmlns=""
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                                    />
                                                </svg>
                                                Profil
                                            </button>

                                            <div
                                                id="account-accordion-sub-1-collapse-1"
                                                className={`w-full overflow-hidden transition-[height] duration-300 ${
                                                    profileOpen ? "" : "hidden"
                                                }`}
                                                role="region"
                                                aria-labelledby="account-accordion"
                                            >
                                                <ul className="pt-1 ps-2 space-y-1">
                                                    <li>
                                                        <button
                                                            onClick={logout}
                                                            className="flex items-center cursor-pointer gap-x-1 py-2 px-2.5 text-sm text-gray-800 rounded-lg hover:bg-gray-100 focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-200 w-full text-left"
                                                        >
                                                            <svg
                                                                xmlns=""
                                                                fill="none"
                                                                viewBox="0 0 24 24"
                                                                strokeWidth={
                                                                    1.5
                                                                }
                                                                stroke="currentColor"
                                                                className="size-6"
                                                            >
                                                                <path
                                                                    strokeLinecap="round"
                                                                    strokeLinejoin="round"
                                                                    d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                                                                />
                                                            </svg>
                                                            Kijelentkezés
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
