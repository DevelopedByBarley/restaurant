import { Link, usePage } from "@inertiajs/react";
import AdminHeader from "../../../components/admin/AdminHeader";
import IndigoBtn from "../../../components/IndigoBtn";
import AdminLayout from "../../../layouts/AdminLayout";

function Index() {
    const { openings } = usePage().props;
    return (
        <div className="p-4">
            <AdminHeader>
                <span className="block">Nyitvatartás beállítása</span>
                <span className="flex gap-3">
                    <IndigoBtn className="mt-4 text-xs">
                        <Link href={"/admin/openings/create"}>
                            Nyitvatartás hozzáadása
                        </Link>
                    </IndigoBtn>
                    <IndigoBtn className="mt-4 text-xs">
                        <Link href={"/admin/openings/create"}>
                            Kivétel hozzáadása
                        </Link>
                    </IndigoBtn>
                </span>
            </AdminHeader>

            {openings.length > 0 ? (
                <table className="min-w-full mt-6 bg-white dark:bg-gray-800 shadow-md rounded-lg text-center">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Nao</th>
                            <th className="px-4 py-2 border-b">Nyitás</th>
                            <th className="px-4 py-2 border-b">Zárás</th>
                            <th className="px-4 py-2 border-b">Létrehozva</th>
                            <th className="px-4 py-2 border-b">Frissítve</th>
                            <th className="px-4 py-2 border-b">Műveletek</th>
                        </tr>
                    </thead>
                    <tbody>
                        {openings.map((opening) => (
                            <tr key={opening.id} className="border-b">
                                <td className="px-4 py-2">
                                    {opening.day_of_week}
                                </td>
                                <td className="px-4 py-2">
                                    {opening.opens_at}
                                </td>
                                <td className="px-4 py-2">
                                    {opening.closes_at}
                                </td>
                                <td className="px-4 py-2">
                                    {opening.created_at}
                                </td>
                                <td className="px-4 py-2">
                                    {opening.updated_at}
                                </td>
                                <td className="px-4 py-2">
                                    <IndigoBtn className="text-xs">
                                        <Link
                                            href={`/admin/openings/${opening.id}/edit`}
                                        >
                                            Szerkesztés
                                        </Link>
                                    </IndigoBtn>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className="p-6 text-gray-600 dark:text-gray-300 text-center">
                    Nincs elérhető nyitvatartás.
                </div>
            )}
        </div>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Index;
