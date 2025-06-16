import AdminLayout from "../../layouts/AdminLayout";

function Index() {
    return (
        <div className="h-screen flex items-center justify-center">
            <section className="max-w-4xl w-full p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
                <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
                    Admin Dashboard
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                    Welcome to the admin dashboard. Here you can manage your application.
                </p>
            </section>
        </div>
    );
}

Index.layout = page => <AdminLayout>{page}</AdminLayout>

export default Index
