interface IDivProps {
    title?: string,
    className?: string,
    children?: React.ReactElement
}

export default function Div({ title, className, children }: IDivProps) {
    const TitleDiv = () => {
        if (title) {
            return (
                <div className="bg-gray-800 py-3 rounded-t border-solid border-y-4 border-blue-500 uppercase text-center text-white text-xl">
                    {title}
                </div>
            );
        }

        return null;
    }

    return (
        <div className={className}>
            <TitleDiv />

            <div className={"bg-gray-800 p-4 " + (title ? 'rounded-b' : 'rounded')}>
                {children}
            </div>
        </div>
    );
}