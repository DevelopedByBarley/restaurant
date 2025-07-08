import FlashMessages from "../components/FlashMessage";
import Navbar from "../components/Navbar";

export default function MainLayout({ children }) {
    return (
        <>
            <Navbar />
            <FlashMessages />
            <div>{children}</div>
        </>
    );
}
