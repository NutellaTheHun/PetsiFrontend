import React, { useEffect, useRef, useState } from "react";

interface DropdownOption<T> {
    entity: T;
    label: string;
}

interface GenericSearchBarDropdownInputProps<T> {
    value: T | null;
    onChange: (value: T) => void;
    options: DropdownOption<T>[];
    readOnly?: boolean;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
    onSearchChange?: (searchTerm: string) => void;
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

// Utility function to transform backend data into dropdown options
export function createDropdownOptions<T extends { id: number | string }>(
    data: T[],
    labelKey: keyof T,
    filterStrings?: string[]
): DropdownOption<T>[] {
    let filteredData = data;

    // Pre-filter data if filterStrings is provided
    if (filterStrings && filterStrings.length > 0) {
        filteredData = data.filter((item) => {
            const label = String(item[labelKey]).toLowerCase();
            return filterStrings.every((filterString) =>
                label.includes(filterString.toLowerCase())
            );
        });
    }

    return filteredData.map((item) => ({
        entity: item,
        label: String(item[labelKey]),
    }));
}

export function GenericSearchBarDropdownInput<T>({
    value,
    onChange,
    options,
    readOnly = false,
    className = "",
    placeholder = "Search and select...",
    disabled = false,
    onSearchChange,
}: GenericSearchBarDropdownInputProps<T>) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedOption, setSelectedOption] =
        useState<DropdownOption<T> | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Find the selected option based on value
    useEffect(() => {
        const option = options.find((opt) => opt.entity === value);
        setSelectedOption(option || null);
        if (option) {
            setSearchTerm(option.label);
        }
    }, [value, options]);

    // Filter options based on search term
    const filteredOptions = options.filter((option) =>
        containsSequence(searchTerm, option.label)
    );

    // Handle click outside to close dropdown
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInputFocus = () => {
        if (!readOnly && !disabled && searchTerm.trim()) {
            setIsOpen(true);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newSearchTerm = e.target.value;
        setSearchTerm(newSearchTerm);

        // Only show dropdown if there's input
        if (newSearchTerm.trim()) {
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }

        if (onSearchChange) {
            onSearchChange(newSearchTerm);
        }
    };

    const handleOptionClick = (option: DropdownOption<T>) => {
        setSelectedOption(option);
        setSearchTerm(option.label);
        setIsOpen(false);
        onChange(option.entity);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (filteredOptions.length > 0) {
                handleOptionClick(filteredOptions[0]);
            }
        } else if (e.key === "Escape") {
            setIsOpen(false);
            inputRef.current?.blur();
        }
    };

    const handleClear = () => {
        setSearchTerm("");
        setSelectedOption(null);
        onChange(null as any);
        setIsOpen(false);
        inputRef.current?.focus();
    };

    // Check if there's an exact match and collapse dropdown if so
    useEffect(() => {
        if (isOpen && searchTerm.trim()) {
            const exactMatch = filteredOptions.find(
                (option) =>
                    option.label.toLowerCase() === searchTerm.toLowerCase()
            );
            if (exactMatch) {
                setIsOpen(false);
            }
        }
    }, [searchTerm, filteredOptions, isOpen]);

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div className="relative">
                <input
                    ref={inputRef}
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                    onKeyDown={handleInputKeyDown}
                    placeholder={placeholder}
                    disabled={readOnly || disabled}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                {selectedOption && !readOnly && !disabled && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                        ×
                    </button>
                )}
            </div>

            {isOpen && !readOnly && !disabled && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {filteredOptions.length > 0 ? (
                        filteredOptions.map((option) => (
                            <div
                                key={
                                    typeof option.entity === "object" &&
                                    option.entity !== null
                                        ? (option.entity as any).id
                                        : option.entity
                                }
                                onClick={() => handleOptionClick(option)}
                                className="px-3 py-2 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
                            >
                                {option.label}
                            </div>
                        ))
                    ) : (
                        <div className="px-3 py-2 text-gray-500">
                            No options found
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
