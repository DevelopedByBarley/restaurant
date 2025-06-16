export default function Home() {
    return (
        <div
            className="relative bottom min-h-screen w-full bg-cover bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://bucket.material-tailwind.com/magic-ai/bf4749de9573ee9d64b6b9f5762a691da04cf18776b02a24c1a25d4009f4fb9e.jpg')",
            }}
        >
            <div className="absolute inset-0 w-full h-full bg-gray-900/50"></div>
            <div className="grid min-h-screen px-8">
                <div className="container relative z-10 grid mx-auto my-auto text-center place-items-center">
                    <h3 className="block antialiased tracking-normal font-sans font-semibold text-white mb-2 text-lg !leading-snug lg:text-2xl"></h3>
                    <h1 className="block antialiased tracking-normal font-sans font-semibold text-white text-3xl !leading-snug lg:text-5xl">
                        Welcome to Our Restaurant
                    </h1>
                    <p className="block antialiased font-sans text-xl font-normal leading-relaxed text-white mt-1 mb-12 lg:max-w-2xl">
                        Experience the best dining in town at our restaurant.
                        From delicious dishes to cozy ambiance, we have
                        everything to make your dining experience memorable.
                    </p>
                    <div className="flex items-center gap-4"></div>
                </div>
            </div>
        </div>
    );
}
