import { Button, Input } from 'react-daisyui';
import { useEffect, useState } from "react";
import FieldValidationErrors from '../../../components/form/FieldValidationErrors';
import { IFormEdit } from '../../../common/types';
import ExerciseCategoryFormControl from './ExerciseCategoryFormControl';
import apiExercise from '../../../services/api/exercise';
import { IExercise } from '../../../services/api/models';

interface ISaveErrors {
    name?: string[],
    category_id?: string[],
    category_name?: string[],
}

interface IExerciseEditForm extends IFormEdit {
    updateCategories?: boolean
}

export default function ExerciseEditForm({ onSubmit, onError, reset, setReset, id, updateCategories }: IExerciseEditForm) {
    const [name, setName] = useState('');
    const [categoryCreateMode, setCategoryCreateMode] = useState(false);
    const [categoryName, setCategoryName] = useState('');
    const [categoryId, setCategoryId] = useState(-1);

    const [errors, setErrors] = useState<ISaveErrors>({});
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (reset) {
            setReset(false);
            resetForm();
        }
    }, [reset, setReset]);

    useEffect(() => {
        if (id) {
            if (id === -1) {
                return resetForm();
            }

            getExercise();
        }
    }, [id]);

    function getExercise() {
        apiExercise.get?.(id)
        .then(({ data }) => {
            let exercise: IExercise = data;

            setName(exercise.name);
            if (exercise.category) {
                setCategoryId(exercise.category.id);
            }
        });
    }

    function save(ev: React.FormEvent<HTMLFormElement>) {
        ev.preventDefault();

        setSaving(true);
        setErrors({});

        apiExercise.put?.({
            name: name,
            category_id: categoryId,
            category_name: categoryName
        }, id)
        .then(() => {
            onSubmit?.();
            resetForm();
        })
        .catch((error) => {
            const { status, data } = error.response;

            if (status === 422) {
                const { errors } = data;
                setErrors(errors);
            }
        })
        .finally(() => {
            setSaving(false);
        });
    }

    function resetForm() {
        setName('');
        setCategoryCreateMode(false);
        setCategoryName('');
        setCategoryId(-1);
        setErrors({});
    }

    return (
        <form className="flex flex-col gap-2" onSubmit={(ev: React.FormEvent<HTMLFormElement>) => save(ev)}>
            <div className="form-control w-full">
                <label className="label" htmlFor="name">
                    <span className="label-text">Name</span>
                </label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    type="text"
                />
                <FieldValidationErrors errors={errors.name} />
            </div>

            <div className="form-control w-full">
                <ExerciseCategoryFormControl
                    createMode={categoryCreateMode}
                    setCreateMode={setCategoryCreateMode}

                    name={categoryName}
                    setName={setCategoryName}

                    categoryId={categoryId}
                    setCategoryId={setCategoryId}

                    updateCategories={updateCategories}

                    errors={errors}
                />
            </div>

            <div className="form-control w-full">
                <Button 
                    color={"primary"}
                    type="submit"
                    loading={saving}
                    disabled={saving}
                >
                    Save
                </Button>
            </div>
        </form>
    );
}