import auth from "../common/auth";
import Div from "../components/Div";
import NavBar from "../components/NavBar";

export default function Dashboard() {
    var user = auth.user();

    return (
        <>
            <NavBar activePage="dashboard" />

            <div className="p-2 text-white">
                <Div>
                    <h1 className="text-xl">Welcome back <span className="text-blue-500 font-bold">{user.name}</span>!</h1>
                </Div>
            </div>
        </>
    );
}