import { MantineSimpleComboBox } from "../../../../lib/uiComponents/input/MantineSimpleComboBox";

interface WeekdayFulfillmentDropdownProps {
    selectedDay: string;
    onUpdateDay: (day: string) => void;
    disabled?: boolean;
}

export function WeekdayFulfillmentDropdown({
    selectedDay,
    onUpdateDay,
    disabled = false,
}: WeekdayFulfillmentDropdownProps) {
    const handleChange = (value: string | number) => {
        onUpdateDay(String(value));
    };

    return (
        <MantineSimpleComboBox
            totalOptions={[
                "monday",
                "tuesday",
                "wednesday",
                "thursday",
                "friday",
                "saturday",
                "sunday",
            ]}
            selectedOption={selectedDay}
            onOptionChange={handleChange}
        />
    );
}
