import { Link, usePage } from "@inertiajs/react";
import AdminHeader from "../../../components/AdminHeader";
import AdminLayout from "../../../layouts/AdminLayout";
import IndigoBtn from "../../../components/IndigoBtn";
import { useState } from "react";
import ListView from "../../../components/tables/ListView";

function Index() {
    const { tables } = usePage().props;
    const [view, setView] = useState("map");

    return (
        <>
            <AdminHeader>Asztalok beállítása</AdminHeader>

            {/* Gombok nézetek váltásához */}
            <div className="flex gap-3 mt-4">
                <button
                    className={`px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition ${
                        view === "map" ? "bg-indigo-600 text-white" : ""
                    }`}
                    onClick={() => setView("map")}
                >
                    Térkép nézet
                </button>
                <button
                    className={`px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition ${
                        view === "reservations"
                            ? "bg-indigo-600 text-white"
                            : ""
                    }`}
                    onClick={() => setView("reservations")}
                >
                    Foglalás nézet
                </button>
                <button
                    className={`px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition ${
                        view === "list" ? "bg-indigo-600 text-white" : ""
                    }`}
                    onClick={() => setView("list")}
                >
                    Lista nézet
                </button>
            </div>

            {/* Nézetek renderelése */}
            {view === "map" && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Térkép nézet</h2>
                    {/* MapView komponens itt */}
                    {/* Példa: <MapView /> */}
                </div>
            )}
            {view === "list" && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">Lista nézet</h2>
                    <ListView tables={tables} />
                    {/* ListView komponens itt */}
                    {/* Példa: <ListView tables={tables} /> */}
                </div>
            )}
            {view === "reservations" && (
                <div className="mt-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Foglalás nézet
                    </h2>
                    {/* ReservationsView komponens itt */}
                    {/* Példa: <ReservationsView tables={tables} /> */}
                </div>
            )}
        </>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Index;
