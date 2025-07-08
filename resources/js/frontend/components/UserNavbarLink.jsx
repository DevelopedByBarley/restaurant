import { Link } from "@inertiajs/react";
import urlIs from "../helpers/functions";

export default function UserNavbarLink({route, children}) {
    return (
        <Link aria-current="page" href={route}>
            <button className={` ${urlIs(route) ? 'from-blue-600 to-blue-400 shadow-blue-500/20  hover:shadow-blue-500/40' : ''}middle hover:bg-slate-700 none font-sans font-bold center transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 rounded-lg bg-gradient-to-tr  text-white shadow-md active:opacity-[0.85] w-full flex items-center gap-4 px-4 capitalize" type="button`}>
                <p className="block antialiased font-sans text-base leading-relaxed text-inherit font-medium capitalize">{children}</p>
            </button>
        </Link>
    )
}
