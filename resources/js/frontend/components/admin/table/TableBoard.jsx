import DefaultTable from "./DefaultTable";

export default function TableBoard({ tables, setEditModalOpen, setCurrentTable, setData }) {
    return (
        <div className="relative w-[1200px] h-[500px] overflow-scroll border border-gray-300  bg-[repeating-linear-gradient(90deg,_rgba(255,255,255,0.9)_0px,_rgba(255,255,255,0.9)_10px,_rgba(204,251,241,0.15)_10px,_rgba(204,251,241,0.15)_20px)] rounded">
            {tables.map((table) => (
              <DefaultTable key={table.id} table={table} setEditModalOpen={setEditModalOpen} setCurrentTable={setCurrentTable}  setData={setData}/>
            ))}
        </div>
    );
}

