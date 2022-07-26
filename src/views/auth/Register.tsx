import { Button, Input } from 'react-daisyui';
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
            <div className="m-auto w-3/4 md:w-1/3 shadow bg-base-200 rounded-lg p-4">
                <form className="flex flex-col gap-2">
                    <h1 className="text-6xl text-center text-primary font-bold">flangos</h1>

                    <div className="form-control w-full">
                        <label className="label" htmlFor="name">
                            <span className="label-text">Name</span>
                        </label>
                        <Input id="name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" />
                        <FieldValidationErrors errors={errors.name} />
                    </div>

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
                        <label className="label" htmlFor="confirm_password">
                            <span className="label-text">Confirm Password</span>
                        </label>
                        <Input id="confirm_password" value={confirmPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)} type="password" />
                        <FieldValidationErrors errors={errors.password_confirmation} />
                    </div>

                    <div className="form-control w-full">
                        <Button color={"primary"} type="submit" onClick={(ev) => register(ev)} loading={isLoading} disabled={isLoading}>
                            Register
                        </Button>
                    </div>
                </form>

                <div className="w-full text-center mt-2">
                    Already have an account?&nbsp;<Link className="text-primary hover:underline" to="/login">Login</Link>
                </div>
            </div>
        </div>
    );
}