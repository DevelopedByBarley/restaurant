import {
    UserIcon,
    TableCellsIcon,
    UsersIcon,
    ClockIcon,
    ClipboardDocumentListIcon,
    ChatBubbleLeftRightIcon,
    CheckCircleIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";

export const ReservationCard = ({ reservation }) => {

    if(!reservation) return null;
    const statusIcon =
        reservation.status === "accepted" ? (
            <CheckCircleIcon className="w-5 h-5 text-green-500 inline mr-1" />
        ) : reservation.status === "cancelled" ? (
            <XCircleIcon className="w-5 h-5 text-red-500 inline mr-1" />
        ) : (
            <ClockIcon className="w-5 h-5 text-yellow-500 inline mr-1" />
        );

    return (
        <div className="bg-white shadow-md rounded-lg p-4 mb-4 text-sm flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
                <UserIcon className="w-6 h-6 text-indigo-500" />
                <h3 className="text-lg font-semibold">{reservation.guest_name}</h3>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <TableCellsIcon className="w-5 h-5 text-gray-400" />
                <span className="font-bold">Asztal:</span>
                <span>{reservation.table_id ?? 'Nincs hozzáadva'}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <UsersIcon className="w-5 h-5 text-gray-400" />
                <span className="font-bold">Vendégek száma:</span>
                <span>{reservation.guest_count}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                <ClockIcon className="w-5 h-5 text-gray-400" />
                <span className="font-bold">Időpont:</span>
                <span>
                    {new Date(reservation.reservation_start).toLocaleString()} –{" "}
                    {new Date(reservation.reservation_end).toLocaleString()}
                </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
                {statusIcon}
                <span className="font-bold">Státusz:</span>
                <span>{reservation.status}</span>
            </div>
            {reservation.notes && (
                <div className="flex items-center gap-2 text-gray-600">
                    <ChatBubbleLeftRightIcon className="w-5 h-5 text-gray-400" />
                    <span className="font-bold">Megjegyzés:</span>
                    <span>{reservation.notes}</span>
                </div>
            )}
        </div>
    );
}
