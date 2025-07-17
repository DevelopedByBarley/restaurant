export const ErrorMessage = ({ data, field }) => {
    return (
        <>
            {data.errors && data.errors[field] && (
                <div className="text-red-500 text-sm">
                    {data.errors[field]}
                </div>
            )}
        </>
    );
};
