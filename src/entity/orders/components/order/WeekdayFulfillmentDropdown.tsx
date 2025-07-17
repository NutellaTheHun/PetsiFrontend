import { SimpleDropdownSelection } from "../../../../lib/uiComponents/input/SimpleDropdownSelection";

interface WeekdayFulfillmentDropdownProps {
    selectedDay: string;
    onUpdateDay: (day: string) => void;
}

export function WeekdayFulfillmentDropdown({
    selectedDay,
    onUpdateDay,
}: WeekdayFulfillmentDropdownProps) {
    const handleChange = (value: string | number) => {
        onUpdateDay(String(value));
    };

    return (
        <SimpleDropdownSelection
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
