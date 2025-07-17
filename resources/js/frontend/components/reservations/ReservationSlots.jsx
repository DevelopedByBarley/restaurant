import { ErrorMessage } from "../ErrorMessage";
import IndigoBtn from "../IndigoBtn";

export const ReservationSlots = ({
    slots,
    data,
    setData,
    errors,
    reservationStep,
    setReservationStep,
}) => {
    const handleSlotSelect = (slot) => {
        setData("reservation_start", slot.start);
        setData("reservation_end", slot.end);
    };

    return (
        <>
            {reservationStep === 1 && (
                <div className="mb-4">
                    <label className="block mb-1 font-semibold">
                        Időpont kiválasztása
                    </label>
                    {errors.reservation_start && <ErrorMessage data={data} field="reservation_start" />}
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

                                    ${
                                        selected
                                            ? "bg-indigo-600 text-white border-indigo-600"
                                            : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
                                    }
                                    `}
                                >
                                    {slot.start} - {slot.end}
                                </button>
                            );
                        })}
                    </div>
                    {slots.length === 0 && (
                        <div className="text-red-500 text-sm mt-2">
                            Nincs elérhető időpont ezen a napon.
                        </div>
                    )}

                    <div className="flex gap-3 mt-5 ">
                        <IndigoBtn onClick={() => setReservationStep(0)}>
                            Vissza
                        </IndigoBtn>
                        <IndigoBtn
                            onClick={() => {
                                if (!data.reservation_start || !data.reservation_end) {
                                    errors.reservation_start =
                                        "Kérjük, válasszon egy időpontot.";
                                    setData({ ...data, errors });
                                    return;
                                }
                                if (data.reservation_start !== "" && data.reservation_end !== "") errors.reservation_start = "";
                                setData({ ...data, errors });
                                setReservationStep(2);
                            }}
                        >
                            Tovább
                        </IndigoBtn>

                    </div>
                </div>
            )}
        </>
    );
};
