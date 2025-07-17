import {
    Checkbox,
    Combobox,
    Group,
    Input,
    Pill,
    PillsInput,
    useCombobox,
} from "@mantine/core";

export type StringKeys<T> = keyof T & string;

interface DropdownCheckboxSelectionProps<T> {
    totalOptions: T[];
    selectedOptions: T[];
    labelKey: StringKeys<T>;
    onCheckboxChange: (value: T[]) => void;
}

export function DropdownCheckboxSelection<T>({
    totalOptions,
    selectedOptions,
    labelKey,
    onCheckboxChange,
}: DropdownCheckboxSelectionProps<T>) {
    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
        onDropdownOpen: () => combobox.updateSelectedOptionIndex("active"),
    });

    const totalOptionLabels = totalOptions.map((item) => item[labelKey]);
    const selectedOptionLabels = selectedOptions.map((item) => item[labelKey]);

    //const [value, setValue] = useState<string[]>(inputValue);

    const handleCheckboxChange = (val: string) => {
        let internalSelectedValues = [...selectedOptions];

        const newSelectedOption = totalOptions.find(
            (value) => value[labelKey] === val
        );
        if (newSelectedOption) {
            internalSelectedValues = [
                ...internalSelectedValues,
                newSelectedOption,
            ];
        } else {
            internalSelectedValues = internalSelectedValues.filter(
                (v) => v[labelKey] !== val
            );
        }

        onCheckboxChange(internalSelectedValues);
    };

    /*const handleValueSelect = (val: t) =>
        setValue((current) =>
            current.includes(val)
                ? current.filter((v) => v !== val)
                : [...current, val]
        );*/

    const handleRemovePill = (val: string) => {
        onCheckboxChange(selectedOptions.filter((v) => v[labelKey] !== val));
    };

    const values = selectedOptionLabels.map((item) => (
        <Pill
            key={item as string}
            withRemoveButton
            onRemove={() => handleRemovePill(item as string)}
        >
            {item as string}
        </Pill>
    ));

    const options = totalOptionLabels.map((item) => (
        <Combobox.Option
            value={item as string}
            key={item as string}
            active={selectedOptionLabels.includes(item)}
        >
            <Group gap="sm">
                <Checkbox
                    checked={selectedOptionLabels.includes(item)}
                    onChange={() => {}}
                    aria-hidden
                    tabIndex={-1}
                    style={{ pointerEvents: "none" }}
                />
                <span>{item as string}</span>
            </Group>
        </Combobox.Option>
    ));

    return (
        <Combobox
            store={combobox}
            onOptionSubmit={handleCheckboxChange}
            withinPortal={false}
        >
            <Combobox.DropdownTarget>
                <PillsInput pointer onClick={() => combobox.toggleDropdown()}>
                    <Pill.Group>
                        {values.length > 0 ? (
                            values
                        ) : (
                            <Input.Placeholder>
                                Pick one or more values
                            </Input.Placeholder>
                        )}

                        <Combobox.EventsTarget>
                            <PillsInput.Field
                                type="hidden"
                                onBlur={() => combobox.closeDropdown()}
                                onKeyDown={(event) => {
                                    if (event.key === "Backspace") {
                                        event.preventDefault();
                                        /*handleValueRemove(
                                            value[value.length - 1]
                                        );*/
                                    }
                                }}
                            />
                        </Combobox.EventsTarget>
                    </Pill.Group>
                </PillsInput>
            </Combobox.DropdownTarget>

            <Combobox.Dropdown>
                <Combobox.Options>{options}</Combobox.Options>
            </Combobox.Dropdown>
        </Combobox>
    );
}
