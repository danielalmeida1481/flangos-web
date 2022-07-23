import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import auth from "../common/auth";

interface INavBarProps {
    activePage?: string
}

export default function NavBar({ activePage }: INavBarProps) {
    let navigate = useNavigate();
    let user = auth.user();

    return (
        <div className="pt-2 px-2">
            <Navbar fluid={true} rounded={true}>
                <Navbar.Brand>
                    <span className="self-center whitespace-nowrap text-xl text-blue-500 font-bold">
                        flangos
                    </span>
                </Navbar.Brand>

                <div className="flex md:order-2">
                    <Dropdown
                        arrowIcon={false}
                        inline={true}
                        label={<Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded={true} />}
                    >
                        <Dropdown.Header>
                            <span className="block text-sm">
                                {user.name}
                            </span>

                            <span className="block truncate text-sm font-medium">
                                {user.email}
                            </span>
                        </Dropdown.Header>

                        <Dropdown.Item onClick={() => { navigate('/user/settings') }}>
                            Settings
                        </Dropdown.Item>

                        <Dropdown.Divider />

                        <Dropdown.Item onClick={() => { navigate('/logout') }}>
                            Logout
                        </Dropdown.Item>
                    </Dropdown>
                    <Navbar.Toggle />
                </div>
                
                <Navbar.Collapse>
                    <Navbar.Link onClick={() => { navigate('/dashboard') }} href="#" active={activePage === "dashboard"}>
                        Dashboard
                    </Navbar.Link>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}