import { useState } from "react";
import FlashMessages from "../components/FlashMessage";
import Navbar from "../components/Navbar";
import CreateReservationModal from "../components/reservations/CreateReservationModal";

export default function MainLayout({ children }) {
    const [isReservationModalOpen, setIsReservationModalOpen] = useState(false);

    return (
        <>
            <Navbar setIsReservationModalOpen={() => setIsReservationModalOpen(true)} />
            <FlashMessages />
            <CreateReservationModal
                isOpen={isReservationModalOpen}
                onClose={() => setIsReservationModalOpen(false)}
                onSubmit={() => {
                    // Handle reservation submission
                    setIsReservationModalOpen(false);
                }}
                title="Asztal foglalás"
                description="Kérjük, töltse ki az adatokat a foglalás létrehozásához."
                submitLabel="Foglalás elküldése"
            />
            <div>{children}</div>
        </>
    );
}
