import TableItem from "./TableItem";

export default function TableBoard({
    activeLocation,
    tables,
    setEditModalOpen,
    setCurrentTable,
    setData,
}) {
    return (
        <>
            {activeLocation &&
                (activeLocation.tables.length > 0 || activeLocation.blocks.length > 0) && (
                    <>
                        <h2 className="text-lg font-semibold mb-2">Asztalok elhelyezése</h2>
                        <div className="relative w-[1200px] h-[500px] overflow-scroll border border-gray-300 bg-[repeating-linear-gradient(90deg,_rgba(255,255,255,0.9)_0px,_rgba(255,255,255,0.9)_10px,_rgba(204,251,241,0.15)_10px,_rgba(204,251,241,0.15)_20px)] rounded">
                            {tables.map((table) => (
                                <TableItem
                                    key={table.id}
                                    table={table}
                                    setEditModalOpen={setEditModalOpen}
                                    setCurrentTable={setCurrentTable}
                                    setData={setData}
                                />
                            ))}
                            {/* {blocks.map((block) => (
                                <DraggableItem
                                    key={block.id}
                                    table={block}
                                    setEditModalOpen={setEditModalOpen}
                                    setCurrentTable={setCurrentTable}
                                    setData={setBlockData}
                                />
                            ))} */}
                        </div>
                    </>
                )}
        </>
    );
}
