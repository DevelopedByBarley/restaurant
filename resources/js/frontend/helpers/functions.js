import { usePage } from "@inertiajs/react";

export default function urlIs(path) {
    const { url } = usePage();
    console.log(url, path)
    return url === path;
}
