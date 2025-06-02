import './base-text-field.css';

type BaseTextFieldProps = {
    valueBind: string;
}
export function BaseTextField({ valueBind }: BaseTextFieldProps) {

    return (
        <input
            className="base-text-field"
            type='text' />
    );
}