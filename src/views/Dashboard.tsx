import auth from "../common/auth";
import Div from "../components/Div";
import NavBar from "../components/NavBar";

export default function Dashboard() {
    var user = auth.user();

    return (
        <>
            <NavBar activePage="dashboard" />

            <div className="container mx-auto p-2">
                <Div title="Dashboard">
                    <h1 className="text-xl">Welcome back <span className="text-primary font-bold">{user.name}</span>!</h1>
                </Div>
            </div>
        </>
    );
}