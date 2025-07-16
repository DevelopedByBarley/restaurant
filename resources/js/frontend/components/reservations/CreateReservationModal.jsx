import Modal from "@/frontend/components/modals/Modal";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function CreateReservationModal({
    isOpen,
    onClose,
    onSubmit,
    title,
    description,
    children,
    slots = [],
    submitLabel = "Create Reservation",
}) {
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

    // Slot kiválasztás kezelése
    const handleSlotSelect = (slot) => {
        setData("reservation_start", slot.start);
        setData("reservation_end", slot.end);
    };

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
                {/* Idősávok gombokként */}
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">
                        Időpont kiválasztása
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {slots.map((slot, idx) => {
                            const selected =
                                data.reservation_start === slot.start &&
                                data.reservation_end === slot.end;
                            return (
                                <button
                                    type="button"
                                    key={idx}
                                    onClick={() => handleSlotSelect(slot)}
                                    className={`px-4 py-2 rounded border text-sm transition
                                        ${selected
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white text-gray-800 border-gray-300 hover:bg-indigo-50 hover:border-indigo-400"}
                                    `}
                                >
                                    {slot.start} - {slot.end}
                                </button>
                            );
                        })}
                    </div>
                    {(errors.reservation_start || errors.reservation_end) && (
                        <div className="text-red-500 text-sm">
                            {errors.reservation_start || errors.reservation_end}
                        </div>
                    )}
                </div>
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
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                    />
                    {errors.guest_name && (
                        <div className="text-red-500 text-sm">
                            {errors.guest_name}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Telefon</label>
                    <input
                        type="text"
                        name="guest_phone"
                        value={data.guest_phone}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                    />
                    {errors.guest_phone && (
                        <div className="text-red-500 text-sm">
                            {errors.guest_phone}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Email</label>
                    <input
                        type="email"
                        name="guest_email"
                        value={data.guest_email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                    />
                    {errors.guest_email && (
                        <div className="text-red-500 text-sm">
                            {errors.guest_email}
                        </div>
                    )}
                </div>
                <div>
                    <label className="block mb-1 font-semibold">Létszám</label>
                    <input
                        type="number"
                        name="guest_count"
                        value={data.guest_count}
                        min={1}
                        max={8}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
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
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                    />
                    {errors.notes && (
                        <div className="text-red-500 text-sm">
                            {errors.notes}
                        </div>
                    )}
                </div>
            </Modal>
        </>
    );
}
