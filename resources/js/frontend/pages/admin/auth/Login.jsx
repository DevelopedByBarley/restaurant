import { useForm, usePage } from "@inertiajs/react";
import AdminLayout from "../../../layouts/AdminLayout";
import { useEffect } from "react";

function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: "",
        password: "",
        remember: false,
    });
        const { auth } = usePage().props;


    useEffect(() => {
        if(auth.admin) {
            window.location.href = "/admin/dashboard";
        }
    }, [])

    function submit(e) {
        e.preventDefault();
        post("/admin/login");
    }
    return (
        <div className="h-screen flex items-center justify-center">
            <section className="max-w-xl w-full p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                    Admin
                </h2>

                <form onSubmit={submit}>
                    <div className="grid grid-cols-1 gap-6 mt-4">

                        <div>
                            <label
                                className="text-gray-700 dark:text-gray-200"
                                htmlFor="email"
                            >
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none"
                            />
                            {errors.email && (
                                <div className="text-red-500 text-sm">
                                    {errors.email}
                                </div>
                            )}
                        </div>

                        <div>
                            <label
                                className="text-gray-700 dark:text-gray-200"
                                htmlFor="password"
                            >
                                Jelszó
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none"
                            />
                            {errors.password && (
                                <div className="text-red-500 text-sm">
                                    {errors.password}
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Regisztráció
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

Login.layout = page => <AdminLayout>{page}</AdminLayout>

export default Login

