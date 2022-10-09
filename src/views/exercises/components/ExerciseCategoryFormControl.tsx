import { Button, Input } from 'react-daisyui';
import FieldValidationErrors from '../../../components/form/FieldValidationErrors';
import { PlusCircleIcon, SelectorIcon } from '@heroicons/react/solid';
import React, { useEffect } from 'react';
import apiCategory from '../../../services/api/category';
import { categoriesState } from '../../../atoms/exercises';
import { useRecoilState } from 'recoil';
import { ICategory } from '../../../services/api/models';

interface ISaveErrors {
    category_id?: string[],
    category_name?: string[]
}

interface IExerciseCategoryFormControlProps {
    createMode?: boolean,
    setCreateMode?: React.SetStateAction<boolean> | any,

    name?: string,
    setName?: React.SetStateAction<string> | any,

    categoryId?: number,
    setCategoryId?: React.SetStateAction<number> | any

    updateCategories?: boolean,

    errors?: ISaveErrors
}

export default function ExerciseCategoryFormControl(props: IExerciseCategoryFormControlProps) {
    const [categories, setCategories] = useRecoilState<ICategory[]>(categoriesState);
    const { updateCategories } = props;

    useEffect(() => {
        handleUpdateCategories();
    }, []);

    useEffect(() => {
        if (updateCategories) {
            handleUpdateCategories();
        }
    }, [updateCategories]);

    function handleUpdateCategories() {
        apiCategory.get?.()
        .then(({ data }) => {
            setCategories(data);
        })
    }

    function handleChangeCreateMode() {
        props.setCreateMode(!props.createMode);
    }
    
    if (props.createMode) {
        return (
            <>
                <label className="label" htmlFor="name">
                    <span className="label-text">Category</span>

                    <Button
                        className="float-right"
                        color={"primary"}
                        size={"sm"}
                        shape={"square"}
                        type="button"
                        onClick={handleChangeCreateMode}>
                        <SelectorIcon className="w-5 h-5" />
                    </Button>
                </label>
                <Input id="name" value={props.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => props.setName(e.target.value)} type="text" />
                <FieldValidationErrors errors={props.errors?.category_name} />
            </>
        );
    }

    return (
        <>
            <label className="label" htmlFor="name">
                <span className="label-text">Category</span>

                <Button
                    className="float-right"
                    color={"primary"}
                    size={"sm"}
                    shape={"square"}
                    type="button"
                    onClick={handleChangeCreateMode}
                >
                    <PlusCircleIcon className="w-5 h-5" />
                </Button>
            </label>
            <select 
                className="select focus:outline-offset-0 select-bordered"
                value={props.categoryId} 
                onChange={(ev: React.ChangeEvent<HTMLSelectElement>) => props.setCategoryId(ev.target.value)}
            >
                <option value={-1}>
                    None
                </option>
                {
                    categories.map((category, index) => {
                        return (
                            <option value={category.id} key={index}>{category.name}</option>
                        );
                    })
                }
            </select>
            <FieldValidationErrors errors={props.errors?.category_id} />
        </>
    );
}