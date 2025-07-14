import { Button, type ButtonProps } from "@mantine/core";

interface ButtonBasicProps extends ButtonProps {
    label: string;
    onClick: () => void;
}

export function ButtonBasic({ label, onClick }: ButtonBasicProps) {
    return <Button onClick={onClick}>{label}</Button>;
}
