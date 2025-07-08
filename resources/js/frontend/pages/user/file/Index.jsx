import { useForm, usePage } from "@inertiajs/react";
import UserLayout from "../../../layouts/UserLayout";
import { useState } from "react";

function Index() {
    const { auth } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!data.file) {
            alert("Kérjük, válassz ki egy fájlt.");
            return;
        }

        post('/file', {
            forceFormData: true,
            onSuccess: () => {
                // Feltöltés után nullázhatod, ha kell:
                setData("file", null);
            },
        });
    };

    const handleFileChange = (e) => {
        setData("file", e.target.files[0]);
    };

    console.log(auth.user);

    return (
        <div className="container mx-auto px-4 py-8 p-4 xl:ml-80 text-center">
            <h1 className="font-bold text-2xl">Profilkép frissítése</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
                Itt tudod frissíteni a profilképedet.
            </p>

            <div className="my-6">
                <img
                    src={auth.user.file ? "/storage/" + auth.user.file : "/storage/profile.png"}
                    alt="Profilkép"
                    className="mx-auto rounded-full w-32 h-32 object-cover"
                />
                <p className="text-gray-500 mt-2">Jelenlegi profilkép</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="flex items-center justify-center w-full">
                    <label
                        htmlFor="dropzone-file"
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">
                                    Kattints feltöltéshez
                                </span>{" "}
                                vagy húzd ide a fájlt
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG vagy GIF (max 800x400px)
                            </p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>

                {errors.file && (
                    <p className="text-red-500 mt-2">{errors.file}</p>
                )}

                <button
                    type="submit"
                    disabled={processing}
                    className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                    {processing ? "Feltöltés..." : "Profilkép feltöltése"}
                </button>
            </form>
        </div>
    );
}

Index.layout = (page) => <UserLayout children={page} />;

export default Index;
