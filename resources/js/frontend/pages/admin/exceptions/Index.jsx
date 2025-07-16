import { Link, usePage } from "@inertiajs/react";
import AdminHeader from "../../../components/admin/AdminHeader";
import IndigoBtn from "../../../components/IndigoBtn";
import AdminLayout from "../../../layouts/AdminLayout";

function Index() {
    const { dayExceptions } = usePage().props;
    return (
        <div className="p-4">
            <AdminHeader>
                <h1 className="text-2xl font-bold">Ünnepek & Kivételek</h1>
                <span className="flex">
                    <IndigoBtn className="mt-4 text-xs">
                        <Link href={"/admin/exceptions/create"}>+ Kivétel</Link>
                    </IndigoBtn>
                </span>
            </AdminHeader>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th className="px-6 py-3">Dátum</th>
                            <th className="px-6 py-3">Indoklás</th>
                            <th className="px-6 py-3">Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dayExceptions.map((exception) => (
                            <tr
                                key={exception.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
                            >
                                <th
                                    scope="row"
                                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                >
                                    {exception.date}
                                </th>
                                <td className="px-6 py-4">
                                    {exception.reason || (
                                        <span className="italic text-gray-400">
                                            -
                                        </span>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    {/* Ide jöhetnek szerkesztés/törlés gombok */}
                                    <button className="bg-orange-600 p-3 text-white text-xs hover:underline mr-2">
                                        Szerkesztés
                                    </button>
                                    <button className="bg-red-600 p-3 text-white text-xs hover:underline">
                                        Törlés
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Index;
