import type React from "react";

type InputFieldProps = {
    label?: string;
    type?: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    error?: string;
    wrapperStyle?: React.CSSProperties;
    labelStyle?: React.CSSProperties;
    inputStyle?: React.CSSProperties;
    errorStyle?: React.CSSProperties;
}

export function InputField({
    name,
    value,
    type = 'text',
    label,
    onChange,
    placeholder,
    error,
    wrapperStyle,
    labelStyle,
    inputStyle,
    errorStyle
}: InputFieldProps) {
    return (
        <div style={wrapperStyle}>

            {label && <label htmlFor={name} style={labelStyle}>{label}</label>}

            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                style={inputStyle}
            />

            {error && <div style={errorStyle}>{error}</div>}

        </div>
    );
}