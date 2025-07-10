import { Link } from "@inertiajs/react";
import IndigoBtn from "../IndigoBtn";

export default function ListView({ tables }) {
    return (
        <div className="relative overflow-x-auto sm:rounded-lg mt-9">
            {tables.length === 0 ? (
                <div className="p-6 text-gray-600 dark:text-gray-300 text-center flex items-center justify-center flex-col gap-2">
                    Nincs elérhető asztal.
                    <IndigoBtn>
                        <Link href="/admin/tables/create">Létrehozás</Link>
                    </IndigoBtn>
                </div>
            ) : (
                <table className="w-full text-sm shadow-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                        Asztalok listája
                        <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                            Az alábbi táblázat tartalmazza az összes asztalt az
                            adatbázisból.
                        </p>
                        <IndigoBtn className="text-xs mt-3">
                            <Link href="/admin/tables/create">Létrehozás</Link>
                        </IndigoBtn>
                    </caption>

                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                        <tr>
                            <th className="px-6 py-3">Név</th>
                            <th className="px-6 py-3">Helyszín</th>
                            <th className="px-6 py-3">Férőhely</th>
                            <th className="px-6 py-3">Létrehozva</th>
                            <th className="px-6 py-3">Frissítve</th>
                            <th className="px-6 py-3">Műveletek</th>
                        </tr>
                    </thead>
                    <tbody className="text-center">
                        {tables.map((table) => (
                            <tr
                                key={table.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                            >
                                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {table.name}
                                </td>
                                <td className="px-6 py-4">
                                    {table.location_name}
                                </td>
                                <td className="px-6 py-4">{table.seats}</td>
                                <td className="px-6 py-4">
                                    {table.created_at}
                                </td>
                                <td className="px-6 py-4">
                                    {table.updated_at}
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <a
                                        href={`/admin/tables/${table.id}/edit`}
                                        className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-2 px-4 rounded mr-2 transition"
                                    >
                                        Szerkesztés
                                    </a>
                                    <a
                                        href={`/admin/tables/${table.id}/delete`}
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2 transition"
                                    >
                                        Törlés
                                    </a>
                                    <a
                                        href={`/admin/tables/${table.id}/reservations`}
                                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
                                    >
                                        Foglalások
                                    </a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
