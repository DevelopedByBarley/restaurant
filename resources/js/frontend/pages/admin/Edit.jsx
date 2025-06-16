import { useForm } from "@inertiajs/react";
import AdminLayout from "../../layouts/AdminLayout";

function Edit({ admin }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: admin.name || "",
        email: admin.email || "",
        level: admin.level || "",
        password: "",
        password_confirmation: "",
    });

    function submit(e) {
        e.preventDefault();
        put(`/admin/${admin.id}`, {
            onSuccess: () => {
                console.log("Adminisztrátor sikeresen módosítva:");
            },
        });
    }

    return (
        <div className="xl:ml-72">
            <section className="max-w-4xl w-full p-6 bg-white rounded-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                    Admin szerkesztése
                </h2>

                <form onSubmit={submit}>
                    <div className="mt-4 grid gap-6">
                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="name">
                                Név
                            </label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData("name", e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none"
                            />
                            {errors.name && (
                                <div className="text-red-500 text-sm">{errors.name}</div>
                            )}
                        </div>

                        <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData("email", e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none"
                            />
                            {errors.email && (
                                <div className="text-red-500 text-sm">{errors.email}</div>
                            )}
                        </div>

                        <div>
                            <label>Admin szintje</label>
                            <select
                                id="level"
                                value={data.level}
                                onChange={(e) => setData("level", e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none"
                            >
                                <option value="" disabled>
                                    Válassz admin szintet
                                </option>
                                <option value="1">Alap Admin</option>
                                <option value="2">Fő Admin</option>
                                <option value="3">Szuper Admin</option>
                            </select>
                            {errors.level && (
                                <div className="text-red-500 text-sm">{errors.level}</div>
                            )}
                        </div>

                       {/*  <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password">
                                Jelszó (ha változtatni szeretnéd)
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={data.password}
                                onChange={(e) => setData("password", e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none"
                                autoComplete="new-password"
                            />
                            {errors.password && (
                                <div className="text-red-500 text-sm">{errors.password}</div>
                            )}
                        </div> */}

                        {/* <div>
                            <label className="text-gray-700 dark:text-gray-200" htmlFor="password_confirmation">
                                Jelszó megerősítése
                            </label>
                            <input
                                id="password_confirmation"
                                type="password"
                                value={data.password_confirmation}
                                onChange={(e) => setData("password_confirmation", e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none"
                                autoComplete="new-password"
                            />
                        </div> */}
                    </div>

                    <div className="flex justify-end mt-6">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                        >
                            Módosítás
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}

Edit.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Edit;
// ...existing code...
