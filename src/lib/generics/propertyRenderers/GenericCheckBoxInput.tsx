export function GenericCheckBoxInput({
    value,
    onChange,
    className,
}: {
    value: boolean;
    onChange: (value: boolean) => void;
    className?: string;
}) {
    return (
        <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
            className={className}
        />
    );
}
