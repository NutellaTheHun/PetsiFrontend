type Props = {
    children: React.ReactNode;
};
export function DynamicCell({ children }: Props) {
    return <td>{children}</td>;
}
