import { router } from '@inertiajs/react';
export default function Test() {


    const handleCheckout = () => {
        router.post(
            '/checkout',
            {
                products: [
                    { price_id: 'price_1RiY1nQLRSLLxNpAogMBaUK0', quantity: 2 },
                    { price_id: 'price_1RiYWlQLRSLLxNpAqZb5Zfom', quantity: 1 },
                ],
            },
            {
                preserveScroll: true,
                onSuccess: (page) => {
                    // Laravel JSON response elérhető itt:
                    const response = page.props?.flash?.data;
                    console.log(response);
                    if (response?.url) {
                        window.location.href = response.url;
                    } else {
                        alert('Nem sikerült elindítani a fizetést.');
                    }
                },
                onError: (errors) => {
                    console.error(errors);
                    alert('Valami hiba történt.');
                },
            }
        );
    };

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
        <div>
          <div
            className="relative w-[800px] h-[600px] bg-gray-100 border"
            onClick={handleAddTable}
          >
            {tables.map((table, index) => (
              <Rnd
                key={table.id}
                size={{ width: table.width, height: table.height }}
                position={{ x: table.x, y: table.y }}
                onDragStop={(e, d) => handleDragStop(index, d)}
                onResizeStop={(e, direction, ref, delta, position) =>
                  handleResizeStop(index, direction, ref, delta, position)
                }
                bounds="parent"
              >
                <div className="bg-green-500 text-white text-sm w-full h-full flex items-center justify-center rounded">
                  {table.name}
                </div>
              </Rnd>
            ))}
          </div>

          <button
            onClick={saveToServer}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Mentés
          </button>
        </div>
      );
    }
    


    return (
        <>
            <div class="relative overflow-hidden before:absolute before:top-0 before:start-1/2 before:bg-[url('https://preline.co/assets/svg/examples/squared-bg-element.svg')] dark:before:bg-[url('https://preline.co/assets/svg/examples-dark/squared-bg-element.svg')] before:bg-no-repeat before:bg-top before:size-full before:-z-1 before:transform before:-translate-x-1/2">
                <div class="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
                    <div class="flex justify-center">
                        <a class="inline-flex items-center gap-x-2 bg-white border border-gray-200 text-xs text-gray-600 p-2 px-3 rounded-full transition hover:border-gray-300 focus:outline-hidden focus:border-gray-300 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-600 dark:focus:border-neutral-600" href="#">
                            Explore the Capital Product
                            <span class="flex items-center gap-x-1">
                                <span class="border-s border-gray-200 text-blue-600 ps-2 dark:text-blue-500 dark:border-neutral-700">Explore</span>
                                <svg class="shrink-0 size-4 text-blue-600" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                            </span>
                        </a>
                    </div>

                    <div class="mt-5 max-w-xl text-center mx-auto">
                        <h1 class="block font-bold text-gray-800 text-4xl md:text-5xl lg:text-6xl dark:text-neutral-200">
                            Supercharged Preline Experience
                        </h1>
                    </div>

                    <div class="mt-5 max-w-3xl text-center mx-auto">
                        <p class="text-lg text-gray-600 dark:text-neutral-400">Preline is a large open-source project, crafted with Tailwind CSS framework by Hmlstream.</p>
                    </div>
                    <div class="mt-8 gap-3 flex justify-center">
                        <a class="inline-flex justify-center items-center gap-x-3 text-center bg-linear-to-tl from-blue-600 to-violet-600 hover:from-violet-600 hover:to-blue-600 focus:outline-hidden focus:from-violet-600 focus:to-blue-600 border border-transparent text-white text-sm font-medium rounded-full py-3 px-4" href="#">
                            <svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                            </svg>
                            Continue with Github
                        </a>
                    </div>
                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={handleCheckout}
                            className="inline-flex items-center gap-x-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-full shadow transition"
                        >
                            Fizetés indítása
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}
