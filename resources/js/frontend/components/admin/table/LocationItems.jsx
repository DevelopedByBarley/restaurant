export default function LocationItems({ locations, activeLocationId, setActiveLocationId }) {
    return (
        <div className="flex gap-4 mt-6 mb-8 flex-wrap">
            {locations.map((location) => (
                <button
                    key={location.id}
                    onClick={() => setActiveLocationId(location.id)}
                    className={`px-4 py-2 rounded ${
                        location.id === activeLocationId
                            ? "bg-indigo-600 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    {location.name}
                </button>
            ))}
        </div>
    );
}
