export const blockService = {


    submitBlock: async (blockData, blockPost, blockReset, setCreateBlockModalOpen) => {
        const formData = {
            ...blockData,
            pos_x: blockData.pos_x === "" ? null : Number(blockData.pos_x),
            pos_y: blockData.pos_y === "" ? null : Number(blockData.pos_y),
        };

        blockPost("/admin/blocks", {
            data: formData,
            onSuccess: () => {
                blockReset();
                setCreateBlockModalOpen(false);
            },
            onError: (errors) => {
                console.error("Hiba:", errors);
            },
        });
    },

    handleSave: async (block, data, router) => {
        axios
            .post(
                `/admin/blocks/${block.id}/save`,
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
                console.log(`Block ${block.id} saved:`, data);

                router.visit("/admin/tables", {
                    method: "get",
                    preserveScroll: true,
                    preserveState: true,
                    only: ["locations", "blocks", "blocks"], // csak ezeket kérjük újra
                });
            })
            .catch((err) => {
                console.error("Error saving block position:", err);
            });
    },
    handleUpdate: async (blockPatch, data, router) => {
        blockPatch(`/admin/blocks/${data.id}`, {
            data: {
                location_id: data.location_id,
                name: data.name,
            },
            onSuccess: () => {
                console.log("Block updated successfully");
                router.visit("/admin/tables", {
                    method: "get",
                    preserveScroll: true,
                    preserveState: true,
                    only: ["locations", "blocks", "tables"],
                });
            },
            onError: (errors) => {
                console.error("Hiba:", errors);
            },
        });
    },


};
