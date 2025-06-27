type Props = {
    value: string | number;
    type?: "date" | "text";
    className?: string;
};

export function GenericValueDisplay({ value, type, className }: Props) {
    if (type === "date") {
        const date = new Date(value);
        const formattedDate = date.toLocaleDateString("en-US", {
            month: "2-digit",
            day: "2-digit",
            year: "numeric",
        });
        return <span className={className}>{formattedDate}</span>;
    }
    return <span className={className}>{value}</span>;
}
