export function GenericCheckBoxInput({
    value,
    onChange,
}: {
    value: boolean;
    onChange: (value: boolean) => void;
}) {
    return (
        <input
            type="checkbox"
            checked={value}
            onChange={(e) => onChange(e.target.checked)}
        />
    );
}
