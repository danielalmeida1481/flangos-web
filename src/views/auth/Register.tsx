import { Button, Label, Spinner, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LockClosedIcon, MailIcon, UserIcon } from '@heroicons/react/solid';
import auth from "../../common/auth";
import apiAuthRegister from "../../services/api/auth/register";
import apiCsrfCookie from "../../services/api/csrf-cookie";
import FieldValidationErrors from "../../components/form/FieldValidationErrors";
import apiUser from "../../services/api/user";

interface IRegisterErrors {
    name?: string[],
    email?: string[],
    password?: string[],
    password_confirmation?: string[],
}

export default function Register() {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<IRegisterErrors>({});

    function register(ev: React.MouseEvent<HTMLButtonElement>) {
        ev.preventDefault();
        setIsLoading(true);

        apiCsrfCookie.get?.()
        .then(() => {
            apiAuthRegister.post?.({
                'name': name,
                'email': email,
                'password': password,
                'password_confirmation': confirmPassword
            })
            .then((response) => {
                apiUser.get?.()
                .then(({data}) => {
                    auth.login(data);
                    navigate('/dashboard');
                })
            })
            .catch((error) => {
                const { status, data } = error.response;

                if (status === 422) {
                    const { errors } = data;
                    setErrors(errors);
                }
            })
            .finally(() => {
                setIsLoading(false);
            });
        });
    }

    return (
        <div className="flex h-screen">
            <div className="m-auto w-3/4 md:w-1/3">
                <h1 className="text-6xl text-center text-blue-500 font-bold">flangos</h1>

                <form className="flex flex-col gap-4 mt-5">
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="name" value="Name" />
                        </div>
                        <TextInput id="name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" icon={UserIcon} />
                        <FieldValidationErrors errors={errors.name} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email" value="Email" />
                        </div>
                        <TextInput id="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" icon={MailIcon} />
                        <FieldValidationErrors errors={errors.email} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password" value="Password" />
                        </div>
                        <TextInput id="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" icon={LockClosedIcon} />
                        <FieldValidationErrors errors={errors.password} />
                    </div>

                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="confirm_password" value="Confirm Password" />
                        </div>
                        <TextInput id="confirm_password" value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} type="password" icon={LockClosedIcon} />
                        <FieldValidationErrors errors={errors.password_confirmation} />
                    </div>

                    <div className="button-full">
                        <Button type="submit" onClick={(ev: React.MouseEvent<HTMLButtonElement>) => register(ev)} disabled={isLoading}>
                            <div className="mr-2" hidden={!isLoading}>
                                <Spinner className="mr-2" size="sm" light={true} />
                            </div>
                            Register
                        </Button>
                    </div>

                    <Link className="text-center hover:underline text-blue-500" to="/login">Already have an account? Login</Link>
                </form>
            </div>
        </div>
    );
}