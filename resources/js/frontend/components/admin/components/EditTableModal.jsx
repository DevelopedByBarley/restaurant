import Modal from "../../modals/Modal";

export default function EditTableModal({
    setEditTableModalOpen,
    locations,
    data,
    setData,
    errors,
    handleSubmit,
    handleTableDelete,
}) {
    console.log("EditTableModal data:", data);
    return (
        <Modal
            isOpen={() => console.log("isOpen")}
            onClose={() => setEditTableModalOpen(false)}
            onSubmit={(e) => {
                handleSubmit(e);
                setEditTableModalOpen(false);
            }}
            title="Asztalok kezelése"
            
            description="Válassz egy helyszínt az asztalok kezeléséhez."
            submitLabel="Asztal frissítése"
            buttons={[
                {
                    label: "Törlés",
                    onClick: () => handleTableDelete(data.id),
                    className: "bg-red-600 text-white",
                },
            ]}
        >
            <div className="mb-4">
                <label className="block mb-1 text-sm">Helyszín</label>
                <select
                    name="location_id"
                    defaultValue={data.location_id || data.location_id}
                    onChange={(e) => setData("location_id", e.target.value)}
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
                    <p className="text-red-500 text-sm">{errors.location_id}</p>
                )}
            </div>

            {/* Name */}
            <div className="mb-4">
                <label className="block mb-1 text-sm">Név</label>
                <input
                    type="text"
                    name="name"
                    defaultValue={data.name || data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                )}
            </div>

            {/* Seats */}
            <div className="mb-4">
                <label className="block mb-1 text-sm">Férőhelyek száma</label>
                <input
                    type="number"
                    name="seats"
                    defaultValue={data.seats || data.seats}
                    onChange={(e) => setData("seats", e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                />
                {errors.seats && (
                    <p className="text-red-500 text-sm">{errors.seats}</p>
                )}
            </div>

            <select
                name="color"
                id="color"
                defaultValue={data.color || data.color}
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

            {errors.color && (
                <p className="text-red-500 text-sm">{errors.color}</p>
            )}
        </Modal>
    );
}
