import React from "react";

interface DropdownOption {
    id: number | string;
    label: string;
}

interface GenericDropdownInputProps {
    value: number | string | null;
    onChange: (value: number | string) => void;
    options: DropdownOption[];
    readOnly?: boolean;
    className?: string;
    placeholder?: string;
    disabled?: boolean;
}

// Utility function to transform backend data into dropdown options
export function createDropdownOptions<T extends { id: number | string }>(
    data: T[],
    labelKey: keyof T
): DropdownOption[] {
    return data.map((item) => ({
        id: item.id,
        label: String(item[labelKey]),
    }));
}

export function GenericDropdownInput({
    value,
    onChange,
    options,
    readOnly = false,
    className = "",
    placeholder = "Select an option...",
    disabled = false,
}: GenericDropdownInputProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = e.target.value;
        // Convert to number if the original value was a number
        const finalValue =
            typeof value === "number" ? Number(selectedValue) : selectedValue;
        onChange(finalValue);
    };

    return (
        <select
            value={value ?? ""}
            onChange={handleChange}
            disabled={readOnly || disabled}
            className={className}
        >
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map((option) => (
                <option key={option.id} value={option.id}>
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
            <GenericDropdownInput
                key={String(row.id)}
                value={editId === row.id ? editRoleId : row.roleId}
                onChange={setEditRoleId}
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
            <GenericDropdownInput
                key={String(row.id)}
                value={editId === row.id ? editCategoryId : row.categoryId}
                onChange={setEditCategoryId}
                options={categoryOptions}
                readOnly={readonly}
                placeholder="Select a category..."
            />
        ),
    },
];

// 4. Handle the update with the selected IDs
onUpdateRow={(id) => {
    updateEntity.mutate({
        params: { path: { id } },
        body: {
            roleId: editRoleId,
            categoryId: editCategoryId,
            // ... other fields
        },
    });
}}
*/
