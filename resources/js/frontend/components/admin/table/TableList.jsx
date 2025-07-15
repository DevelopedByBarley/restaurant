export default function TableList({
    activeLocation,
    setEditTableModalOpen,
    setCurrentTable,
    setTableData,
    handleTableDelete,
}) {
    return (
        <table className="w-full text-sm shadow-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <caption className="p-5 text-lg font-semibold text-left rtl:text-right text-gray-900 bg-white dark:text-white dark:bg-gray-800">
                {activeLocation?.name} asztalai
                <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                    Az alábbi táblázat tartalmazza az összes elhelyezett és
                    mentett asztalt az adatbázisból.
                </p>
            </caption>

            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 text-center">
                <tr>
                    <th className="px-6 py-3">Név</th>
                    <th className="px-6 py-3">Férőhely</th>
                    <th className="px-6 py-3">Műveletek</th>
                </tr>
            </thead>

            <tbody className="text-center">
                {activeLocation?.tables.map((table) => (
                    <tr
                        key={table.id}
                        className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {table.name}
                        </td>
                        <td className="px-6 py-4">{table.seats}</td>
                        <td className="px-6 py-4 text-right">
                            <button
                                onClick={() => {
                                    setEditTableModalOpen(true);
                                    setTableData({
                                        id: table.id,
                                        location_id: table.location_id,
                                        name: table.name,
                                        seats: table.seats,
                                        color: table.color,
                                        pos_x: table.pos_x,
                                        pos_y: table.pos_y,
                                        width: table.width,
                                        height: table.height,
                                    });
                                    setCurrentTable(table);
                                }}
                                className="bg-orange-500 hover:bg-orange-500 text-white font-semibold py-2 px-4 rounded mr-2 transition"
                            >
                                Szerkesztés
                            </button>

                            <button
                                onClick={() => handleTableDelete(table.id)}
                                className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded mr-2 transition"
                            >
                                Törlés
                            </button>
                            <a
                                href={`/admin/tables/${table.id}/reservations`}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded transition"
                            >
                                Foglalások
                            </a>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
