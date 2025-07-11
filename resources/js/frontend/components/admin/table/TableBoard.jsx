import DefaultTable from "./DefaultTable";

export default function TableBoard({ tables, onSave }) {
    return (
        <div className="relative w-full h-[500px] border border-gray-300  bg-[repeating-linear-gradient(90deg,_rgba(255,255,255,0.9)_0px,_rgba(255,255,255,0.9)_10px,_rgba(204,251,241,0.15)_10px,_rgba(204,251,241,0.15)_20px)] rounded">
            {tables.map((table) => (
              <DefaultTable key={table.id} table={table} onSave={onSave}  />
            ))}
        </div>
    );
}

