export const exceptionService = {
    submitException: async (data, post, reset) => {
        post("/admin/exceptions", {
            data: {
                date: data.date,
                reason: data.reason || null, // reason is optional
            },
            onSuccess: () => {
                reset();
            },
            onError: (errors) => {
                console.error("Hiba:", errors);
            },
        });
    }
};
