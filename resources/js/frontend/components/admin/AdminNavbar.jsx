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
                <div className="lg:hidden fixed top-4 left-4 z-50">
                    <button
                        onClick={toggleSidebar}
                        className="p-2 text-gray-600 bg-white rounded-md shadow-md dark:bg-gray-800 dark:text-gray-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" strokeWidth="1.5"
                            stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5" />
                        </svg>
                    </button>
                </div>
            )}

            {!isHiddenRoute && (
                <aside
                    className={`
                        fixed top-0  z-40 h-screen w-64 px-5 py-8 overflow-y-auto bg-white border-r dark:bg-gray-900 dark:border-gray-700
                        transform transition-transform duration-300 ease-in-out
                        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
                        lg:translate-x-0
                    `}
                >
                    {/* Logo */}
                    <a>
                        <img className="w-auto h-7" src="https://merakiui.com/images/logo.svg" alt="Logo" />
                    </a>


                    {/* Navigation Links */}
                    <nav className="flex flex-col mt-6 space-y-3">
                        <Link href="/admin/dashboard" className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 2.148 2.148A12.061 12.061 0 0116.5 7.605" />
                            </svg>
                            <span className="mx-2 text-sm font-medium">Vezérlőpult</span>
                        </Link>

                        <Link href="/admin/locations" className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 010 3.75H5.625a1.875 1.875 0 010-3.75z" />
                            </svg>
                            <span className="mx-2 text-sm font-medium">Helyszínek</span>
                        </Link>

                        <Link href="/admin/tables" className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M10.5 6a7.5 7.5 0 107.5
                                      7.5h-7.5V6z" />
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M13.5 10.5H21A7.5 7.5 0
                                      0013.5 3v7.5z" />
                            </svg>
                            <span className="mx-2 text-sm font-medium">Asztalok</span>
                        </Link>


                        <Link href="/admin/reservations" className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337
                                      0 004.121-.952 4.125 4.125 0
                                      00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786
                                      -3.07M15 19.128v.106A12.318 12.318
                                      0 018.624 21c-2.331 0-4.512-.645-6.374
                                      -1.766l-.001-.109a6.375 6.375 0
                                      0111.964-3.07M12 6.375a3.375
                                      3.375 0 11-6.75 0 3.375 3.375 0
                                      016.75 0zm8.25 2.25a2.625 2.625 0
                                      11-5.25 0 2.625 2.625 0 015.25
                                      0z" />
                            </svg>
                            <span className="mx-2 text-sm font-medium">Foglalások</span>
                        </Link>

                        <Link href="/admin/openings" className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125
                                      1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019
                                      9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504
                                      1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25
                                      2.25L15 12" />
                            </svg>
                            <span className="mx-2 text-sm font-medium">Nyitvatartás</span>
                        </Link>
                        <Link href="/admin/exceptions" className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125
                                      1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019
                                      9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504
                                      1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25
                                      2.25L15 12" />
                            </svg>
                            <span className="mx-2 text-sm font-medium">Ünnepek/kivételek</span>
                        </Link>



                        <Link href="/admin/setting" className="flex items-center px-3 py-2 text-gray-600 transition-colors duration-300 transform rounded-lg dark:text-gray-300
                            hover:bg-gray-100 dark:hover:bg-gray-800 dark:hover:text-gray-200 hover:text-gray-700">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M10.343 3.94c.09-.542.56-.94 1.11
                                      -.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07
                                      .424.384.764.78.93.398.164.855.142 1.205-.108l.737
                                      -.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44
                                      1.002.12 1.45l-.527.737c-.25.35-.272.806-.107
                                      1.204.165.397.505.71.93.78l.893.15c.543.09.94.56
                                      .94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-
                                      .425.07-.765.383-.93.78-.165.398-.143.854.107
                                      1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774
                                      .773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35
                                      -.25-.806-.272-1.203-.107-.397.165-.71.505
                                      -.781.929l-.149.894c-.09.542-.56.94-1.11.94h-
                                      1.094c-.55 0-1.019-.398-1.11
                                      -.94l-.148-.894c-.071-.424-.384
                                      -.764-.781-.93-.398-.164-.854-.142-1.204.108l-
                                      .738.527c-.447.32-1.06.269
                                      093c-.55 0-1.02-.398-1.11-.94l-.149-.894c-.07
                                      -.424-.384-.764-.78-.93-.398-.164-.855-.142-1.205.108l-
                                      .737.527a1.125 1.125 0 01-1.45-.12l-.773-.774a1.125
                                      1.125 0 01-.12-1.45l.527-.737c.25-.35.272-.806.107-
                                      1.204-.165-.397-.505-.71-.93-.78l-.893-.15c-
                                      .543-.09-.94-.56-.94-1.109v-1.094c0-.55.397-
                                      1.02.94-1.11l.894-.149c.425-.07.765-.383.93-
                                      .78.165-.398.143-.854-.107-1.204l-.527-.738a1.125
                                      1.125 0 01.12-1.45l.774-.773a1.125 1.125 0 011.449-
                                      .12l.738.527c.35.25.806.272 1.203.107.397-.165.71-
                                      .505.781-.929l.149-.894zM15 12a3 3 0 11-6 0 3 3 0
                                      016 0z" />
                            </svg>
                            <span className="mx-2 text-sm font-medium">Settings</span>
                        </Link>
                    </nav>

                    {/* User Profile Section */}
                    <div className="relative mt-6">
                        <button
                            onClick={() => setProfileOpen(!profileOpen)}
                            className="flex items-center w-full px-4 py-2 text-sm font-medium text-left text-gray-600 rounded-lg
                            dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring"
                        >
                            <img
                                className="object-cover w-8 h-8 rounded-full"
                                src={auth?.user?.profile_photo_url || 'https://via.placeholder.com/40'}
                                alt="avatar"
                            />
                            <span className="mx-2">{auth?.user?.name || 'User'}</span>
                            <svg
                                className={`w-4 h-4 transition-transform duration-200 ${profileOpen ? 'rotate-180' : 'rotate-0'}`}
                                fill="none" stroke="currentColor" strokeWidth="2"
                                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </button>

                        {profileOpen && (
                            <div className="absolute right-0 w-full mt-2 bg-white rounded-md shadow-lg dark:bg-gray-900">
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
                </aside>
            )}

            {/* Overlay for sidebar when open on mobile */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 z-30 bg-black opacity-50 lg:hidden"
                ></div>
            )}
        </>
    );
}
