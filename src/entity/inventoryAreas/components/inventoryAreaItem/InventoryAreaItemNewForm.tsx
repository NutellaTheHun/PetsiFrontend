import type { components } from "../../../../api-types";
import {
    GenericNewForm,
    type FormField,
} from "../../../../lib/generics/GenericNewForm";

type CreateInventoryAreaItemDto =
    components["schemas"]["CreateInventoryAreaItemDto"];

type InventoryAreaItemFormData = {
    inventoryAreaId: number;
    countedItemId: number;
    amount: number;
};

type Props = {
    onSubmit: (data: InventoryAreaItemFormData) => void;
};

export function InventoryAreaItemNewForm({ onSubmit }: Props) {
    const fields: FormField[] = [
        {
            key: "inventoryAreaId",
            label: "Inventory Area",
            type: "number",
            placeholder: "Inventory Area",
        },
        {
            key: "countedItemId",
            label: "Counted Item",
            type: "number",
            placeholder: "Counted Item",
        },
        {
            key: "amount",
            label: "Amount",
            type: "number",
            placeholder: "Amount",
        },
    ];

    return (
        <GenericNewForm<InventoryAreaItemFormData>
            title="Create new inventory area item"
            fields={fields}
            onSubmit={onSubmit}
        />
    );
}
