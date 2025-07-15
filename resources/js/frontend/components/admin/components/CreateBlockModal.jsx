import Modal from "../../modals/Modal";

export default function CreateBlockModal({
    setCreateTableModalOpen,
    locations,
    data,
    setData,
    errors,
    handleSubmit,
}) {
    return (
        <Modal
            isOpen={() => console.log("isOpen")}
            onClose={() => setCreateTableModalOpen(false)}
            onSubmit={(e) => {
                handleSubmit(e);
                setCreateTableModalOpen(false);
            }}
            title="Blokk létrehozása"
            description="Válassz egy helyszínt a blokk létrehozásához."
            submitLabel="Blokk hozzáadása"
        >
            <div className="mb-4">
                <label className="block mb-1 text-sm">Helyszín</label>
                <select
                    name="location_id"
                    value={data.location_id}
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
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    required
                    className="w-full border border-gray-300 p-2 rounded"
                />
                {errors.name && (
                    <p className="text-red-500 text-sm">{errors.name}</p>
                )}
            </div>
        </Modal>
    );
}
