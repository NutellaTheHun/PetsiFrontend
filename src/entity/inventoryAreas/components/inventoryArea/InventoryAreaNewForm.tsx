import {
    GenericNewForm,
    type FormField,
} from "../../../../lib/generics/GenericNewForm";

type InventoryAreaFormData = {
    areaName: string;
};

type Props = {
    onSubmit: (data: InventoryAreaFormData) => void;
};

export function InventoryAreaNewForm({ onSubmit }: Props) {
    const fields: FormField[] = [
        {
            key: "areaName",
            label: "Name",
            type: "text",
            placeholder: "Name",
            required: true,
        },
    ];

    return (
        <GenericNewForm<InventoryAreaFormData>
            title="Create new inventory area"
            fields={fields}
            onSubmit={onSubmit}
        />
    );
}
