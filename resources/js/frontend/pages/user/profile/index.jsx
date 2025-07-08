import { Link, useForm, usePage } from "@inertiajs/react";
import UserLayout from "../../../layouts/UserLayout";
import { useState } from "react";
import DangerModal from "../../../components/modals/DangerModal";
import IndigoBtn from "../../../components/IndigoBtn";

function Index() {
    const { auth } = usePage().props;
    const [deleteModalActive, setDeleteModalActive] = useState(false);
    const { post, delete: destroy } = useForm();

    const sendVerificationEmail = () => {
        post(
            "/email/verification-notification",
            {},
            {
                onSuccess: (page) => {
                    console.log(page);
                },
                onError: () => {
                    console.log("PROBLÉMA");
                },
            }
        );
    };

    const deleteProfile = (e) => {
        e.preventDefault(); // Fontos!
        destroy(`/user/${auth.user.id}`, {
            onSuccess: (page) => {
                console.log("Sikeres törlés", page);
            },
            onError: () => {
                console.log("PROBLÉMA");
            },
        });
    };

    return (
        <div class="min-h-screen bg-gray-50/50">
            <div class="p-4 xl:ml-80">
                <div class="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">
                            Profil
                        </h2>
                        <p className="mt-1 text-sm/6 text-gray-600">
                            Ezek az információk nyilvánosan megjelennek, így
                            légy óvatos, mit osztasz meg.
                        </p>

                        {auth.user.email_verified_at ? (
                            <span className="inline-block mt-2 px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                E-mail megerősítve
                            </span>
                        ) : (
                            <div className="mt-2 flex items-center gap-2">
                                <span className="text-red-600 text-xs">
                                    E-mail nincs megerősítve
                                </span>
                                <button
                                    onClick={sendVerificationEmail}
                                    className="bg-red-500 py-1 px-2 text-white rounded"
                                >
                                    E-mail megerősítése
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div class="p-4 xl:ml-80">
                <div class="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 font-semibold text-gray-900">
                            Személyes adatok
                        </h2>

                        <div className="md:grid grid-cols-4 gap-2 py-5">
                            <div className="py-5    ">
                                <img
                                    src={
                                        auth.user.file
                                            ? "/storage/" + auth.user.file
                                            : "/storage/profile.png"
                                    }
                                    className="object-contain h-28 w-28"
                                    alt=""
                                />
                                <IndigoBtn className="text-xs mt-2">
                                    <Link href={"/file"}>Kép frissítése</Link>
                                </IndigoBtn>
                            </div>
                            <div className=" col-span-1 flex justify-center flex-col">
                                <div>
                                    <p>
                                        <span className="font-bold">Név: </span>
                                        {auth.user.name}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-bold">
                                            Email:{" "}
                                        </span>
                                        {auth.user.email}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-bold">
                                            Létrehozva:{" "}
                                        </span>
                                        {new Date(
                                            auth.user.created_at
                                        ).toLocaleDateString("hu-HU")}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        <span className="font-bold">
                                            Profil frissítve:{" "}
                                        </span>
                                        {new Date(
                                            auth.user.updated_at
                                        ).toLocaleDateString("hu-HU")}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="p-4 xl:ml-80">
                <div class="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base/7 mb-5 font-semibold text-gray-900">
                            Műveletek
                        </h2>

                        <div className="flex gap-2">
                            <button
                                onClick={() => setDeleteModalActive(true)}
                                className="bg-red-500 text-white p-2"
                            >
                                Profil törlése
                            </button>
                            {deleteModalActive && (
                                <DangerModal
                                    isOpen={deleteModalActive}
                                    onClose={() => setDeleteModalActive(false)}
                                    onConfirm={deleteProfile}
                                    message={
                                        "Biztosan törölni akarod a profilodat, ezzel minden mentett adatod elveszik!"
                                    }
                                />
                            )}
                            <Link
                                href={`/user/${auth.user.id}/edit`}
                                className="bg-orange-400 text-white p-2"
                            >
                                Profil frissítése
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

Index.layout = (page) => <UserLayout>{page}</UserLayout>;

export default Index;
