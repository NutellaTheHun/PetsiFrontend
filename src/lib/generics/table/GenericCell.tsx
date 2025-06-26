type Props = {
    children: React.ReactNode;
};
export function GenericCell({ children }: Props) {
    return <td>{children}</td>;
}
