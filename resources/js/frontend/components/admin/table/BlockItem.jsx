import { Rnd } from "react-rnd";
import axios from "axios";
import { router } from "@inertiajs/react";
import { useState } from "react";
import TapHandler from "../../../core/TapHandler";
import { blockService } from "../../../services/admin/BlockService";

export default function BlockItem({
    block,
    setEditBlockModalOpen,
    setCurrentBlock,
    setData,
}) {
    const [isDragging, setIsDragging] = useState(false);

    const handleSave = (data) => {
        blockService.handleSave(block, data, router);
    };

    return (
        <Rnd
            key={block.id}
            default={{
                x: block.pos_x || 0,
                y: block.pos_y || 0,
                width: block.width,
                height: block.height,
                type: block.type || "block",
            }}
            bounds="parent"
            onDragStop={(e, d) => {
                handleSave({
                    x: d.x,
                    y: d.y,
                    width: block.width,
                    height: block.height,
                    type: block.type || "block",
                });

                setIsDragging(false);
            }}
            onResizeStop={(e, direction, ref, delta, position) => {
                handleSave({
                    x: position.x,
                    y: position.y,
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height),
                    type: block.type || "block",
                });
                setIsDragging(false);
            }}
            onDragStart={() => setIsDragging(true)}
            onResizeStart={() => setIsDragging(true)}
            onDragEnd={() => setIsDragging(false)}
            onResizeEnd={() => setIsDragging(false)}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 4,
                cursor: "move",
                opacity: isDragging ? 0.5 : 1,
                transition: "opacity 0.2s ease",
                boxShadow: isDragging ? "0 4px 8px rgba(0, 0, 0, 0.2)" : "none",
            }}
            className={`${block.color} shadow-md`}
        >
            <TapHandler
                onDoubleTap={() => {
                    if (block.type === "block") {
                        alert("EDIT block MODAL");
                    } else {
                        alert("DELETE BLOCK MODAL");
                    }
                }}
                onDoubleClick={() => {
                    if (block.type === "block") {
                        alert("EDIT BLOCK MODAL");
                        /* setEditModalOpen(true);
                        setData({
                            id: block.id,
                            location_id: block.location_id, // helyszín ID
                            name: block.name,
                            seats: block.seats,
                            color: block.color,
                            pos_x: block.pos_x,
                            pos_y: block.pos_y,
                            width: block.width,
                            height: block.height,
                        });
                        setCurrentblock(block); */
                    } else {
                        alert("DELETE BLOCK MODAL");
                    }
                }}
                classes="flex items-center justify-center flex-col gap-1 h-full w-full p-2 rounded"
            ></TapHandler>
        </Rnd>
    );
}
