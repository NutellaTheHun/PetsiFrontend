import { Button, Table } from "@mantine/core";

type Props = {
    children: React.ReactNode[] | React.ReactNode;
    onSubmit: () => void;
    onCancel: () => void;
};
export function MantineNewRowForm({ children, onSubmit, onCancel }: Props) {
    return (
        <Table.Tr key="new-row-form">
            {children}
            <Table.Td>
                <Button onClick={onSubmit}>Save</Button>
            </Table.Td>
            <Table.Td>
                <Button onClick={onCancel}>Cancel</Button>
            </Table.Td>
        </Table.Tr>
    );
}
