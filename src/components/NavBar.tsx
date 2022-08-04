import { Button, Dropdown, Navbar } from 'react-daisyui';
import { useNavigate } from "react-router-dom";
import auth from "../common/auth";

interface INavBarProps {
    activePage?: string
}

export default function NavBar({ activePage }: INavBarProps) {
    let navigate = useNavigate();
    let user = auth.user();

    return (
        <div>
            <Navbar>
                <Navbar.Start>
                    <Dropdown>
                        <Button color="ghost" shape="circle">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 6h16M4 12h16M4 18h7"
                                />
                            </svg>
                        </Button>
                        <Dropdown.Menu className="bg-neutral menu-compact w-52">
                            <Dropdown.Item className="active" onClick={() => navigate('/dashboard')}>Dashboard</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/exercises')}>Exercises</Dropdown.Item>
                            <Dropdown.Item onClick={() => navigate('/workouts')}>Workouts</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.Start>
                <Navbar.Center>
                    <Button color={"primary"} className="normal-case text-xl" onClick={() => navigate('/dashboard')}>
                        flangos
                    </Button>
                </Navbar.Center>
                <Navbar.End className="navbar-end">
                    <Dropdown vertical="end">
                        <Button color="ghost" className="avatar hidden md:inline-flex">
                            <span className="mr-2 normal-case">{user.name}</span>
                            <div className="w-10 rounded-full">
                                <img src="https://api.lorem.space/image/face?hash=33791" />
                            </div>
                        </Button>
                        <Button color="ghost" className="avatar visible md:hidden" shape={"circle"}>
                            <div className="w-10 rounded-full">
                                <img src="https://api.lorem.space/image/face?hash=33791" />
                            </div>
                        </Button>
                        <Dropdown.Menu className="bg-neutral w-52 menu-compact">
                            <Dropdown.Item onClick={() => { navigate('/user/settings') }}>
                                Settings
                            </Dropdown.Item>

                            <Dropdown.Item onClick={() => { navigate('/logout') }}>
                                Logout
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Navbar.End>
            </Navbar>
        </div>
    );
}