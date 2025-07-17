import Modal from "@/frontend/components/modals/Modal";
import { useForm } from "@inertiajs/react";
import { useContext, useState } from "react";
import { ReservationDate } from "./ReservationDate";
import { ReservationSlots } from "./ReservationSlots";
import { ReservationBasicDatas } from "./ReservationBasicDatas";
import { ReservationContext } from "../../contexts/ReservationContext";
import { date } from "yup";
import { reservationService } from "../../services/admin/reservationService";

export default function CreateReservationModal({
    isOpen,
    title,
    description,
    submitLabel = "Create Reservation",
}) {
    const { isReservationModalOpen, setReservationModalOpen } =
        useContext(ReservationContext);

    const { data, setData, post, processing, errors, reset } = useForm({
        table_id: "",
        date: "",
        guest_name: "",
        guest_phone: "",
        guest_email: "",
        duration: "",
        reservation_start: "",
        reservation_end: "",
        guest_count: 1,
        notes: "",
        status: "pending",
    });

    const [reservationStep, setReservationStep] = useState(0);
    const [slots, setSlots] = useState([]);
    const [slot, setSlot] = useState(false);

    const handleChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        reservationService.createReservation(data, post);
        setReservationModalOpen(false);
        reset();
        setReservationStep(0);
        setSlot(false);
    };

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={() => {
                    setReservationModalOpen(false);
                }}
                onSubmit={handleSubmit}
                title={title}
                description={description}
                submitLabel={submitLabel}
                withButtons={false}
            >
                <ReservationDate
                    reservationStep={reservationStep}
                    setReservationStep={setReservationStep}
                    setSlots={setSlots}
                    setData={setData}
                    data={data}
                    errors={errors}
                />
                <ReservationSlots
                    reservationStep={reservationStep}
                    setReservationStep={setReservationStep}
                    slots={slots}
                    setSlot={setSlot}
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <ReservationBasicDatas
                    reservationStep={reservationStep}
                    setReservationStep={setReservationStep}
                    setData={setData}
                    data={data}
                    errors={errors}
                    handleSubmit={handleSubmit}
                    handleChange={handleChange}
                />
            </Modal>
        </>
    );
}
