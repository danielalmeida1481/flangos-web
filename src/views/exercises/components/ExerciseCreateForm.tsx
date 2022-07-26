import { Button, Input } from 'react-daisyui';
import { useState } from "react";
import FieldValidationErrors from '../../../components/form/FieldValidationErrors';
import { IForm } from '../../../common/types';

interface ISaveErrors {
    name?: string[],
    category?: string[],
}

export default function ExerciseCreateForm({ onSubmit, onError }: IForm) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState<ISaveErrors>({});
    const [saving, setSaving] = useState(false);

    function save(ev: React.MouseEvent<HTMLButtonElement>) {
        ev.preventDefault();

        setSaving(true);
        setErrors({});
        
        onSubmit?.();
    }

    return (
        <form className="flex flex-col gap-2">
            <div className="form-control w-full">
                <label className="label" htmlFor="name">
                    <span className="label-text">Name</span>
                </label>
                <Input id="name" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)} type="text" />
                <FieldValidationErrors errors={errors.name} />
            </div>

            <div className="form-control w-full">
                <label className="label" htmlFor="category">
                    <span className="label-text">Category</span>
                </label>
                <Input id="category" value={category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCategory(e.target.value)} type="text" />
                <FieldValidationErrors errors={errors.category} />
            </div>

            <div className="form-control w-full">
                <Button 
                    color={"primary"} 
                    type="submit" 
                    onClick={(ev) => save(ev)} 
                    loading={saving} 
                    disabled={saving}>
                    Save
                </Button>
            </div>
        </form>
    );
}