import { Button, Input } from 'react-daisyui';
import { useState } from "react";
import FieldValidationErrors from "../../../../components/form/FieldValidationErrors";
import apiUserPassword from "../../../../services/api/user/password";

interface ISavePasswordErrors {
    current_password?: string[],
    password?: string[],
    password_confirmation?: string[]
}

export default function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [savePasswordLoading, setSavePasswordLoading] = useState(false);
    const [passwordErrors, setPasswordErrors] = useState<ISavePasswordErrors>({});

    function savePassword(ev: React.MouseEvent<HTMLButtonElement>) {
        ev.preventDefault();

        setSavePasswordLoading(true);
        setPasswordErrors({});

        apiUserPassword.put?.({
            'current_password': currentPassword,
            'password': newPassword,
            'password_confirmation': confirmNewPassword
        })
            .then(resp => {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
            })
            .catch(error => {
                const { status, data } = error.response;

                if (status === 422) {
                    const { errors } = data;
                    setPasswordErrors(errors);
                }
            })
            .finally(() => {
                setSavePasswordLoading(false);
            })
    }

    return (
        <form className="flex flex-col gap-2">
            <div className="form-control w-full">
                <label className="label" htmlFor="password">
                    <span className="label-text">Current Password</span>
                </label>
                <Input id="password" value={currentPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)} type="password" />
                <FieldValidationErrors errors={passwordErrors.current_password} />
            </div>

            <div className="form-control w-full">
                <label className="label" htmlFor="new_password">
                    <span className="label-text">New Password</span>
                </label>
                <Input id="new_password" value={newPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} type="password" />
                <FieldValidationErrors errors={passwordErrors.password} />
            </div>

            <div className="form-control w-full">
                <label className="label" htmlFor="confirm_new_password">
                    <span className="label-text">Confirm New Password</span>
                </label>
                <Input id="confirm_new_password" value={confirmNewPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value)} type="password" />
                <FieldValidationErrors errors={passwordErrors.password_confirmation} />
            </div>

            <div className="form-control w-full">
                <Button color={"primary"} type="submit" onClick={(ev) => savePassword(ev)} loading={savePasswordLoading} disabled={savePasswordLoading}>
                    Save
                </Button>
            </div>
        </form>
    );
}