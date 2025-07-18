import { useState } from "react";

export const Reservations = ({ reservations, filters }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    return (
        <>
            {/* Sidebar toggle button (mobile) */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="p-2 text-gray-600 bg-white rounded-md shadow-md dark:bg-gray-800 dark:text-gray-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
                        />
                    </svg>
                </button>
            </div>

            {/* Sidebar - foglalási kérelmek */}
            <aside
                className={`
                    fixed top-0 left-0 z-40 h-screen w-92 px-5 py-8 overflow-y-auto bg-white border-r dark:bg-gray-900 dark:border-gray-700
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                    lg:translate-x-0
                `}
            >
                {/* Logo */}
                <a>
                    <img
                        className="w-auto h-7"
                        src="https://merakiui.com/images/logo.svg"
                        alt="Logo"
                    />
                </a>

                {/* Foglalási kérelmek táblázata */}
                <h2 className="mt-6 mb-4 text-lg font-semibold text-gray-700 dark:text-gray-200">
                    Bejövő foglalási kérelmek
                </h2>

            </aside>

            {/* Overlay for sidebar when open on mobile */}
            {isSidebarOpen && (
                <div
                    onClick={() => setIsSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
                ></div>
            )}

            {/* Tartalom helye */}
            <div className="p-4 lg:ml-96">
                {/* Itt jelenítheted meg a fő tartalmat */}
            </div>
        </>
    );
};
