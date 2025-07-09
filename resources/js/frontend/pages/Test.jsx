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




    return (
        <>
            <div class="bg-base-100">
                <header class="border-base-content/20 bg-base-100 fixed top-0 z-10 w-full border-b py-0.25">
                    <nav class="navbar mx-auto max-w-7xl rounded-b-xl px-4 sm:px-6 lg:px-8">
                        <div class="w-full lg:flex lg:items-center lg:gap-2">
                            <div class="navbar-start items-center justify-between max-lg:w-full">
                                <a class="text-base-content flex items-center gap-3 text-xl font-bold" href="#">
                                    <img src="https://cdn.flyonui.com/fy-assets/logo/logo.png" class="size-8" alt="brand-logo" />
                                    FlyonUI
                                </a>
                                <div class="flex items-center gap-5 lg:hidden">
                                    <a href="#" class="btn btn-primary">Login</a>
                                    <button
                                        type="button"
                                        class="collapse-toggle btn btn-outline btn-secondary btn-square"
                                        data-collapse="#navbar-block-4"
                                        aria-controls="navbar-block-4"
                                        aria-label="Toggle navigation"
                                    >
                                        <span class="icon-[tabler--menu-2] collapse-open:hidden size-5.5"></span>
                                        <span class="icon-[tabler--x] collapse-open:block hidden size-5.5"></span>
                                    </button>
                                </div>
                            </div>
                            <div
                                id="navbar-block-4"
                                class="lg:navbar-center transition-height collapse hidden grow overflow-hidden font-medium duration-300 lg:flex"
                            >
                                <div class="text-base-content flex gap-6 text-base max-lg:mt-4 max-lg:flex-col lg:items-center">
                                    <a href="#" class="hover:text-primary">Home</a>
                                    <a href="#" class="hover:text-primary">Products</a>
                                    <a href="#" class="hover:text-primary">About Us</a>
                                    <a href="#" class="hover:text-primary">Contacts</a>
                                </div>
                            </div>
                            <div class="navbar-end max-lg:hidden">
                                <a href="#" class="btn btn-primary">Login</a>
                            </div>
                        </div>
                    </nav>
                </header>

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
