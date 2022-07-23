interface IFieldValidationErrorsProps {
    errors?: string []
}

export default function FieldValidationErrors({ errors }: IFieldValidationErrorsProps) {
    return (
        <div>
            {
                errors?.map((error) => {
                    return (
                        <p className="text-red-500">{error}</p>
                    );
                })
            }
        </div>
    );
}