import { IComponentProps } from "../../common/types";

interface ICheckBoxProps extends IComponentProps {
    checked?: boolean,
    onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export default function CheckBox({ className, id, checked, onChange }: ICheckBoxProps) {
    return (
        <input className={"appearance-none w-5 h-5 my-auto bg-blue-100 checked:bg-blue-500 rounded " + className} type="checkbox" id={id} checked={checked} onChange={onChange} />
    );
}