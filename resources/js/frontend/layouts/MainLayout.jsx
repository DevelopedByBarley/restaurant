import { useState } from "react";
import FlashMessages from "../components/FlashMessage";
import Navbar from "../components/Navbar";
import CreateReservationModal from "../components/reservations/CreateReservationModal";
import { ReservationProvider } from "../contexts/ReservationContext";

export default function MainLayout({ children }) {
    return (
        <>
            <ReservationProvider>
                <Navbar />
                <FlashMessages />
                {children}
            </ReservationProvider>
        </>
    );
}
