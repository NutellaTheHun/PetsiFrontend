import { CloseButton, Combobox, TextInput, useCombobox } from "@mantine/core";
import { useState } from "react";
import type { StringKeys } from "./DropdownCheckboxSelection";

interface SearchbarDropdownSelectionProps<T> {
    totalOptions: T[];
    selectedOption: T | null;
    onOptionChange: (option: T) => void;
    searchProperty: StringKeys<T>;
}

// Based on MantineAutoComplete
export function SearchbarDropdownSelection<T>({
    totalOptions,
    selectedOption,
    onOptionChange,
    searchProperty,
}: SearchbarDropdownSelectionProps<T>) {
    const combobox = useCombobox();
    const [value, setValue] = useState("");

    const filteredOptions = totalOptions.filter((option) =>
        containsSequence(value, option[searchProperty] as string)
    );

    const options = filteredOptions.map((item) => (
        <Combobox.Option
            value={item[searchProperty] as string}
            key={item[searchProperty] as string}
        >
            {item[searchProperty] as string}
        </Combobox.Option>
    ));

    const handleCheckboxChange = (val: string) => {
        let internalSelectedValues = selectedOption;

        const newSelectedOption = totalOptions.find(
            (value) => value[searchProperty] === val
        );
        if (newSelectedOption) {
            internalSelectedValues = selectedOption;
        }

        if (internalSelectedValues) {
            onOptionChange(internalSelectedValues);
        }
    };

    return (
        <Combobox
            onOptionSubmit={(optionValue) => {
                handleCheckboxChange(optionValue);
                combobox.closeDropdown();
            }}
            store={combobox}
            withinPortal={false}
        >
            <Combobox.Target>
                <TextInput
                    label="Pick value or type anything"
                    placeholder="Pick value or type anything"
                    value={value}
                    onChange={(event) => {
                        setValue(event.currentTarget.value);
                        combobox.openDropdown();
                        combobox.updateSelectedOptionIndex();
                    }}
                    onClick={() => combobox.openDropdown()}
                    onFocus={() => combobox.openDropdown()}
                    onBlur={() => combobox.closeDropdown()}
                    rightSection={
                        value !== "" && (
                            <CloseButton
                                size="sm"
                                onMouseDown={(event) => event.preventDefault()}
                                onClick={() => setValue("")}
                                aria-label="Clear value"
                            />
                        )
                    }
                />
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>
                    {options.length === 0 ? (
                        <Combobox.Empty>Nothing found</Combobox.Empty>
                    ) : (
                        options
                    )}
                </Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}

// Utility function to check if a string contains characters in sequence
function containsSequence(searchTerm: string, target: string): boolean {
    if (!searchTerm) return true;

    const searchLower = searchTerm.toLowerCase();
    const targetLower = target.toLowerCase();

    // Check if target contains the search term as a substring
    if (targetLower.includes(searchLower)) return true;

    // Check if target contains characters in sequence (e.g., "cbp" matches "chocolate bourbon pecan pie")
    let searchIndex = 0;
    for (
        let i = 0;
        i < targetLower.length && searchIndex < searchLower.length;
        i++
    ) {
        if (targetLower[i] === searchLower[searchIndex]) {
            searchIndex++;
        }
    }

    return searchIndex === searchLower.length;
}
