import { Rnd } from "react-rnd";
import { useState } from "react";
import axios from "axios";

export default function TableBoard() {
    const [tables, setTables] = useState([
        {
            id: 1,
            name: "H3",
            pos_x: null,
            pos_y: null,
            width: 60,
            height: 60,
        },
        {
            id: 2,
            name: "H9",
            pos_x: 0,
            pos_y: 0,
            width: 60,
            height: 60,
        },
    ]);

    const handleSave = async (id, x, y, width, height) => {
        try {
            await axios.patch(`/api/tables/${id}`, {
                pos_x: x,
                pos_y: y,
                width,
                height,
            });
            console.log("Mentve:", id);
        } catch (error) {
            console.error("Hiba mentés közben:", error);
        }
    };

    const handleAddTable = async () => {
        try {
            const currentResponse = {
                name: `New-${Date.now()}`,
                pos_x: 0,
                pos_y: 0,
                width: 60,
                height: 60,
                seats: 4,
            };

          /*   const response = await axios.post("/api/tables", {
                name: `New-${Date.now()}`,
                pos_x: 100,
                pos_y: 100,
                width: 60,
                height: 60,
                seats: 4,
            }); */

            setTables([...tables, currentResponse]);
        } catch (error) {
            console.error("Hiba új tábla létrehozásakor:", error);
        }
    };

    return (
        <div className="relative w-full h-screen bg-green-50" id="board">
            <button
                onClick={handleAddTable}
                className="absolute top-4 left-4 bg-blue-600 text-white px-4 py-2 rounded shadow-md z-50"
            >
                Új tábla hozzáadása
            </button>

            {tables.map((table, index) => (
                <Rnd
                    key={table.id}
                    bounds="#board"
                    default={{
                        x: table.pos_x ?? 50 + index * 100,
                        y: table.pos_y ?? 50 + index * 100,
                        width: table.width,
                        height: table.height,
                    }}
                    onDragStop={(e, d) => {
                        handleSave(
                            table.id,
                            d.x,
                            d.y,
                            table.width,
                            table.height
                        );
                    }}
                    onResizeStop={(e, direction, ref, delta, position) => {
                        const newWidth = parseInt(ref.style.width, 10);
                        const newHeight = parseInt(ref.style.height, 10);
                        handleSave(
                            table.id,
                            position.x,
                            position.y,
                            newWidth,
                            newHeight
                        );
                    }}
                    className="bg-white border border-gray-400 shadow-md rounded-md flex items-center justify-center text-sm font-semibold"
                >
                    {table.name}
                </Rnd>
            ))}
        </div>
    );
}
