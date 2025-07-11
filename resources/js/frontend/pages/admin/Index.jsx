import { Link, useForm, usePage } from "@inertiajs/react";
import AdminLayout from "../../layouts/AdminLayout";
import Paginator from "../../components/Paginator";
import DangerModal from "../../components/modals/DangerModal";
import { useState } from "react";
import AdminHeader from "../../components/admin/AdminHeader";

function Index() {
    const { auth, admins } = usePage().props;
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAdminId, setSelectedAdminId] = useState(null);
    const { delete: destroy } = useForm();

    function handleDeleteConfirm(e) {
        e.preventDefault();
        if (!selectedAdminId) return;

        setModalOpen(false);
        setSelectedAdminId(null);
        destroy("/admin/" + selectedAdminId, {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Adminisztrátor törölve:", selectedAdminId);
            },
            onError: (error) => {
                console.error(
                    "Hiba történt az adminisztrátor törlésekor:",
                    error
                );
            },
        });
    }
    const handleDelete = (id) => {
        setSelectedAdminId(id);
        setModalOpen(true);
    };

    return (
        <>
            <AdminHeader>
                Admin Vezérlőpult
            </AdminHeader>

            <section>
                <div className=" w-full mt-5 md:grid grid-cols-5 grid-rows-5 gap-4 min-h-[600px]">
                    <div className="col-span-3 row-span-3 shadow">1</div>
                    <div className="col-span-2 row-span-3 col-start-4 shadow">
                        2
                    </div>
                    <div className="col-span-2 row-span-2 row-start-4 shadow">
                        3
                    </div>
                    <div className="col-span-2 row-span-2 col-start-3 row-start-4 shadow">
                        4
                    </div>
                    <div className="row-span-2 col-start-5 row-start-4 shadow">
                        5
                    </div>
                </div>
            </section>

            <section>
                {admins && admins.data.length > 1 ? (
                    <>
                        <div className="w-full p-6 bg-white rounded-md shadow-md dark:bg-gray-800 mt-6">
                            <h3 className="text-lg font-semibold text-gray-700 dark:text-white mb-4">
                                Adminisztrátorok listája
                            </h3>

                            <table className="w-full text-left shadow-collapse">
                                <thead>
                                    <tr>
                                        <th className="shadow-b px-4 py-2 text-gray-700 dark:text-gray-300">
                                            Név
                                        </th>
                                        <th className="shadow-b px-4 py-2 text-gray-700 dark:text-gray-300">
                                            Email
                                        </th>
                                        <th className="shadow-b px-4 py-2 text-gray-700 dark:text-gray-300">
                                            Műveletek
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {admins.data
                                        .filter(
                                            (admin) =>
                                                admin.id !== auth.admin.id
                                        )
                                        .map((admin) => (
                                            <tr
                                                key={admin.id}
                                                className="bg-gray-100 dark:bg-gray-700 even:bg-gray-200 even:dark:bg-gray-600"
                                            >
                                                <td className="border-b px-4 py-2 text-gray-800 dark:text-white">
                                                    {admin.name}
                                                </td>
                                                <td className="border-b px-4 py-2 text-gray-800 dark:text-white">
                                                    {admin.email}
                                                </td>
                                                <td className="border-b px-4 py-2">
                                                    <Link
                                                        className="text-xs text-gray-900 bg-white hover:bg-gray-100 shadow shadow-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-3 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:shadow-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                                                        href={`/admin/${admin.id}/edit`}
                                                    >
                                                        <svg
                                                            xmlns=""
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="size-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                                                            />
                                                        </svg>
                                                        Frissítés
                                                    </Link>
                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                admin.id
                                                            )
                                                        }
                                                        type="button"
                                                        className="cursor-pointer text-xs text-gray-900 bg-white hover:bg-gray-100 shadow shadow-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg px-3 py-1 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:shadow-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                                                    >
                                                        <svg
                                                            xmlns=""
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth={1.5}
                                                            stroke="currentColor"
                                                            className="size-6"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                                            />
                                                        </svg>
                                                        Törlés
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>

                        <Paginator data={admins} />

                        <DangerModal
                            isOpen={modalOpen}
                            onClose={() => setModalOpen(false)}
                            onConfirm={handleDeleteConfirm}
                            message="Biztosan törölni szeretnéd az adminisztrátort? Ez a művelet nem visszavonható."
                        />
                    </>
                ) : (
                    <div className="max-w-4xl w-full p-6 bg-white rounded-md shadow-md dark:bg-gray-800 mt-6">
                        <p className="text-gray-600 dark:text-gray-300">
                            Nincsenek adminisztrátorok.
                        </p>
                    </div>
                )}
            </section>
        </>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Index;
