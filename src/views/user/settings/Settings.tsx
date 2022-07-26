import Div from "../../../components/Div";
import NavBar from "../../../components/NavBar";
import ChangePasswordForm from "./components/ChangePasswordForm";

export default function UserSettings() {
    return (
        <>
            <NavBar />

            <div className="container mx-auto p-2">
                <Div title="Change Password">
                    <ChangePasswordForm />
                </Div>
            </div>
        </>
    );
}