import { usePage, router } from "@inertiajs/react";
import { useState } from "react";
import AdminHeader from "@/frontend/components/admin/AdminHeader";
import Paginator from "@/frontend/components/Paginator";
import { TableMap } from "../../../components/tables/TableMap";
import AdminLayout from "@/frontend/layouts/AdminLayout";
import { Reservations } from "../../../components/admin/components/reservations/Reservations";
import DatePicker from "../../../components/admin/components/DatePicker";
function ReservationsPage() {
    const { reservations, tables, filters } = usePage().props;


    return (
        <div className="w-3/4 xl:ml-80 p-4">
            <AdminHeader>Foglalások kezelése</AdminHeader>

            <Reservations reservations={reservations.data} filters={filters} />
            <TableMap tables={tables} />
        </div>
    );
}

ReservationsPage.layout = (page) => <AdminLayout>{page}</AdminLayout>;
export default ReservationsPage;
