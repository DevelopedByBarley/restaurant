import AdminLayout from "../../../layouts/AdminLayout";
import AdminHeader from "../../../components/admin/AdminHeader";
import { useForm } from "@inertiajs/react";
import { exceptionService } from "../../../services/admin/exceptionService";

function CreateException() {
    const { data, setData, post, processing, errors, reset } = useForm({
        date: "",
        reason: "",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        exceptionService.submitException(data, post, reset);
    };

    return (
        <>
            <AdminHeader>
                <h1 className="text-2xl font-bold">Kivétel hozzáadása</h1>
            </AdminHeader>

            <form
                onSubmit={handleSubmit}
                className="p-4 bg-white rounded shadow space-y-4 mt-8"
            >
                <div>
                    <label className="block mb-1 font-semibold">Dátum</label>
                    <input
                        type="date"
                        name="date"
                        value={data.date}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                    />
                    {errors.date && (
                        <div className="text-red-500 text-sm">
                            {errors.date}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block mb-1 font-semibold">
                        Indoklás (opcionális)
                    </label>
                    <textarea
                        name="reason"
                        value={data.reason}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                    />
                    {errors.reason && (
                        <div className="text-red-500 text-sm">
                            {errors.reason}
                        </div>
                    )}
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                    Mentés
                </button>
            </form>
        </>
    );
}

CreateException.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default CreateException;
