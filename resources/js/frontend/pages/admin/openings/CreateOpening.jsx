import { useForm } from "@inertiajs/react";
import AdminHeader from "../../../components/admin/AdminHeader";
import AdminLayout from "../../../layouts/AdminLayout";
import { openingService } from "../../../services/admin/openingService";

function CreateOpening() {
    const { data, setData, post, processing, errors, reset } = useForm({
        day_of_week: "",
        date: "",
        opens_at: "",
        closes_at: "",
        is_closed: false,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        openingService.submitOpening(data, post, reset);
    };
    return (
        <>
            <AdminHeader>
                <span className="block">Nyitvatartás hozzáadása</span>
            </AdminHeader>
            <form
                onSubmit={handleSubmit}
                className="p-4 bg-white rounded shadow space-y-4"
            >
                <div>
                    <label className="block mb-1 font-semibold">Nap</label>
                    <select
                        name="day_of_week"
                        value={data.day_of_week}
                        onChange={(e) => setData("day_of_week", e.target.value)}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                    >
                        <option value="">Válassz napot</option>
                        <option value="monday">Hétfő</option>
                        <option value="tuesday">Kedd</option>
                        <option value="wednesday">Szerda</option>
                        <option value="thursday">Csütörtök</option>
                        <option value="friday">Péntek</option>
                        <option value="saturday">Szombat</option>
                        <option value="sunday">Vasárnap</option>
                    </select>
                    {errors.day_of_week && (
                        <div className="text-red-500 text-sm">
                            {errors.day_of_week}
                        </div>
                    )}
                </div>

                <div>
                    <label className="block mb-1 font-semibold">Nyitás</label>
                    <input
                        type="time"
                        name="opens_at"
                        value={data.opens_at}
                        onChange={(e) => setData("opens_at", e.target.value)}
                        required={!data.is_closed}
                        disabled={data.is_closed}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                    />
                    {errors.opens_at && (
                        <div className="text-red-500 text-sm">
                            {errors.opens_at}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Zárás</label>
                    <input
                        type="time"
                        name="closes_at"
                        value={data.closes_at}
                        onChange={(e) => setData("closes_at", e.target.value)}
                        required={!data.is_closed}
                        disabled={data.is_closed}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                    />
                    {errors.closes_at && (
                        <div className="text-red-500 text-sm">
                            {errors.closes_at}
                        </div>
                    )}
                </div>
                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="is_closed"
                        checked={data.is_closed}
                        onChange={(e) => setData("is_closed", e.target.checked)}
                        className="mr-2"
                    />
                    <label className="font-semibold">Zárva ezen a napon</label>
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                    Mentés
                </button>
            </form>{" "}
        </>
    );
}

CreateOpening.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default CreateOpening;
