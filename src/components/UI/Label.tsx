import { IComponentProps } from "../../common/types";

interface ILabelProps extends IComponentProps {
    htmlFor?: string
}

export default function Label({ className, htmlFor, children }: ILabelProps) {
    return (
        <label className={"text-2xl mb-1 " + className} htmlFor={htmlFor}>{children}</label>
    );
}