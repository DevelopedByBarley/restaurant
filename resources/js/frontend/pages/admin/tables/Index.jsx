import { useForm, usePage } from "@inertiajs/react";
import AdminHeader from "../../../components/AdminHeader";
import AdminLayout from "../../../layouts/AdminLayout";
import IndigoBtn from "../../../components/IndigoBtn";
import { useState } from "react";
import { Rnd } from "react-rnd";
import SubmitModal from "../../../components/modals/SubmitModal";

function Index() {
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const { locations } = usePage().props;
    const [activeLocationId, setActiveLocationId] = useState(
        locations.length > 0 ? locations[0].id : null
    );

    const activeLocation = locations.find(
        (location) => location.id === activeLocationId
    );

    const { data, setData, post, processing, reset, errors } = useForm({
        location_id: "",
        name: "",
        seats: "",
        pos_x: "",
        pos_y: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // pos_x / pos_y nullra állítása ha üres
        const formData = {
            ...data,
            pos_x: data.pos_x === "" ? null : Number(data.pos_x),
            pos_y: data.pos_y === "" ? null : Number(data.pos_y),
        };

        post("/admin/tables", {
            data: formData,
            onSuccess: () => {
                reset();
                onClose();
            },
        });
    };

    return (
        <>
            <AdminHeader>Asztalok beállítása</AdminHeader>

            {createModalOpen && (
                <SubmitModal
                    isOpen={activeLocationId !== null}
                    onClose={() => setCreateModalOpen(false)}
                    onSubmit={(e) => {
                        handleSubmit(e);
                        setCreateModalOpen(false);
                    }}
                    title="Asztalok kezelése"
                    description="Válassz egy helyszínt az asztalok kezeléséhez."
                    submitLabel="Asztal hozzáadása"
                >
                    <div className="mb-4">
                        <label className="block mb-1 text-sm">Helyszín</label>
                        <select
                            name="location_id"
                            value={data.location_id}
                            onChange={(e) =>
                                setData("location_id", e.target.value)
                            }
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        >
                            <option value="">Válassz helyszínt</option>
                            {locations.map((loc) => (
                                <option key={loc.id} value={loc.id}>
                                    {loc.name}
                                </option>
                            ))}
                        </select>
                        {errors.location_id && (
                            <p className="text-red-500 text-sm">
                                {errors.location_id}
                            </p>
                        )}
                    </div>

                    {/* Name */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm">Név</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Seats */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm">
                            Férőhelyek száma
                        </label>
                        <input
                            type="number"
                            name="seats"
                            value={data.seats}
                            onChange={(e) => setData("seats", e.target.value)}
                            required
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                        {errors.seats && (
                            <p className="text-red-500 text-sm">
                                {errors.seats}
                            </p>
                        )}
                    </div>

                    {/* pos_x (opcionális) */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm">
                            X pozíció (opcionális)
                        </label>
                        <input
                            type="number"
                            name="pos_x"
                            value={data.pos_x}
                            onChange={(e) => setData("pos_x", e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                        {errors.pos_x && (
                            <p className="text-red-500 text-sm">
                                {errors.pos_x}
                            </p>
                        )}
                    </div>

                    {/* pos_y (opcionális) */}
                    <div className="mb-4">
                        <label className="block mb-1 text-sm">
                            Y pozíció (opcionális)
                        </label>
                        <input
                            type="number"
                            name="pos_y"
                            value={data.pos_y}
                            onChange={(e) => setData("pos_y", e.target.value)}
                            className="w-full border border-gray-300 p-2 rounded"
                        />
                        {errors.pos_y && (
                            <p className="text-red-500 text-sm">
                                {errors.pos_y}
                            </p>
                        )}
                    </div>
                </SubmitModal>
            )}

            {/* Helyszín gombok */}
            <div className="flex gap-4 mt-6 mb-8 flex-wrap">
                {locations.map((location) => (
                    <button
                        key={location.id}
                        onClick={() => setActiveLocationId(location.id)}
                        className={`px-4 py-2 rounded ${
                            location.id === activeLocationId
                                ? "bg-indigo-600 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        {location.name}
                    </button>
                ))}
            </div>

            <div className="relative overflow-x-auto sm:rounded-lg">
                {activeLocation && activeLocation.tables.length === 0 ? (
                    <div className="p-6 text-gray-600 dark:text-gray-300 text-center flex items-center justify-center flex-col gap-2">
                        Nincs elérhető asztal ezen a helyszínen.
                        <IndigoBtn>
                            <button onClick={() => setCreateModalOpen(true)}>Létrehozás</button>
                        </IndigoBtn>
                    </div>
                ) : (
                    <>
                        <table className="w-full text-sm shadow-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                                {activeLocation?.name} asztalai
                                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                    Az alábbi táblázat tartalmazza az összes
                                    elhelyezett és mentett asztalt az
                                    adatbázisból.
                                </p>
                            </caption>

                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                                <tr>
                                    <th className="px-6 py-3">Név</th>
                                    <th className="px-6 py-3">Férőhely</th>
                                    <th className="px-6 py-3">Műveletek</th>
                                </tr>
                            </thead>

                            <tbody className="text-center">
                                {activeLocation?.tables.map((table) => (
                                    <tr
                                        key={table.id}
                                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                                    >
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {table.name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {table.seats}
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
                    </>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Index;
