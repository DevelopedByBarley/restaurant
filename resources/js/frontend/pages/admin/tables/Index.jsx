import { useForm, usePage } from "@inertiajs/react";

import AdminLayout from "../../../layouts/AdminLayout";
import IndigoBtn from "../../../components/IndigoBtn";
import { useState } from "react";
import TableBoard from "../../../components/admin/table/TableBoard";
import AdminHeader from "../../../components/admin/AdminHeader";
import CreateTableModal from "../../../components/admin/components/CreateTableModal";
import EditTableModal from "../../../components/admin/components/EditTableModal";
import CreateBlockModal from "../../../components/admin/components/CreateBlockModal";
import { tableService } from "../../../services/admin/TableService";
import { blockService } from "../../../services/admin/BlockService";
import LocationItems from "../../../components/admin/table/LocationItems";
import TableList from "../../../components/admin/table/TableList";

function Index() {
    const { locations } = usePage().props;
    const [activeLocationId, setActiveLocationId] = useState(
        locations.length > 0 ? locations[0].id : 0
    );

    const activeLocation = locations.find(
        (location) => location.id === activeLocationId
    );

    const [createTableModalOpen, setCreateTableModalOpen] = useState(false);
    const [editTableModalOpen, setEditTableModalOpen] = useState(false);

    const [createBlockModalOpen, setCreateBlockModalOpen] = useState(false);

    const {
        data: tableData,
        setData: setTableData,
        post: tablePost,
        delete: tableDestroy,
        processing: tableProcessing,
        reset: tableReset,
        errors: tableErrors,
        patch: tablePatch,
    } = useForm({
        location_id: "",
        name: "",
        type: "table",
        color: "bg-rose-400",
        seats: "",
        pos_x: "",
        pos_y: "",
    });

    const {
        data: blockData,
        setData: setBlockData,
        post: blockPost,
        delete: blockDestroy,
        processing: blockProcessing,
        reset: blockReset,
        errors: blockErrors,
        patch: blockPatch,
    } = useForm({
        location_id: "",
        name: "",
        type: "block",
        color: "bg-slate-600",
        pos_x: "",
        pos_y: "",
    });

    const handleBlockSubmit = (e) => {
        blockService.submitBlock(
            e,
            blockData,
            blockPost,
            blockReset,
            setCreateBlockModalOpen
        );
    }; 

    const handleTableDelete = (id) => {
        tableService.deleteTable(tableDestroy, id, tableReset);
        setEditTableModalOpen(false);

    };

    const handleTableUpdate = (id) => {
        tableService.updateTable(
            id,
            tableData,
            tablePatch,
            tableReset,
            setEditTableModalOpen
        );
    };

    return (
        <>
            <AdminHeader>
                <span className="block"> Asztalok beállítása</span>

                <div className="flex gap-3 mt-3">
                    <IndigoBtn className="text-xs">
                        <span onClick={() => setCreateTableModalOpen(true)}>
                            + Asztal
                        </span>
                    </IndigoBtn>
                    <IndigoBtn className="text-xs">
                        <span onClick={() => setCreateBlockModalOpen(true)}>
                            + Blokk
                        </span>
                    </IndigoBtn>
                </div>
            </AdminHeader>

            <LocationItems
                locations={locations}
                activeLocationId={activeLocationId}
                setActiveLocationId={setActiveLocationId}
            />

            <TableBoard
                activeLocation={activeLocation}
                tables={activeLocation.tables}
                blocks={activeLocation.blocks}
                setBlockData={setBlockData}
                setEditTableModalOpen={setEditTableModalOpen}
                setTableData={setTableData}
            />

            {editTableModalOpen && (
                <EditTableModal
                    setEditTableModalOpen={setEditTableModalOpen}
                    locations={locations}
                    data={tableData}
                    setData={setTableData}
                    errors={tableErrors}
                    handleSubmit={(e) => {
                        handleTableUpdate(tableData.id);
                        setEditTableModalOpen(false);
                    }}
                    handleTableDelete={handleTableDelete}
                />
            )}

            {createBlockModalOpen && (
                <CreateBlockModal
                    setCreateTableModalOpen={setCreateBlockModalOpen}
                    locations={locations}
                    data={blockData}
                    setData={setBlockData}
                    errors={blockErrors}
                    handleSubmit={handleBlockSubmit}
                />
            )}

            {createTableModalOpen && (
                <CreateTableModal
                    setCreateTableModalOpen={setCreateTableModalOpen}
                    locations={locations}
                    data={tableData}
                    setData={setTableData}
                    errors={tableErrors}
                    tablePost={tablePost}
                    tableReset={tableReset}
                />
            )}

            <div className="relative overflow-x-auto sm:rounded-lg">
                {activeLocation && activeLocation.tables.length === 0 ? (
                    <div className="p-6 text-gray-600 dark:text-gray-300 text-center flex items-center justify-center flex-col gap-2">
                        Nincs elérhető asztal ezen a helyszínen.
                    </div>
                ) : (
                    <>
                        <TableList
                            activeLocation={activeLocation}
                            setEditTableModalOpen={setEditTableModalOpen}
                            setTableData={setTableData}
                            handleTableDelete={handleTableDelete}
                        />
                    </>
                )}
            </div>
        </>
    );
}

Index.layout = (page) => <AdminLayout>{page}</AdminLayout>;

export default Index;
