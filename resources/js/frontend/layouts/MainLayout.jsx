import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <div className="mt-14">{children}</div>
        </>
    );
}
