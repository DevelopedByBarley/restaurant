import AdminHeader from "../../../components/AdminHeader";
import IndigoBtn from "../../../components/IndigoBtn";
import AdminLayout from "../../../layouts/AdminLayout";
import { useForm } from "@inertiajs/react";

function Create({ locations }) {
    const { data, setData, post, processing, errors } = useForm({
        location_id: "",
        name: "",
        seats: "",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/tables"); // vagy a megfelelő route
    };

    return (
        <>
            <AdminHeader>Asztal hozzáadása</AdminHeader>

            <form
                onSubmit={handleSubmit}
                className="mt-7 p-6 bg-white shadow-md rounded-xl space-y-4"
            >
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Helység
                    </label>
                    <select
                        name="location_id"
                        value={data.location_id}
                        onChange={(e) =>
                            setData("location_id", Number(e.target.value))
                        }
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    >
                        <option value="" defaultChecked>
                            Válassza ki a helységet
                        </option>
                        {locations.map((loc) => (
                            <option key={loc.id} value={loc.id}>
                                {loc.name}
                            </option>
                        ))}
                    </select>
                    {errors.location_id && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.location_id}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Asztal neve
                    </label>
                    <input
                        type="text"
                        name="name"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.name && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.name}
                        </p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Ülőhelyek száma
                    </label>
                    <input
                        type="number"
                        name="seats"
                        value={data.seats}
                        onChange={(e) =>
                            setData("seats", Number(e.target.value))
                        }
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                    {errors.seats && (
                        <p className="text-red-500 text-sm mt-1">
                            {errors.seats}
                        </p>
                    )}
                </div>

                <IndigoBtn
                    type="submit"
                    disabled={processing}
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
                >
                    {processing ? "Submitting..." : "Létrehozás"}
                </IndigoBtn>
            </form>
        </>
    );
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Create;
