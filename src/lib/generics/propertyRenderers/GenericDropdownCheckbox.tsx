import { useEffect, useRef, useState } from "react";
import { GenericCheckBoxInput } from "./GenericCheckBoxInput";

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

interface GenericDropdownCheckboxProps<T> {
    selectedValues: T[];
    onUpdateValues: (values: T[]) => void;
    options: DropdownOption<T>[];
    placeholder?: string;
    className?: string;
    disabled?: boolean;
    readOnly?: boolean;
}

export function GenericDropdownCheckbox<T extends { id: number | string }>({
    selectedValues,
    onUpdateValues,
    options,
    placeholder = "Select options...",
    className = "",
    disabled = false,
    readOnly = false,
}: GenericDropdownCheckboxProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleValueToggle = (value: T) => {
        if (readOnly) return;

        const newSelectedValues = selectedValues.some(
            (item) => item.id === value.id
        )
            ? selectedValues.filter((item) => item.id !== value.id)
            : [...selectedValues, value];
        onUpdateValues(newSelectedValues);
    };

    const displayText =
        selectedValues.length > 0
            ? `${selectedValues.length} item${
                  selectedValues.length === 1 ? "" : "s"
              } selected`
            : placeholder;

    if (options.length === 0) {
        return (
            <div className={`px-3 py-2 text-gray-500 ${className}`}>
                No options available
            </div>
        );
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => !disabled && !readOnly && setIsOpen(!isOpen)}
                disabled={disabled || readOnly}
                className={`w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                    disabled || readOnly
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                } ${className}`}
            >
                {displayText}
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <svg
                        className="w-5 h-5 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </span>
            </button>

            {isOpen && !disabled && !readOnly && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {options.map((option) => (
                        <label
                            key={option.entity.id}
                            className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <GenericCheckBoxInput
                                value={selectedValues.some(
                                    (item) => item.id === option.entity.id
                                )}
                                onChange={() =>
                                    handleValueToggle(option.entity)
                                }
                                className="mr-2"
                            />
                            <span className="text-sm">{option.label}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
