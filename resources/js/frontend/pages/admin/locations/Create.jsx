
import AdminHeader from "../../../components/admin/AdminHeader";
import IndigoBtn from "../../../components/IndigoBtn";
import AdminLayout from "../../../layouts/AdminLayout";
import { useForm } from '@inertiajs/react';

function Create() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/admin/locations', {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <AdminHeader>Helyszín létrehozása</AdminHeader>
            <form onSubmit={handleSubmit} className="p-6 mt-9 bg-white rounded-md shadow-md">

                {/* Név mező */}
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Név <span className="text-red-500">*</span>
                </label>
                <input
                    id="name"
                    type="text"
                    value={data.name}
                    onChange={(e) => setData('name', e.target.value)}
                    className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500"
                    required
                />
                {errors.name && <p className="text-sm text-red-600 mb-2">{errors.name}</p>}

                {/* Leírás mező */}
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Leírás (opcionális)
                </label>
                <textarea
                    id="description"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="w-full px-3 py-2 mb-4 border border-gray-300 rounded-md focus:ring focus:ring-indigo-500 resize-y"
                    rows={4}
                />
                {errors.description && <p className="text-sm text-red-600 mb-2">{errors.description}</p>}

                <IndigoBtn
                    type="submit"
                    disabled={processing}
                >
                    Mentés
                </IndigoBtn>
            </form>
        </>
    );
}

Create.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Create;
