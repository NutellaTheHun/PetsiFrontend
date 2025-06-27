import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";

interface FulfillmentDropdownProps {
    selectedType: string;
    onUpdateType: (type: string) => void;
    disabled?: boolean;
}

const FULFILLMENT_OPTIONS = [
    { id: "pickup", label: "Pickup" },
    { id: "delivery", label: "Delivery" },
];

export function FulfillmentDropdown({
    selectedType,
    onUpdateType,
    disabled = false,
}: FulfillmentDropdownProps) {
    const handleChange = (value: string | number) => {
        onUpdateType(String(value));
    };

    return (
        <GenericDropdownInput
            value={selectedType}
            onChange={handleChange}
            options={FULFILLMENT_OPTIONS}
            placeholder="Select Type"
            disabled={disabled}
            className="border rounded px-2 py-1"
        />
    );
}
