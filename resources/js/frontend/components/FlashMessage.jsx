import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

// Heroicons SVG-k (outline)
const icons = {
    success: (
        <svg
            className="w-5 h-5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
            />
        </svg>
    ),
    warning: (
        <svg
            className="w-5 h-5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v2m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z"
            />
        </svg>
    ),
    danger: (
        <svg
            className="w-5 h-5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    ),
    error: (
        <svg
            className="w-5 h-5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
            />
        </svg>
    ),
    info: (
        <svg
            className="w-5 h-5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 16h-1v-4h-1m1-4h.01"
            />
        </svg>
    ),
    violet: (
        <svg
            className="w-5 h-5 mr-2 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
        >
            <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
            />
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4l2 2"
            />
        </svg>
    ),
};

const alertStyles = {
    success: "bg-green-500 text-white",
    warning: "bg-yellow-500 text-black",
    danger: "bg-red-600 text-white",
    error: "bg-red-600 text-white",
    info: "bg-blue-500 text-white",
    violet: "bg-violet-600 text-white",
};

function FlashMessages() {
    const { flash } = usePage().props;
    const [showFlash, setShowFlash] = useState(false);

    console.log(showFlash);

    useEffect(() => {
        if (Object.keys(flash).length > 0) {
            setShowFlash(true);

            const timer = setTimeout(() => setShowFlash(false), 3000);
            return () => clearTimeout(timer);
        }
    }, [flash]);

    if (!showFlash) return null;

    return (
        <div id="flash" className="fixed top-5 right-5 space-y-3 z-50 max-w-xs px-4">
            {Object.entries(alertStyles).map(([type, style]) => {
                if (!flash[type]) return null;

                return (
                    <div
                        key={type}
                        className={`${style} flex items-center p-3 rounded shadow-md animate-fade-in`}
                        role="alert"
                    >
                        {icons[type]}
                        <span className="flex-1">{flash[type]}</span>
                    </div>
                );
            })}
        </div>
    );
}

export default FlashMessages;
