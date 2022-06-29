import React, { useState } from "react";
import Button from "../../components/UI/Button";
import CheckBox from "../../components/UI/CheckBox";
import Label from "../../components/UI/Label";
import TextBox from "../../components/UI/TextBox";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember_me, setRememberMe] = useState(false);

    return (
        <div className="flex h-screen">
            <div className="m-auto rounded sm:w-1/3">
                <h1 className="text-6xl text-center text-blue-500 font-bold">flangos</h1>

                <div className="my-5">
                    <div className="flex flex-col">
                        <Label htmlFor="email">Email</Label>
                        <TextBox id="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)} />
                    </div>

                    <div className="flex flex-col mt-2">
                        <Label htmlFor="password">Password</Label>
                        <TextBox id="password" value={password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)} password={true} />
                    </div>

                    <div className="flex mt-2">
                        <CheckBox id="remember_me" checked={remember_me} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberMe(e.target.checked)} />
                        <Label className="text-lg text-gray-300 ml-1" htmlFor="remember_me">Remember me</Label>
                    </div>
                </div>

                <Button className="w-full">Login</Button>
            </div>
        </div>
    );
}