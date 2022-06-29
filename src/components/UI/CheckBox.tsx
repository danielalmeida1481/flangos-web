export default function CheckBox(props: any) {
    const { className, id, checked, onChange } = props;

    return (
        <input className={"appearance-none w-5 h-5 my-auto bg-blue-100 checked:bg-blue-500 rounded " + className} type="checkbox" id={id} checked={checked} onChange={onChange} />
    );
}