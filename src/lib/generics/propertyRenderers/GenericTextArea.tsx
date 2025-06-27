/**
 *  <textarea
                value={value || ""}
                onChange={(e) => context.setNote(e.target.value)}
                className="border rounded px-2 py-1 w-full"
                rows={3}
            />
 */
type Props = {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    rows?: number;
};
export function GenericTextArea({
    value,
    onChange,
    className = "",
    rows,
}: Props) {
    return (
        <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={className}
            rows={rows}
        />
    );
}
