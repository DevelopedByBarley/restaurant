export const openingService = {
    submitOpening: async (data, post, reset) => {
        post("/admin/openings", {
            data,
            onSuccess: () => reset(),
            onError: (errors) => {
                console.error(errors);
            },
        });
    }

};
