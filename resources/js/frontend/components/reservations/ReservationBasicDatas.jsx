import IndigoBtn from "../IndigoBtn";

export const ReservationBasicDatas = ({
    data,
    setData,
    errors,
    reservationStep,
    setReservationStep,
    handleSubmit,
}) => {
    return (
        <div
            className={`mb-4 transition-all ${
                reservationStep === 2 ? "" : "hidden"
            }`}
        >
            <div>
                <label className="block mb-1 font-semibold">Vendég neve</label>
                <input
                    type="text"
                    name="guest_name"
                    value={data.guest_name}
                    onChange={(e) => setData("guest_name", e.target.value)}
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
                    onChange={(e) => setData("guest_phone", e.target.value)}
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
                    onChange={(e) => setData("guest_email", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                />
                {errors.guest_email && (
                    <div className="text-red-500 text-sm">
                        {errors.guest_email}
                    </div>
                )}
            </div>

            <div>
                <label className="block mb-1 font-semibold">Megjegyzés</label>
                <textarea
                    name="notes"
                    value={data.notes}
                    onChange={(e) => setData("notes", e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-indigo-600 transition"
                />
                {errors.notes && (
                    <div className="text-red-500 text-sm">{errors.notes}</div>
                )}
            </div>


            <IndigoBtn onClick={() => setReservationStep(1)}>Vissza</IndigoBtn>
            <IndigoBtn onClick={(e) => handleSubmit(e)}>Rendelés leadása</IndigoBtn>
        </div>
    );
};
