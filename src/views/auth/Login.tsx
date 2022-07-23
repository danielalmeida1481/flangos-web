import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../common/auth";
import { Button, Checkbox, Label, Spinner, TextInput } from "flowbite-react";
import { MailIcon, LockClosedIcon } from '@heroicons/react/solid';
import apiCsrfCookie from "../../services/api/csrf-cookie";
import apiAuthLogin from "../../services/api/auth/login";
import FieldValidationErrors from "../../components/form/FieldValidationErrors";
import apiUser from "../../services/api/user";

interface ILoginErrors {
    email?: string[],
    password?: string[]
}

export default function Login() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState<ILoginErrors>({});

    function login(ev: any) {
        ev.preventDefault();

        setIsLoading(true);
        setErrors({});

        apiCsrfCookie.get?.()
        .then(() => {
            apiAuthLogin.post?.({
                'email': email,
                'password': password,
                'remember': rememberMe
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

                    <div className="flex items-center gap-2">
                        <Checkbox id="remember_me" checked={rememberMe} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)} />
                        <Label htmlFor="remember_me" value="Remember me" />
                    </div>
                    
                    <div className="button-full">
                        <Button type="submit" onClick={(ev) => login(ev)} disabled={isLoading}>
                            <div className="mr-2" hidden={!isLoading}>
                                <Spinner size="sm" light={true} />
                            </div>
                            Login
                        </Button>
                    </div>

                    <Link className="text-center hover:underline text-blue-500" to="/register">Don't have an account? Register</Link>
                </form>
            </div>
        </div>
    );
}