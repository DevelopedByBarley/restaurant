import { useForm, usePage } from "@inertiajs/react";

import AdminLayout from "../../../layouts/AdminLayout";
import IndigoBtn from "../../../components/IndigoBtn";
import { useState } from "react";
import SubmitModal from "../../../components/modals/DefaultModal";
import TableBoard from "../../../components/admin/table/TableBoard";
import AdminHeader from "../../../components/admin/AdminHeader";

function Index() {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    const { locations } = usePage().props;

    const [activeLocationId, setActiveLocationId] = useState(
        locations.length > 0 ? locations[0].id : 0
    );

    const activeLocation = locations.find(
        (location) => location.id === activeLocationId
    );
    

    const {
        data,
        setData,
        post,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        location_id: "",
        name: "",
        color: "bg-rose-400",
        seats: "",
        pos_x: "",
        pos_y: "",
    });

    const handleDelete = (id) => {
        if (confirm("Biztosan törölni szeretnéd ezt az asztalt?")) {
            destroy(`/admin/tables/${id}`, {
                onSuccess: () => {
                    console.log("Asztal törölve:", id);
                    // Esetleg itt végezhetsz el további műveleteket, pl. újratöltés
                },
                onError: (errors) => {
                    console.error("Hiba törlés közben:", errors);
                    // Itt kezelheted a hibákat, pl. megjelenítheted őket a felületen
                },
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // pos_x / pos_y nullra állítása ha üres
        const formData = {
            ...data,
            /*             pos_x: data.pos_x === "" ? null : Number(data.pos_x),
            pos_y: data.pos_y === "" ? null : Number(data.pos_y), */
        };

        post("/admin/tables", {
            data: formData,
            onSuccess: () => {
                console.log(data);
                reset();
                setCreateModalOpen(false);
            },
            onError: (errors) => {
                console.error("Hiba:", errors);
                // Itt kezelheted a hibákat, pl. megjelenítheted őket a felületen
            },
            onFinish: () => {
                // Esetleg itt végezhetsz el további műveleteket, pl. újratöltés
                console.log("Kérelem befejezve");
                reset();
                setCreateModalOpen(false);
            },
            onClose: () => {
                // Esetleg itt végezhetsz el további műveleteket, pl. újratöltés
                console.log("Modal bezárva");
                reset();
                setCreateModalOpen(false);
                // Ha szükséges, itt is bezárhatod a modalt
                onClose();
            },
        });
    };

    /*    const handleSave = async (id, x, y, width, height) => {
        try {
            await axios.patch(`/admin/tables/${id}`, {
                pos_x: x,
                pos_y: y,
                width,
                height,
            });
            console.log("Mentve:", id);
        } catch (error) {
            console.error("Hiba mentés közben:", error);
        }
    }; */

    return (
        <>
            <AdminHeader>
                <span className="block"> Asztalok beállítása</span>
                <IndigoBtn className="text-xs">
                    <span onClick={() => setCreateModalOpen(true)}>
                        Létrehozás
                    </span>
                </IndigoBtn>
            </AdminHeader>

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
            {activeLocation && activeLocation.tables.length > 0 && (
                <div className="mt-10">
                    <h2 className="text-lg font-semibold mb-2">
                        Asztalok elhelyezése
                    </h2>
                    <TableBoard
                        tables={activeLocation.tables}
                    />
                </div>
            )}

            {createModalOpen && (
                <SubmitModal
                    isOpen={() => console.log("isOpen")}
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

                    <select
                        name="color"
                        id="color"
                        onChange={(e) => setData("color", e.target.value)}
                        className="w-full border border-gray-300 p-2 rounded mb-4"
                    >
                        <option value="">Válassz színt</option>
                        <option value="bg-red-400">Piros</option>
                        <option value="bg-blue-400">Kék</option>
                        <option value="bg-green-400">Zöld</option>
                        <option value="bg-yellow-400">Sárga</option>
                        <option value="bg-purple-400">Lila</option>
                        <option value="bg-pink-400">Rózsaszín</option>
                        <option value="bg-gray-400">Szürke</option>
                        <option value="bg-indigo-400">Indigó</option>
                        <option value="bg-teal-400">Türkiz</option>
                        <option value="bg-orange-400">Narancs</option>
                        <option value="bg-rose-400">Rózsaszín</option>
                        <option value="bg-amber-400">Borostyán</option>
                        <option value="bg-lime-400">Lime</option>
                    </select>
                </SubmitModal>
            )}

            <div className="relative overflow-x-auto sm:rounded-lg">
                {activeLocation && activeLocation.tables.length === 0 ? (
                    <div className="p-6 text-gray-600 dark:text-gray-300 text-center flex items-center justify-center flex-col gap-2">
                        Nincs elérhető asztal ezen a helyszínen.
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
                                            <button
                                                onClick={() =>
                                                    handleDelete(table.id)
                                                }
                                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2 transition"
                                            >
                                                Törlés
                                            </button>
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
