import React from "react";

interface DropdownOption<T> {
    entity: T;
    label: string;
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
        if (value === null) return "";
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

/*
EXAMPLE USAGE:

// 1. In your component, fetch the dropdown data
const { data: roles } = $api.useQuery("get", "/roles");
const { data: categories } = $api.useQuery("get", "/menu-categories");

// 2. Transform the data into dropdown options
const roleOptions = createDropdownOptions(roles?.items ?? [], "roleName");
const categoryOptions = createDropdownOptions(categories?.items ?? [], "categoryName");

// 3. Use in your table column definition
const columns: GenericTableColumn<YourEntity>[] = [
    {
        key: "roleId",
        label: "Role",
        sortable: true,
        editable: true,
        render: (row, readonly) => (
            <GenericDropdownInput<Role>
                key={String(row.id)}
                value={editId === row.id ? editRole : row.role}
                onChange={setEditRole}
                options={roleOptions}
                readOnly={readonly}
                placeholder="Select a role..."
            />
        ),
    },
    {
        key: "categoryId", 
        label: "Category",
        sortable: false,
        editable: true,
        render: (row, readonly) => (
            <GenericDropdownInput<Category>
                key={String(row.id)}
                value={editId === row.id ? editCategory : row.category}
                onChange={setEditCategory}
                options={categoryOptions}
                readOnly={readonly}
                placeholder="Select a category..."
            />
        ),
    },
];

// 4. Handle the update with the selected entities
onUpdateRow={(id) => {
    updateEntity.mutate({
        params: { path: { id } },
        body: {
            roleId: editRole?.id,
            categoryId: editCategory?.id,
            // ... other fields
        },
    });
}}
*/
