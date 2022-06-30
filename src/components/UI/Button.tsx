import { IComponentProps } from "../../common/types";

interface IButtonProps extends IComponentProps {
    style?: string,
    onClick?: React.MouseEventHandler<HTMLButtonElement>,
}

export default function Button({ className, style, onClick, children }: IButtonProps) {
    return (
        <button className={(buttonStyles[style || 'default']) + " text-xl p-2 py-3 rounded " + className} onClick={onClick}>{children}</button>
    );
}

/** Button styles dictionary */
const buttonStyles: { [key: string]: string } = {};
buttonStyles['default'] = "bg-blue-500 hover:bg-blue-800 focus:bg-blue-900";
