export default function AdminHeader({children}) {
    return (
        <section className="w-full p-8 bg-white rounded-md shadow-md dark:bg-gray-800">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
                {children}
            </h2>

        </section>
    )
}
