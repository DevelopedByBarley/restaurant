import { Rnd } from "react-rnd";
import axios from "axios";
import { router } from "@inertiajs/react";

export default function DefaultTable({ table, setEditModalOpen, setCurrentTable, setData }) {
    const handleSave = (data) => {
        axios
            .post(
                `/admin/tables/${table.id}/save`,
                {
                    pos_x: data.x,
                    pos_y: data.y,
                    width: data.width,
                    height: data.height,
                },
                {
                    withCredentials: true, // így küldi a sütiket is
                }
            )
            .then(() => {
                console.log(`Table ${table.id} saved:`, data);

                router.visit("/admin/tables", {
                    method: "get",
                    preserveScroll: true,
                    preserveState: true,
                    only: ["locations", "tables"], // csak ezeket kérjük újra
                });
            })
            .catch((err) => {
                console.error("Error saving table position:", err);
            });
    };

    return (
        <Rnd
            key={table.id}
            default={{
                x: table.pos_x || 0,
                y: table.pos_y || 0,
                width: table.width,
                height: table.height,
            }}
            bounds="parent"
            onDragStop={(e, d) => {
                handleSave({
                    x: d.x,
                    y: d.y,
                    width: table.width,
                    height: table.height,
                });
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                handleSave({
                    x: position.x,
                    y: position.y,
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                });
            }}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                cursor: "move",
            }}
            className={`${table.color} shadow-md`}
        >
            <div
                onDoubleClick={() => {
                    setEditModalOpen(true);
                    setData({
                        id: table.id,
                        location_id: table.location_id, // helyszín ID
                        name: table.name,
                        seats: table.seats,
                        color: table.color,
                        pos_x: table.pos_x,
                        pos_y: table.pos_y,
                        width: table.width,
                        height: table.height,
                    });
                    setCurrentTable(table);
                }}
                className="flex items-center justify-center flex-col gap-1 h-full w-full p-2 rounded"
            >
                <p className="font-bold">{table.name}</p>
                <div className="rounded-full bg-white p-1 flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="size-4"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                    <p className="text-sm">{table.seats}</p>
                </div>
            </div>
        </Rnd>
    );
}
