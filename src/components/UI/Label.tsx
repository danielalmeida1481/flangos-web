export default function Label(props: any) {
    const { className, htmlFor, children } = props;

    return (
        <label className={"text-2xl mb-1 " + className} htmlFor={htmlFor}>{children}</label>
    );
}