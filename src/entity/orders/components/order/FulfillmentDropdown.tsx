import { SimpleDropdownSelection } from "../../../../lib/uiComponents/input/SimpleDropdownSelection";

interface FulfillmentDropdownProps {
    selectedType: string;
    onUpdateType: (type: string) => void;
}

export function FulfillmentDropdown({
    selectedType,
    onUpdateType,
}: FulfillmentDropdownProps) {
    const handleChange = (value: string | number) => {
        onUpdateType(String(value));
    };

    return (
        <SimpleDropdownSelection
            totalOptions={["pickup", "delivery"]}
            selectedOption={selectedType}
            onOptionChange={handleChange}
        />
    );
}
