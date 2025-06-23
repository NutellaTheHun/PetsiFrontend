interface GenericInputProps {
    value: string | number;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    type?: "text" | "number";
    className?: string;
    placeholder?: string;
}

export function GenericInput({
    value,
    onChange,
    readOnly = false,
    type = "text",
    className = "",
    placeholder = "",
}: GenericInputProps) {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            readOnly={readOnly}
            className={className}
            placeholder={placeholder}
        />
    );
}
