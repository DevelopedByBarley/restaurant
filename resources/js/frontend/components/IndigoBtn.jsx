export default function IndigoBtn({
    children,
    type = "button",
    className = "",
}) {
    return (
        <button
            className={`bg-indigo-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 ${className}`}
            type={type}
        >
            {children}
        </button>
    );
}
