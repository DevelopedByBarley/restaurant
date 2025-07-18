import AdminNavbar from "../components/admin/AdminNavbar";
import FlashMessages from "../components/FlashMessage";

export default function AdminLayout({ children }) {
    return (
        <>
            <AdminNavbar />
            <FlashMessages />
            <div className="mt-14 container mx-auto">{children}</div>
        </>
    );
}
