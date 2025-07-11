import FlashMessages from "../components/FlashMessage";
import UserNavbar from "../components/user/UserNavbar";

export default function UserLayout({ children }) {
    return (
        <>
            <UserNavbar />
            <FlashMessages />
            <div className="mt-14">{children}</div>
        </>
    );
}
