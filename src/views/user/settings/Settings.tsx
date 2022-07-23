import { LockClosedIcon, UserIcon } from "@heroicons/react/solid";
import { Tabs } from "flowbite-react";
import Div from "../../../components/Div";
import NavBar from "../../../components/NavBar";
import ChangePasswordForm from "./components/ChangePasswordForm";

export default function UserSettings() {
    return (
        <>
            <NavBar />

            <div className="p-2">
                <Div className="w-full">
                    <Tabs.Group aria-label="Settings tabs" style={"underline"}>
                        <Tabs.Item active={true} title="Profile" icon={UserIcon}>
                            
                        </Tabs.Item>

                        <Tabs.Item title="Password" icon={LockClosedIcon}>
                            <ChangePasswordForm />
                        </Tabs.Item>
                    </Tabs.Group>
                </Div>
            </div>
        </>
    );
}