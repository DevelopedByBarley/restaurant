import { Rnd } from "react-rnd";
import { useState } from "react";

export default function Home({ initialTables = [] }) {
    const [tables, setTables] = useState(initialTables);

    const handleAddTable = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const newTable = {
            id: Date.now(), // ideiglenes frontend ID
            name: `Asztal ${tables.length + 1}`,
            x,
            y,
            width: 60,
            height: 60,
            isNew: true,
        };

        setTables([...tables, newTable]);
    };

    const handleDragStop = (index, d) => {
        const newTables = [...tables];
        newTables[index].x = d.x;
        newTables[index].y = d.y;
        setTables(newTables);
    };

    const handleResizeStop = (index, direction, ref, delta, position) => {
        const newTables = [...tables];
        newTables[index].width = parseInt(ref.style.width);
        newTables[index].height = parseInt(ref.style.height);
        newTables[index].x = position.x;
        newTables[index].y = position.y;
        setTables(newTables);
    };

    const saveToServer = async () => {
        // itt küldd POST/PUT kérésben a Laravel backendnek
        console.log("Mentés", tables);
    };

    return (
        <>
            <div class="bg-base-100">


                <main class="h-screen">
                    <div
                        class="flex h-full flex-col justify-between gap-18 overflow-x-hidden pt-40 md:gap-24 md:pt-45 lg:gap-35 lg:pt-47.5"
                    >
                        <div
                            class="mx-auto flex max-w-7xl flex-col items-center gap-8 justify-self-center px-4 text-center sm:px-6 lg:px-8"
                        >
                            <div class="bg-base-200 border-base-content/20 flex w-fit items-center gap-2.5 rounded-full border px-3 py-2">
                                <span class="badge badge-primary shrink-0 rounded-full">AI-Powered</span>
                                <span class="text-base-content/80">Solution for client-facing businesses</span>
                            </div>
                            <h1
                                class="text-base-content relative z-1 text-5xl leading-[1.15] font-bold max-md:text-2xl md:max-w-3xl md:text-balance"
                            >
                                <span>Sizzling Summer Delights Effortless Recipes for Parties!</span>
                                <svg
                                    width="223"
                                    height="12"
                                    viewBox="0 0 223 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    class="absolute -bottom-1.5 left-10 -z-1 max-lg:left-4 max-md:hidden"
                                >
                                    <path
                                        d="M1.30466 10.7431C39.971 5.28788 76.0949 3.02 115.082 2.30401C143.893 1.77489 175.871 0.628649 204.399 3.63102C210.113 3.92052 215.332 4.91391 221.722 6.06058"
                                        stroke="url(#paint0_linear_10365_68643)"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                    />
                                    <defs>
                                        <linearGradient
                                            id="paint0_linear_10365_68643"
                                            x1="19.0416"
                                            y1="4.03539"
                                            x2="42.8362"
                                            y2="66.9459"
                                            gradientUnits="userSpaceOnUse"
                                        >
                                            <stop offset="0.2" stop-color="var(--color-primary)" />
                                            <stop offset="1" stop-color="var(--color-primary-content)" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </h1>
                            <p class="text-base-content/80 max-w-3xl">
                                Dive into a world of flavor this summer with our collection of Sizzling Summer Delights! From refreshing
                                appetizers to delightful desserts
                            </p>

                            <a href="#" class="btn btn-primary btn-gradient btn-lg">
                                Try it Now
                                <span class="icon-[tabler--arrow-right] size-5 rtl:rotate-180"></span>
                            </a>
                        </div>

                        <img
                            src="https://cdn.flyonui.com/fy-assets/blocks/marketing-ui/hero/hero-10.png"
                            alt="Dishes"
                            class="min-h-67 w-full object-cover"
                        />
                    </div>
                </main>
            </div>
        </>
    );
}
