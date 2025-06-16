import AdminNavbar from "../components/AdminNavbar";

export default function AdminLayout({ children }) {
    return (
        <>
            <AdminNavbar />
            <div className="mt-14">{children}</div>
        </>
    );
}
