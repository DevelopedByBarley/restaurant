import Modal from "@/frontend/components/modals/Modal";
import { useForm } from "@inertiajs/react";

export default function CreateReservationModal({
    isOpen,
    onClose,
    onSubmit,
    title,
    description,
    children,
    submitLabel = "Create Reservation",
}) {
    if (!isOpen) return null;
    const { data, setData, post, processing, errors, reset } = useForm({
        table_id: "",
        guest_name: "",
        guest_phone: "",
        guest_email: "",
        reservation_start: "",
        reservation_end: "",
        guest_count: 1,
        notes: "",
        status: "pending",
    });

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/admin/reservations", {
            onSuccess: () => reset(),
        });
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                onSubmit={handleSubmit}
                title={title}
                description={description}
                submitLabel={submitLabel}
            >
                <form
                    onSubmit={handleSubmit}
                    className="max-w-lg mx-auto p-4 bg-white rounded shadow space-y-4"
                >
                    <div>
                        <label className="block mb-1 font-semibold">
                            Vendég neve
                        </label>
                        <input
                            type="text"
                            name="guest_name"
                            value={data.guest_name}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.guest_name && (
                            <div className="text-red-500 text-sm">
                                {errors.guest_name}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">
                            Telefon
                        </label>
                        <input
                            type="text"
                            name="guest_phone"
                            value={data.guest_phone}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.guest_phone && (
                            <div className="text-red-500 text-sm">
                                {errors.guest_phone}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">
                            Email
                        </label>
                        <input
                            type="email"
                            name="guest_email"
                            value={data.guest_email}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.guest_email && (
                            <div className="text-red-500 text-sm">
                                {errors.guest_email}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">
                            Létszám
                        </label>
                        <input
                            type="number"
                            name="guest_count"
                            value={data.guest_count}
                            min={1}
                            max={8}
                            onChange={handleChange}
                            required
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.guest_count && (
                            <div className="text-red-500 text-sm">
                                {errors.guest_count}
                            </div>
                        )}
                    </div>
                    <div>
                        <label className="block mb-1 font-semibold">
                            Megjegyzés
                        </label>
                        <textarea
                            name="notes"
                            value={data.notes}
                            onChange={handleChange}
                            className="w-full border rounded px-3 py-2"
                        />
                        {errors.notes && (
                            <div className="text-red-500 text-sm">
                                {errors.notes}
                            </div>
                        )}
                    </div>
                </form>{" "}
            </Modal>
        </>
    );
}
