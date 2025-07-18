import { usePage } from "@inertiajs/react";
import { useState } from "react";
import LocationItems from "../admin/table/LocationItems";

export const TableMap = ({ tables }) => {
    const { locations } = usePage().props;

    const [activeLocationId, setActiveLocationId] = useState(
        locations.length > 0 ? locations[0].id : 0
    );

    const activeLocation = locations.find(
        (location) => location.id === activeLocationId
    );

    console.log(activeLocation.tables);
    console.log(activeLocation.blocks);
    return (
        <>
            <LocationItems
                locations={locations}
                activeLocationId={activeLocationId}
                setActiveLocationId={setActiveLocationId}
            />
            {activeLocation &&
                (activeLocation.tables.length > 0 ||
                    activeLocation.blocks.length > 0) && (
                    <div className="relative w-[1200px] h-[500px] overflow-scroll border border-gray-300 bg-[repeating-linear-gradient(90deg,_rgba(255,255,255,0.9)_0px,_rgba(255,255,255,0.9)_10px,_rgba(204,251,241,0.15)_10px,_rgba(204,251,241,0.15)_20px)] rounded">
                        {activeLocation.tables.map(
                            (table) => (
                                console.log(table.x),
                                (
                                    <div
                                        key={table.id}
                                        className={`absolute border border-gray-400 ${
                                            table.reservations.length > 0
                                                ? "bg-red-500"
                                                : table.color
                                        } cursor-pointer`}
                                        style={{
                                            position: "absolute",
                                            left: table.pos_x + "px",
                                            top: table.pos_y + "px",
                                            width: table.width + "px",
                                            height: table.height + "px",
                                        }}
                                    >
                                        <div className="flex items-center justify-center h-full w-full p-2 flex-col">
                                            <p className="font-bold">
                                                {table.name}
                                            </p>
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
                                                <p className="text-sm">
                                                    {table.seats}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            )
                        )}
                        {activeLocation.blocks.map((block) => (
                            <div
                                key={block.id}
                                className={`absolute border ${block.color} cursor-pointer`}
                                style={{
                                    position: "absolute",
                                    left: block.pos_x + "px",
                                    top: block.pos_y + "px",
                                    width: block.width + "px",
                                    height: block.height + "px",
                                }}
                            ></div>
                        ))}
                    </div>
                )}
        </>
    );
};
