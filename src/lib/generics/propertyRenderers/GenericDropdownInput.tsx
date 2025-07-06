import React from "react";

interface DropdownOption<T> {
    entity: T;
    label: string;
}

// Utility function to transform backend data into dropdown options
export function createDropdownOptions<T extends { id: number | string }>(
    data: T[],
    labelKey: keyof T
): DropdownOption<T>[] {
    return data.map((item) => ({
        entity: item,
        label: String(item[labelKey]),
    }));
}

interface GenericDropdownInputProps<T> {
    value: T | null;
    onChange: (value: T) => void;
    options: DropdownOption<T>[];
    readOnly?: boolean;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
}

export function GenericDropdownInput<T extends { id: number | string }>({
    value,
    onChange,
    options,
    readOnly = false,
    className = "",
    placeholder = "Select an option...",
    disabled = false,
}: GenericDropdownInputProps<T>) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        const selectedOption = options.find(
            (option) => option.entity.id.toString() === selectedValue
        );

        if (selectedOption) {
            onChange(selectedOption.entity);
        }
    };

    // Get the current value's ID for the select element
    const getCurrentValue = () => {
        if (value === null || value === undefined) return "";
        return value.id.toString();
    };

    return (
        <select
            value={getCurrentValue()}
            onChange={handleChange}
            disabled={readOnly || disabled}
            className={className}
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map((option) => (
                <option
                    key={option.entity.id}
                    value={option.entity.id.toString()}
                >
                    {option.label}
                </option>
            ))}
        </select>
    );
}
