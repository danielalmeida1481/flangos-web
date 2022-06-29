/** Button styles dictionary */
const buttonStyles: { [key: string]: string } = {};

buttonStyles['default'] = "bg-blue-500 hover:bg-blue-800 focus:bg-blue-900";

export default function Button(props: any) {
    const { className, style, onClick, children } = props;

    return (
        <button className={(buttonStyles[style] ?? buttonStyles['default']) + " text-xl p-2 py-3 rounded " + className} onClick={onClick}>{children}</button>
    );
}