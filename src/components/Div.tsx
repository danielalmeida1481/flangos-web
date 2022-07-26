interface IDivProps {
    title?: string,
    className?: string,
    children?: React.ReactElement | React.ReactElement[]
}

export default function Div({ title, className, children }: IDivProps) {
    const TitleDiv = () => {
        if (title) {
            return (
                <div className="pl-2 mb-2 border-l-2 border-primary uppercase text-primary text-xl">
                    {title}
                </div>
            );
        }

        return null;
    }

    return (
        <div className={className}>
            <TitleDiv />

            <div className={"bg-base-200 p-4 rounded-lg"}>
                {children}
            </div>
        </div>
    );
}