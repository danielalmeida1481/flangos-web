import { IComponentProps } from "../../common/types";

interface ITextBoxProps extends IComponentProps {
    value?: string,
    onChange?: React.ChangeEventHandler<HTMLInputElement>,
    password?: boolean
}

export default function TextBox({ className, id, value, onChange, password }: ITextBoxProps) {
    return (
        <input className={"rounded bg-neutral-800 focus:outline-none px-2 py-2 " + className} type={password ? "password" : "text"} id={id} value={value} onChange={onChange} />
    );
}