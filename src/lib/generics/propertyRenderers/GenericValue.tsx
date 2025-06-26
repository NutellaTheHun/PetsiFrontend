type Props = {
    value: string | number;
    className?: string;
};

export function GenericValue({ value, className }: Props) {
    return <span className={className}>{value}</span>;
}
