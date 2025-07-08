import { useForm, usePage } from "@inertiajs/react";
import UserLayout from "../../../layouts/UserLayout";
import IndigoBtn from "../../../components/IndigoBtn";

function Edit() {
    const { auth } = usePage().props;

    // Form state
    const { data, setData, post, patch, reset, errors, processing } = useForm({
        name: auth.user.name ?? "",
        email: auth.user.email ?? "",
        current_password: "",
        password: "",
        password_confirmation: "",
    });

    // E-mail verification
    const sendVerificationEmail = () => {
        post(
            "/email/verification-notification",
            {},
            {
                onSuccess: () => {
                    console.log("Verification email sent.");
                },
                onError: () => {
                    console.log("Hiba történt az e-mail küldésekor.");
                },
            }
        );
    };

    // Profile update
    const updateProfile = (e) => {
        e.preventDefault();
        patch("/user/" + auth.user.id, {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Profil frissítve.");
            },
            onError: () => {
                console.log("Hiba a profil frissítésekor.");
            },
        });
    };

    // Password update
    const updatePw = (e) => {
        e.preventDefault();
        patch("/update-password/" + auth.user.id, {
            preserveScroll: true,
            onSuccess: () => {
                console.log("Jelszó frissítve.");
                reset("current_password", "password", "password_confirmation");
            },
            onError: () => {
                console.log("Hiba a jelszó frissítésekor.");
            },
        });
    };

    return (
        <div className="min-h-screen bg-gray-50/50">
            <div className="p-4 xl:ml-80">
                <div className="space-y-12">
                    {/* E-mail Verification Status */}
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold text-gray-900">
                            Profil szerkesztése
                        </h2>
                        <p className="mt-1 text-sm text-gray-600">
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
                                    className="bg-red-500 py-1 px-2 text-white rounded text-sm"
                                >
                                    E-mail megerősítése
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Personal Info */}
                    <form onSubmit={updateProfile}>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold text-gray-900">
                                Személyes adatok
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Adatok frissítéséhez kattintson az oldal alján
                                található mentés gombra.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {/* Name */}
                                <div className="sm:col-span-3">
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Név
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={data.name}
                                            onChange={(e) =>
                                                setData("name", e.target.value)
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="Teljes név megadása"
                                        />
                                        {errors.name && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.name}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Email */}
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Email cím
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            disabled={true}
                                            value={data.email}
                                            onChange={(e) =>
                                                setData("email", e.target.value)
                                            }
                                            className="disabled block w-full rounded-md bg-slate-100 px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                                        />
                                        {errors.email && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.email}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="col-span-full my-6 flex items-center justify-start gap-x-6">
                                    <IndigoBtn
                                        type="submit"
                                        disabled={processing}
                                    >
                                        Profil frissítése
                                    </IndigoBtn>
                                </div>
                            </div>
                        </div>
                    </form>

                    {/* Password Update */}
                    <form onSubmit={updatePw}>
                        <div className="border-b border-gray-900/10 pb-12">
                            <h2 className="text-base font-semibold text-gray-900">
                                Jelszó beállítása
                            </h2>
                            <p className="mt-1 text-sm text-gray-600">
                                Jelszó frissítéséhez adja meg a jelenlegi
                                jelszót és az új jelszót.
                            </p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                {/* Current Password */}
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="current_password"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Jelenlegi jelszó
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            id="current_password"
                                            name="current_password"
                                            value={data.current_password}
                                            onChange={(e) =>
                                                setData(
                                                    "current_password",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="Jelenlegi jelszó"
                                        />
                                        {errors.current_password && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.current_password}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* New Password */}
                                <div className="sm:col-span-4">
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Új jelszó
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            value={data.password}
                                            onChange={(e) =>
                                                setData(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="Új jelszó"
                                        />
                                        {errors.password && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.password}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Confirm New Password */}
                                <div className="sm:col-span-4 ">
                                    <label
                                        htmlFor="password_confirmation"
                                        className="block text-sm font-medium text-gray-900"
                                    >
                                        Új jelszó megerősítése
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            type="password"
                                            id="password_confirmation"
                                            name="password_confirmation"
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    "password_confirmation",
                                                    e.target.value
                                                )
                                            }
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                                            placeholder="Jelszó megerősítése"
                                        />
                                        {errors.password_confirmation && (
                                            <p className="text-sm text-red-600 mt-1">
                                                {errors.password_confirmation}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="my-6 flex items-center justify-start gap-x-6">
                                <IndigoBtn type="submit" disabled={processing}>
                                    Jelszó frissítése
                                </IndigoBtn>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

Edit.layout = (page) => <UserLayout>{page}</UserLayout>;

export default Edit;
