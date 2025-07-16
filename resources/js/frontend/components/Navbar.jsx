import { Link, usePage } from "@inertiajs/react";
import { useContext, useState } from "react";
import LocaleSwitcher from "./LocaleSwitcher";
import { ReservationContext } from "../contexts/ReservationContext";

export default function Navbar() {
    const { url } = usePage();
    const { locale, t } = usePage().props;
    const [isOpen, setIsOpen] = useState(false);
    const { setReservationModalOpen } = useContext(ReservationContext);

    const getLinkClass = (path) => {
        return url === path
            ? "rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white"
            : "rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white";
    };
    

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Hamburger gomb mobilra (balra) */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <span className="sr-only">Open main menu</span>
                            {!isOpen ? (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns=""
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            ) : (
                                <svg
                                    className="block h-6 w-6"
                                    xmlns=""
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            )}
                        </button>
                    </div>

                    {/* Logó mobilra középre, nagy képernyőn balra */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>

                        {/* Nagy képernyős menü */}
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
                            <Link
                                href="/"
                                className={getLinkClass("/")}
                                aria-current={url === "/" ? "page" : undefined}
                            >
                                Kezdőlap
                            </Link>
                        </div>
                    </div>

                    {/* Sign in / Sign up nagy képernyőn jobbra, mobilon rejtve */}
                    {/*    <div className="hidden sm:flex gap-2">
                        <Link
                            href="/login"
                            className="cursor-pointer bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
                        >
                            {t.navbar.login}
                        </Link>
                        <Link
                            href="/register"
                            className="cursor-pointer text-violet-500 bg-slate-50 hover:bg-slate-100 font-bold py-2 px-4 rounded"
                        >
                            {t.navbar.register}
                        </Link>
                        <LocaleSwitcher />
                    </div> */}

                    <button
                        onClick={() => setReservationModalOpen(true)}
                        className="cursor-pointer bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Asztal foglalás
                    </button>
                </div>
            </div>

            {/* Mobil menü (csak ha isOpen true) */}
            {isOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pt-2 pb-3">
                        <Link
                            href="/"
                            className={getLinkClass("/")}
                            aria-current={url === "/" ? "page" : undefined}
                        >
                            Kezdőlap
                        </Link>

                        {/* Sign in / Sign up mobil menübe */}
                        <div className="mt-5 flex gap-3">
                            <Link
                                href="/login"
                                className="block rounded-md bg-violet-500 px-3 py-2 text-base font-medium text-white hover:bg-violet-700"
                            >
                                {t.navbar.login}
                            </Link>
                            <Link
                                href="/register"
                                className="block rounded-md bg-slate-50 px-3 py-2 text-base font-medium text-violet-500 hover:bg-slate-100"
                            >
                                {t.navbar.register}
                            </Link>
                            <LocaleSwitcher />
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
