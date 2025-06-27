import { useEffect, useRef, useState } from "react";
import type { components } from "../../../../api-types";
import { GenericCheckBoxInput } from "../../../../lib/generics/propertyRenderers/GenericCheckBoxInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";

type MenuItemSize = components["schemas"]["MenuItemSize"];

type Props = {
    selectedSizeIds: number[];
    onUpdateSizeIds: (sizeIds: number[]) => void;
    menuItemSizes: MenuItemSize[];
    placeholder?: string;
};

export function MenuItemSizeDropdownCheckbox({
    selectedSizeIds,
    onUpdateSizeIds,
    menuItemSizes,
    placeholder = "Select sizes...",
}: Props) {
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

    const handleSizeToggle = (sizeId: number) => {
        const newSelectedIds = selectedSizeIds.includes(sizeId)
            ? selectedSizeIds.filter((id) => id !== sizeId)
            : [...selectedSizeIds, sizeId];
        onUpdateSizeIds(newSelectedIds);
    };

    const displayText =
        selectedSizeIds.length > 0
            ? `${selectedSizeIds.length} size${
                  selectedSizeIds.length === 1 ? "" : "s"
              } selected`
            : placeholder;

    if (menuItemSizes.length === 0) {
        return <GenericValueDisplay value="No menu item sizes found" />;
    }

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-3 py-2 text-left border border-gray-300 rounded-md shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

            {isOpen && (
                <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
                    {menuItemSizes.map((size) => (
                        <label
                            key={size.id}
                            className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer"
                        >
                            <GenericCheckBoxInput
                                value={selectedSizeIds.includes(size.id)}
                                onChange={() => handleSizeToggle(size.id)}
                                className="mr-2"
                            />
                            <span className="text-sm">{size.name}</span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
}
