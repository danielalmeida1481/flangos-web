import { Button } from "react-daisyui";
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

                <div className="flex flex-row gap-2 mt-2">
                    <div className="flex-1">
                        <Button className="w-full" size={"lg"} color={"primary"}>
                            Start Workout
                        </Button>
                    </div>
                    <div className="flex-1">
                        <Button className="w-full" size={"lg"} color={"secondary"}>
                            Register Workout
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}