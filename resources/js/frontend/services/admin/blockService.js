export const blockService = {


    submitBlock: async (e, blockData, blockPost, blockReset, setCreateBlockModalOpen) => {
        e.preventDefault();
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


};
