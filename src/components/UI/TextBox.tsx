export default function TextBox(props: any) {
    const { className, id, value, onChange, password } = props;

    return (
        <input className={"rounded bg-neutral-800 focus:outline-none px-2 py-2 " + className} type={password ? "password" : "text"} id={id} value={value} onChange={onChange} />
    );
}