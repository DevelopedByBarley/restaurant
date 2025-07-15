export const tableService = {
    deleteTable: async (tableDestroy, tableId, tableReset) => {
        if (confirm("Biztosan törölni szeretnéd ezt az asztalt?")) {
            await tableDestroy(`/admin/tables/${tableId}`, {
                onSuccess: () => {
                    tableReset();
                    console.log("Asztal törölve:", tableId);
                },
                onError: (errors) => {
                    console.error("Hiba törlés közben:", errors);
                },
            });
        }
    },

    submitTable: async (e, tableData, tablePost, tableReset, setCreateModalOpen) => {
        e.preventDefault();

        const formData = {
            ...tableData,

        };

        tablePost("/admin/tables", {
            data: formData,
            onSuccess: () => {
                tableReset();
                setCreateModalOpen(false);
            },
            onError: (errors) => {
                console.error("Hiba:", errors);
            },
            onFinish: () => {
                console.log("Kérelem befejezve");
                tableReset();
                setCreateModalOpen(false);
            },
            onClose: () => {
                console.log("Modal bezárva");
                tableReset();
                setCreateModalOpen(false);
                // Ha szükséges, itt is bezárhatod a modalt
                onClose();
            },
        });
    },

    updateTable: async (id, tableData, tablePatch, tableReset, setEditModalOpen) => {
        if (confirm("Biztosan frissíteni szeretnéd ezt az asztalt?")) {
            tablePatch(`/admin/tables/${id}`, {
                tableData: {
                    ...tableData,
                    pos_x:
                        tableData.pos_x === "" ? null : Number(tableData.pos_x),
                    pos_y:
                        tableData.pos_y === "" ? null : Number(tableData.pos_y),
                },
                onSuccess: () => {
                    console.log("Asztal frissítve:", id);
                    // Esetleg itt végezhetsz el további műveleteket, pl. újratöltés
                    tableReset();
                    setEditModalOpen(false);
                },
                onError: (errors) => {
                    console.error("Hiba frissítés közben:", errors);
                    // Itt kezelheted a hibákat, pl. megjelenítheted őket a felületen
                },
                onFinish: () => {
                    // Esetleg itt végezhetsz el további műveleteket, pl. újratöltés
                    console.log("Kérelem befejezve");
                    tableReset();
                    setEditModalOpen(false);
                },
                onClose: () => {
                    // Esetleg itt végezhetsz el további műveleteket, pl. újratöltés
                    console.log("Modal bezárva");
                    tableReset();
                    setEditModalOpen(false);
                    // Ha szükséges, itt is bezárhatod a modalt
                },
            });
        }
    },

    save: async (table, data, router) => {
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
                    withCredentials: true,
                }
            )
            .then(() => {
                console.log(`Table ${table.id} saved:`, data);
                router.visit("/admin/tables", {
                    method: "get",
                    preserveScroll: true,
                    preserveState: true,
                    only: ["locations", "tables", "blocks"],
                });
            })
            .catch((err) => {
                console.error("Error saving table position:", err);
            });
    }


};
