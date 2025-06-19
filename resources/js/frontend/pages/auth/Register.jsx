import { useForm } from "@inertiajs/react";
import SocialButtons from "../../components/SocialButtons";

export default function Register() {

    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        password: "",
        password_confirmation: "", // fixed typo
        remember: false,
    });

    function submit(e) {
        e.preventDefault();
        post("/register");
    }

    return (
        <form className="py-16" onSubmit={submit}>
            <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-6xl">
                <div
                    className="hidden lg:block lg:w-1/2 bg-cover"
                    style={{
                        backgroundImage:
                            "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')",
                    }}
                ></div>
                <div className="w-full p-8 lg:w-1/2">
                    <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
                    <p className="text-xl text-gray-600 text-center">Create an account</p>
                    <SocialButtons operation="register"/>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <span className="text-xs text-center text-gray-500 uppercase">or register with email</span>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                        <input
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="text"
                            placeholder="Full name"
                        />
                        {errors.name && <div className="text-red-500 text-sm">{errors.name}</div>}

                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
                        <input
                            name="email"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="email"
                            placeholder="you@example.com"
                        />
                        {errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                        <input
                            name="password"
                            value={data.password}
                            onChange={(e) => setData("password", e.target.value)}
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="password"
                            placeholder="Password"
                        />
                        {errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

                    </div>
                    <div className="mt-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
                        <input
                            name="password_confirmation"
                            value={data.password_confirmation}
                            onChange={(e) => setData("password_confirmation", e.target.value)}
                            className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none"
                            type="password"
                            placeholder="Confirm password"
                        />
                        {errors.password_confirmation && <div className="text-red-500 text-sm">{errors.password_confirmation}</div>}

                    </div>
                    <div className="mt-8">
                        <button className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">
                            Register
                        </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                        <span className="border-b w-1/5 md:w-1/4"></span>
                        <a href="#" className="text-xs text-gray-500 uppercase">
                            Already have an account?
                        </a>
                        <span className="border-b w-1/5 md:w-1/4"></span>
                    </div>
                </div>
            </div>
        </form >
    );
}

