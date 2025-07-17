import axios from "axios";

export const reservationService = {
    fetchAvailableSlots: async (data, errors, setData, setSlots, setReservationStep, setError) => {

        if (data.date === "") {
            errors.date = "Kérjük, töltse ki az összes mezőt.";
            setData({ ...data, errors });
            return;
        } else {
            errors.date = "";
            setData({ ...data, errors });
        }
        if (data.guest_count <= 0) {
            errors.guest_count =
                "A vendégek számának legalább 1-nek kell lennie.";
            setData({ ...data, errors });
            return;
        }
        if (data.duration === "") {
            errors.duration = "Kérjük, válasszon időtartamot.";
            setData({ ...data, errors });
            return;
        } else {
            errors.duration = "";
            setData({ ...data, errors });
        }
        return await axios
            .post(
                "/reservations/fetch",
                {
                    date: data.date,
                    guest_count: data.guest_count,
                    duration: data.duration,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((res) => {
                setSlots(res.data);
                setReservationStep(1);
            })
            .catch((err) => {
                console.error(
                    "Error submitting reservation date:",
                    err.response.data
                );
                setError(err.response.data.message || "Hiba történt.");
            });
    },



    createReservation: (data, post) => {
        return post("/reservations", {
            ...data,
        });
    }
};
