import { useForm, usePage } from "@inertiajs/react";

import AdminLayout from "../../../layouts/AdminLayout";
import IndigoBtn from "../../../components/IndigoBtn";
import { useState } from "react";
import TableBoard from "../../../components/admin/table/TableBoard";
import AdminHeader from "../../../components/admin/AdminHeader";
import CreateTableModal from "../../../components/admin/components/CreateTableModal";
import EditTableModal from "../../../components/admin/components/EditTableModal";
import CreateBlockModal from "../../../components/admin/components/CreateBlockModal";

function Index() {
    const [createBlockModalOpen, setCreateBlockModalOpen] = useState(false);
    const [createModalOpen, setCreateModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);
    const [currentTable, setCurrentTable] = useState(null);
    const { locations } = usePage().props;

    const [activeLocationId, setActiveLocationId] = useState(
        locations.length > 0 ? locations[0].id : 0
    );

    const activeLocation = locations.find(
        (location) => location.id === activeLocationId
    );
    console.log(activeLocation);

    const {
        data: tableData,
        setData: setTableData,
        post: tablePost,
        delete: tableDestroy,
        processing: tableProcessing,
        reset: tableReset,
        errors: tableErrors,
        patch: tablePatch,
    } = useForm({
        location_id: "",
        name: "",
        type: "table",
        color: "bg-rose-400",
        seats: "",
        pos_x: "",
        pos_y: "",
    });
    const {
        data: blockData,
        setData: setBlockData,
        post: blockPost,
        delete: blockDestroy,
        processing: blockProcessing,
        reset: blockReset,
        errors: blockErrors,
        patch: blockPatch,
    } = useForm({
        location_id: "",
        name: "",
        type: "block",
        color: "bg-slate-600",
        pos_x: "",
        pos_y: "",
    });

    const handleBlockSubmit = (e) => {
        e.preventDefault();
        const formData = {
            ...blockData,
            pos_x: blockData.pos_x === "" ? null : Number(blockData.pos_x),
            pos_y: blockData.pos_y === "" ? null : Number(blockData.pos_y),
        };

        blockPost("/admin/blocks", {
            data: formData,
            onSuccess: () => {
                blockReset();
                setCreateBlockModalOpen(false);
            },
            onError: (errors) => {
                console.error("Hiba:", errors);
            },
        });
    };

    /*      $table->foreignId('location_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('type')->default('block');
            $table->integer('pos_x')->default(null)->nullable(); // pixel érték
            $table->integer('pos_y')->default(null)->nullable();
            $table->integer('width')->default(60);
            $table->integer('height')->default(60);
            $table->string('color')->default('bg-slate-600'); */

    const handleDelete = (id) => {
        if (confirm("Biztosan törölni szeretnéd ezt az asztalt?")) {
            tableDestroy(`/admin/tables/${id}`, {
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

    const handleUpdate = (id) => {
        if (confirm("Biztosan frissíteni szeretnéd ezt az asztalt?")) {
            console.log(data);
            tablePatch(`/admin/tables/${id}`, {
                tableData: {
                    ...tableData,
                    pos_x:
                        tableData.pos_x === "" ? null : Number(tableData.pos_x),
                    pos_y:
                        tableData.pos_y === "" ? null : Number(tableData.pos_y),
                },
                onSuccess: () => {
                    console.log("Asztal frissítve:", id);
                    // Esetleg itt végezhetsz el további műveleteket, pl. újratöltés
                    reset();
                    setEditModalOpen(false);
                },
                onError: (errors) => {
                    console.error("Hiba frissítés közben:", errors);
                    // Itt kezelheted a hibákat, pl. megjelenítheted őket a felületen
                },
                onFinish: () => {
                    // Esetleg itt végezhetsz el további műveleteket, pl. újratöltés
                    console.log("Kérelem befejezve");
                    reset();
                    setEditModalOpen(false);
                },
                onClose: () => {
                    // Esetleg itt végezhetsz el további műveleteket, pl. újratöltés
                    console.log("Modal bezárva");
                    reset();
                    setEditModalOpen(false);
                    // Ha szükséges, itt is bezárhatod a modalt
                },
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // pos_x / pos_y nullra állítása ha üres
        const formData = {
            ...tableData,
            /*             pos_x: data.pos_x === "" ? null : Number(data.pos_x),
            pos_y: data.pos_y === "" ? null : Number(data.pos_y), */
        };

        tablePost("/admin/tables", {
            data: formData,
            onSuccess: () => {
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

                <div className="flex gap-3 mt-3">
                    <IndigoBtn className="text-xs">
                        <span onClick={() => setCreateModalOpen(true)}>
                            + Asztal
                        </span>
                    </IndigoBtn>
                    <IndigoBtn className="text-xs">
                        <span onClick={() => setCreateBlockModalOpen(true)}>
                            + Blokk
                        </span>
                    </IndigoBtn>
                </div>
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
            {activeLocation &&
                (activeLocation.tables.length > 0 ||
                    activeLocation.blocks.length > 0) && (
                    <div className="mt-10">
                        <h2 className="text-lg font-semibold mb-2">
                            Asztalok elhelyezése
                        </h2>
                        <TableBoard
                            tables={activeLocation.tables}
                            blocks={activeLocation.blocks}
                            setBlockData={setBlockData}
                            setEditModalOpen={setEditModalOpen}
                            setCurrentTable={setCurrentTable}
                            setTableData={setTableData}
                        />
                    </div>
                )}

            {editModalOpen && (
                <EditTableModal
                    currentTable={currentTable}
                    setEditModalOpen={setEditModalOpen}
                    locations={locations}
                    data={tableData}
                    setData={setTableData}
                    errors={errors}
                    handleSubmit={(e) => {
                        handleUpdate(currentTable.id);
                        setEditModalOpen(false);
                    }}
                />
            )}

            {createBlockModalOpen && (
                <CreateBlockModal
                    setCreateModalOpen={setCreateBlockModalOpen}
                    locations={locations}
                    data={blockData}
                    setData={setBlockData}
                    errors={blockErrors}
                    handleSubmit={handleBlockSubmit}
                />
            )}

            {createModalOpen && (
                <CreateTableModal
                    setCreateModalOpen={setCreateModalOpen}
                    locations={locations}
                    data={tableData}
                    setData={setTableData}
                    errors={tableErrors}
                    handleSubmit={handleSubmit}
                />
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
                                            <button
                                                onClick={() => {
                                                    setEditModalOpen(true);
                                                    setTableData({
                                                        id: table.id,
                                                        location_id:
                                                            table.location_id,
                                                        name: table.name,
                                                        seats: table.seats,
                                                        color: table.color,
                                                        pos_x: table.pos_x,
                                                        pos_y: table.pos_y,
                                                        width: table.width,
                                                        height: table.height,
                                                    });
                                                    setCurrentTable(table);
                                                }}
                                                className="bg-orange-500 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded mr-2 transition"
                                            >
                                                Szerkesztés
                                            </button>

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
