import { Button, Checkbox, Input, Form } from 'react-daisyui';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import auth from "../../common/auth";
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
                            .then(({ data }) => {
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
            <div className="m-auto w-3/4 md:w-1/3 shadow bg-base-200 rounded-lg p-4">
                <form className="flex flex-col gap-2">
                    <h1 className="text-6xl text-center text-primary font-bold">flangos</h1>

                    <div className="form-control w-full">
                        <label className="label" htmlFor="email">
                            <span className="label-text">Email</span>
                        </label>
                        <Input id="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} type="email" />
                        <FieldValidationErrors errors={errors.email} />
                    </div>

                    <div className="form-control w-full">
                        <label className="label" htmlFor="password">
                            <span className="label-text">Password</span>
                        </label>
                        <Input id="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} type="password" />
                        <FieldValidationErrors errors={errors.password} />
                    </div>

                    <div className="form-control w-full">
                        <Form.Label title="Remember me">
                            <Checkbox defaultChecked={rememberMe} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)} />
                        </Form.Label>
                    </div>
                    
                    <div className="form-control w-full">
                        <Button color={"primary"} type="submit" onClick={(ev) => login(ev)} loading={isLoading} disabled={isLoading}>
                            Login
                        </Button>
                    </div>
                </form>

                <div className="w-full text-center mt-2">
                    Don't have an account?&nbsp;<Link className="text-primary hover:underline" to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}