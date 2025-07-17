import { Title } from "@mantine/core";

export function MantineTitle({ title }: { title: string }) {
    return <Title order={4}>{title}</Title>;
}
