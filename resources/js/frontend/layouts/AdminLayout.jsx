import AdminNavbar from "../components/AdminNavbar";
import FlashMessages from "../components/FlashMessage";

export default function AdminLayout({ children }) {
    return (
        <>
            <AdminNavbar />
            <FlashMessages />
            <div className="mt-14">{children}</div>
        </>
    );
}
