interface GenericInputProps {
    value: string | number;
    onChange?: (value: string) => void;
    readOnly?: boolean;
    type?:
        | "text"
        | "number"
        | "date"
        | "email"
        | "password"
        | "search"
        | "tel"
        | "time"
        | "url"
        | "time";
    className?: string;
    placeholder?: string;
    disabled?: boolean;
}

export function GenericInput({
    value,
    onChange,
    readOnly = false,
    type = "text",
    className = "",
    placeholder = "",
    disabled = false,
}: GenericInputProps) {
    return (
        <input
            type={type}
            value={value}
            onChange={(e) => onChange?.(e.target.value)}
            readOnly={readOnly}
            className={className}
            placeholder={placeholder}
            disabled={disabled}
        />
    );
}
