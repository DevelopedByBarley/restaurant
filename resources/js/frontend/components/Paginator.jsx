import { Link } from "@inertiajs/react";

export default function Paginator({ data }) {
    return (
        <>
            {data.links.length > 1 && (
                <div className="my-4">
                    <nav className="flex space-x-2">
                        {data.links.map((link, index) => (
                            <Link
                                key={index}
                                href={link.url || '#'}
                                className={`px-4 py-2 rounded-md text-sm ${link.active
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                                    } ${!link.url ? "pointer-events-none opacity-50" : ""}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                </div>
            )}
        </>
    )
}
