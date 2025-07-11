import { Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import urlIs from "../../helpers/functions";
import UserNavbarLink from "./UserNavbarLink";

export default function UserNavbar() {
    const { post } = useForm();
    const [profileOpen, setProfileOpen] = useState(false);
    const { url } = usePage();
    const { auth } = usePage().props;

    useEffect(() => {
        setProfileOpen(false);
    }, [url]);

    function logout(e) {
        e.preventDefault();
        post("/logout");
    }

    function toggleProfileMenu() {
        setProfileOpen(!profileOpen);
    }

    return (
                <aside className="bg-gradient-to-br from-gray-800 to-gray-900 -translate-x-80 fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0">
                    <div className="relative border-b border-white/20">
                        <div className="flex items-center justify-center flex-col my-4">
                            <div className="relative my-2">
                                <img
                                    className="w-10 h-10 rounded-full object-cover"
                                    src={auth.user.file ? "/storage/" + auth.user.file : "/storage/profile.png"}
                                    alt=""
                                />
                                {auth.user.organizer_level === "trusted" && (
                                    <span>
                                        <img
                                            src="/storage/verified.png"
                                            alt="Verified"
                                            className="h-5 absolute -bottom-3 left-3"
                                        />
                                    </span>
                                )}
                                <span className="top-0 left-7 absolute w-3.5 h-3.5 bg-green-400 border-2 border-white dark:border-gray-800 rounded-full"></span>
                            </div>
                            <div className="flex flex-col text-center text-white">
                                <div className="">
                                    <p>{auth.user.name}</p>
                                    <small>{auth.user.email}</small>
                                </div>
                            </div>
                        </div>
                        <button
                            className="middle none font-sans font-medium text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none w-8 max-w-[32px] h-8 max-h-[32px] rounded-lg text-xs text-white hover:bg-white/10 active:bg-white/30 absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
                            type="button"
                        >
                            <span className="absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="2.5"
                                    stroke="currentColor"
                                    aria-hidden="true"
                                    className="h-5 w-5 text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18L18 6M6 6l12 12"
                                    ></path>
                                </svg>
                            </span>
                        </button>
                    </div>
                    <div className="m-4">
                        <ul className="flex flex-col gap-1">
                            <li>
                                <UserNavbarLink route={"/dashboard"}>
                                    Kezdőlap
                                </UserNavbarLink>
                            </li>
                            <li>
                                <UserNavbarLink route={"/user"}>
                                    Profil
                                </UserNavbarLink>
                            </li>
                            <li>
                                <a className="" href="#">
                                    <button
                                        className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                        type="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="w-5 h-5 text-inherit"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1.5 5.625c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v12.75c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 011.5 18.375V5.625zM21 9.375A.375.375 0 0020.625 9h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zm0 3.75a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5a.375.375 0 00.375-.375v-1.5zM10.875 18.75a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375h7.5zM3.375 15h7.5a.375.375 0 00.375-.375v-1.5a.375.375 0 00-.375-.375h-7.5a.375.375 0 00-.375.375v1.5c0 .207.168.375.375.375zm0-3.75h7.5a.375.375 0 00.375-.375v-1.5A.375.375 0 0010.875 9h-7.5A.375.375 0 003 9.375v1.5c0 .207.168.375.375.375z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                            Akcióim
                                        </p>
                                    </button>
                                </a>
                            </li>
                            <li>
                                <a className="" href="#">
                                    <button
                                        className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                        type="button"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            aria-hidden="true"
                                            className="w-5 h-5 text-inherit"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
                                                clipRule="evenodd"
                                            ></path>
                                        </svg>
                                        <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                            Értesítések
                                        </p>
                                    </button>
                                </a>
                            </li>
                        </ul>
                        <ul className="flex flex-col gap-1">
                            <li>
                                <button
                                    onClick={logout}
                                    className="middle none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg text-white hover:bg-white/10 active:bg-white/30 w-full flex items-center gap-4 px-4 capitalize"
                                    type="button"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        aria-hidden="true"
                                        className="w-5 h-5 text-inherit"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                                            clipRule="evenodd"
                                        ></path>
                                    </svg>
                                    <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">
                                        Kijelentkezés
                                    </p>
                                </button>
                            </li>
                        </ul>
                    </div>
                </aside>
            )
}
