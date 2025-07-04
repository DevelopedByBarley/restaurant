import { Link, useForm } from "@inertiajs/react";
import SocialButtons from "../../components/SocialButtons";

export default function Login() {
	const { data, setData, post, processing, errors } = useForm({
		email: "",
		password: "",
		remember: false,
	});

	function submit(e) {
		e.preventDefault();
		post("/login");
	}

	return (
		<form onSubmit={submit} class="py-16">
			<div class="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-6xl">
				<div class="hidden lg:block lg:w-1/2 bg-cover"
					style={{ "backgroundImage": "url('https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80')" }}>
				</div>
				<div class="w-full p-8 lg:w-1/2">
					<h2 class="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
					<p class="text-xl text-gray-600 text-center">Welcome back!</p>
					<SocialButtons />
					<div class="mt-4 flex items-center justify-between">
						<span class="border-b w-1/5 lg:w-1/4"></span>
						<a href="#" class="text-xs text-center text-gray-500 uppercase">or login with email</a>
						<span class="border-b w-1/5 lg:w-1/4"></span>
					</div>
					<div class="mt-4">
						<label class="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
						<input
							value={data.email}
							onChange={(e) => setData("email", e.target.value)} class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="email" />
						{errors.email && <div className="text-red-500 text-sm">{errors.email}</div>}

					</div>
					<div class="mt-4">
						<div class="flex justify-between">
							<label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
							<Link href={"/forgot-password"} class="text-xs text-gray-500">Forget Password?</Link>
						</div>
						<input
							value={data.password}
							onChange={(e) => setData("password", e.target.value)}
							class="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" type="password" />
						{errors.password && <div className="text-red-500 text-sm">{errors.password}</div>}

					</div>
					<div class="mt-8">
						<button class="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
					</div>
					<div class="mt-4 flex items-center justify-between">
						<span class="border-b w-1/5 md:w-1/4"></span>
						<a href="#" class="text-xs text-gray-500 uppercase">or sign up</a>
						<span class="border-b w-1/5 md:w-1/4"></span>
					</div>
				</div>
			</div>
		</form>
	)
}
