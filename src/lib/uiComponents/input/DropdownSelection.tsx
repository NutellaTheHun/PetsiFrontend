import { Combobox, Input, InputBase, Text, useCombobox } from "@mantine/core";
import type { StringKeys } from "./DropdownCheckboxSelection";

interface DropdownSelectionProps<T> {
    totalOptions: T[];
    selectedOption: T | null;
    onOptionChange: (option: T) => void;
    labelKey: StringKeys<T>;
}

export function DropdownSelection<T>({
    totalOptions,
    selectedOption,
    onOptionChange,
    labelKey,
}: DropdownSelectionProps<T>) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    //const [value, setValue] = useState<string | null>(null);
    const totalOptionLabels = totalOptions.map((item) => item[labelKey]);
    const selectedOptionLabel = selectedOption?.[labelKey];

    const options = totalOptionLabels.map((item) => (
        <Combobox.Option value={item as string} key={item as string}>
            {item as string}
        </Combobox.Option>
    ));

    const handleCheckboxChange = (val: string) => {
        let internalSelectedValues = selectedOption;

        const newSelectedOption = totalOptions.find(
            (value) => value[labelKey] === val
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
            store={combobox}
            withinPortal={false}
            onOptionSubmit={(val) => {
                handleCheckboxChange(val);
                combobox.closeDropdown();
            }}
        >
            <Combobox.Target>
                <InputBase
                    component="button"
                    type="button"
                    pointer
                    rightSection={<Combobox.Chevron />}
                    onClick={() => combobox.toggleDropdown()}
                    rightSectionPointerEvents="none"
                >
                    {selectedOptionLabel ? (
                        <Text>{selectedOptionLabel as string}</Text>
                    ) : (
                        <Input.Placeholder>Pick value</Input.Placeholder>
                    )}
                </InputBase>
            </Combobox.Target>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
