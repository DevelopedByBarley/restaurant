// ReservationContext.jsx
import { createContext, useContext, useState } from "react";

export const ReservationContext = createContext();

export function ReservationProvider({ children }) {
    const [isReservationModalOpen, setReservationModalOpen] = useState(false);

    return (
        <ReservationContext.Provider value={{ isReservationModalOpen, setReservationModalOpen }}>
            {children}
        </ReservationContext.Provider>
    );
}

export function useReservation() {
    return useContext(ReservationContext);
}
