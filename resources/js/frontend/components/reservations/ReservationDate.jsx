import axios from "axios";
import { useState } from "react";
import IndigoBtn from "../IndigoBtn";
import { ErrorMessage } from "../ErrorMessage";
import { reservationService } from "../../services/admin/reservationService";

export const ReservationDate = ({
    reservationStep,
    setReservationStep,
    setSlots,
    setData,
    data,
    errors,
}) => {
    const [error, setError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();
        reservationService.fetchAvailableSlots(data, errors, setData, setSlots, setReservationStep, setError);
    };

    return (
        <div className={`mb-4 ${reservationStep !== 0 ? "hidden" : ""}`}>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
                <label className="block mb-1 font-semibold">
                    Dátum kiválasztása
                </label>
                <input
                    type="date"
                    name="reservation_date"
                    min={new Date().toISOString().split("T")[0]} // minimum date is today
                    value={data.date}
                    onChange={(e) => setData("date", e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                />
                <ErrorMessage data={data} field="date" />
            </div>
            <div className="mb-4">
                <label
                    htmlFor="guest_count"
                    className="block mb-1 font-semibold my-4"
                >
                    Vendégek száma
                </label>

                <input
                    type="number"
                    name="guest_count"
                    value={data.guest_count}
                    onChange={(e) => setData("guest_count", e.target.value)}
                    min="1"
                    required
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                />
            </div>
            <div className="mb-4">
                <label htmlFor="duration" className="block mb-1 font-semibold">
                    Időtartam
                </label>
                <select
                    name="duration"
                    id=""
                    onChange={(e) => setData("duration", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                >
                    <option value="" selected>
                        Válasszon időtartamot
                    </option>
                    <option value="30">30 perc</option>
                    <option value="60">60 perc</option>
                    <option value="90">90 perc</option>
                </select>
                <ErrorMessage data={data} field="duration" />
            </div>

            <IndigoBtn onClick={handleSubmit}>Tovább</IndigoBtn>
        </div>
    );
};
