import { InputField } from "../../../base/components/input-field/input-field";

type UsernameProps = {
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export function LoginUsernameField({ value, onChange }: UsernameProps) {

    return (
        <InputField
            name='username'
            value={value}
            onChange={onChange}
            type='text'
            placeholder='username'
            wrapperStyle={style.wrapper}
            inputStyle={style.input}
        />
    );
}

const style = {
    wrapper: {
        marginBottom: '1rem',
        display: 'flex',
        flexDirection: 'column' as const,
    },
    label: {
        marginBottom: '0.25rem',
        fontWeight: 'bold',
    },
    input: {
        padding: '0.5rem',
        fontSize: '1rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
    },
    error: {
        color: 'red',
        fontSize: '0.8rem',
        marginTop: '0.25rem',
    }
}