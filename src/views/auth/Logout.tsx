import { Spinner } from "flowbite-react";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import auth from "../../common/auth";
import apiAuthLogout from "../../services/api/auth/logout";

export default function Logout() {
    const [logout, setLogout] = useState(false);

    useEffect(function () {
        apiAuthLogout.post?.()
        .then(() => {
            auth.logout();
            setLogout(true);
        });
    }, []);

    if (logout) {
        return <Navigate to="/login" />;
    }

    return (
        <div className="flex h-screen">
            <div className="m-auto">
                <h1 className="text-6xl text-center text-blue-500 font-bold">flangos</h1>

                <div className="my-5 text-center">
                    <p className="text-2xl text-white">
                        <span className="mr-2">
                            <Spinner size={'lg'} light={true} />
                        </span>
                        Logout in progress...
                    </p>
                </div>
            </div>
        </div>
    );
}