import { LockClosedIcon } from "@heroicons/react/solid";
import { Button, Label, Spinner, TextInput } from "flowbite-react";
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
        <form>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="current_password" value="Current Password" />
                </div>
                <TextInput id="current_password" value={currentPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCurrentPassword(e.target.value)} type="password" icon={LockClosedIcon} />
                <FieldValidationErrors errors={passwordErrors.current_password} />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="new_password" value="New Password" />
                </div>
                <TextInput id="new_password" value={newPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} type="password" icon={LockClosedIcon} />
                <FieldValidationErrors errors={passwordErrors.password} />
            </div>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="confirm_new_password" value="Confirm New Password" />
                </div>
                <TextInput id="confirm_new_password" value={confirmNewPassword} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmNewPassword(e.target.value)} type="password" icon={LockClosedIcon} />
                <FieldValidationErrors errors={passwordErrors.password_confirmation} />
            </div>
            
            <div className="button-full mt-2">
                <Button onClick={(ev) => savePassword(ev)} type="submit" disabled={savePasswordLoading}>
                    <div className="mr-2" hidden={!savePasswordLoading}>
                        <Spinner size="sm" light={true} />
                    </div>
                    Save
                </Button>
            </div>
        </form>
    );
}