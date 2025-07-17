import { MantineSimpleComboBox } from "../../../../lib/uiComponents/input/MantineSimpleComboBox";

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
        <MantineSimpleComboBox
            totalOptions={["pickup", "delivery"]}
            selectedOption={selectedType}
            onOptionChange={handleChange}
        />
    );
}
