import AdminLayout from "../../../layouts/AdminLayout";

function Reservations() {
    return (
        <h1>Foglalások kezelése</h1>
    )
}

Reservations.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Reservations;
