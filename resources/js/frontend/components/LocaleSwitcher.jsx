import { usePage } from "@inertiajs/react";
import { router } from "@inertiajs/react";

export default function LocaleSwitcher() {
    const { locale } = usePage().props;

    const handleChange = (e) => {
        const selectedLocale = e.target.value;
        router.get('/locale/' + selectedLocale, {}, {
            preserveScroll: true,
            preserveState: true,
        });
    };

    return (
        <select
            value={locale.current} // 🛠 Use `locale.current`
            onChange={handleChange}
            className="ml-4 px-2 py-1 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            aria-label="Nyelv választása"
        >
            <option value="en">English</option>
            <option value="hu">Magyar</option>
        </select>
    );
}
