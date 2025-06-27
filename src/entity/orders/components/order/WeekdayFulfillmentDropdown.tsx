import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";

interface WeekdayFulfillmentDropdownProps {
    selectedDay: string;
    onUpdateDay: (day: string) => void;
    disabled?: boolean;
}

const WEEKDAY_OPTIONS = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
];

export function WeekdayFulfillmentDropdown({
    selectedDay,
    onUpdateDay,
    disabled = false,
}: WeekdayFulfillmentDropdownProps) {
    const handleChange = (value: string | number) => {
        onUpdateDay(String(value));
    };

    return (
        <GenericDropdownInput
            value={selectedDay}
            onChange={handleChange}
            options={WEEKDAY_OPTIONS}
            placeholder="Select Day"
            disabled={disabled}
            className="border rounded px-2 py-1"
        />
    );
}
