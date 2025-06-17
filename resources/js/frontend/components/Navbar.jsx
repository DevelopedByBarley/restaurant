import { Link, usePage } from "@inertiajs/react";

export default function Navbar() {

    const { env } = usePage().props;

    return (
        <header className="text-gray-600 body-font">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href="/" className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
                    <span className="ml-3 text-xl">Brand</span>
                </Link>

                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
                    <a className="mr-5 hover:text-gray-900 cursor-pointer">First Link</a>
                    <a className="mr-5 hover:text-gray-900 cursor-pointer">Second Link</a>
                    <a className="mr-5 hover:text-gray-900 cursor-pointer">Third Link</a>
                    <a className="mr-5 hover:text-gray-900 cursor-pointer">Fourth Link</a>
                </nav>

                {env.authEnabled && (
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <Link
                            href="/login"
                            className="inline-flex items-center bg-white text-gray-700 border border-gray-300 py-1 px-4 rounded hover:bg-gray-100 text-base"
                        >
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="inline-flex items-center bg-blue-600 text-white py-1 px-4 rounded hover:bg-blue-700 text-base"
                        >
                            Sign Up
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}
