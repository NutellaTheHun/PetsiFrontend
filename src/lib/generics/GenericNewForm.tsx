import { useState } from "react";

export interface FormField {
    key: string;
    label: string;
    type: "text" | "number";
    placeholder?: string;
    required?: boolean;
    validation?: (value: any) => boolean;
}

interface GenericNewFormProps<T extends Record<string, any>> {
    title: string;
    fields: FormField[];
    onSubmit: (data: T) => void;
    submitButtonText?: string;
    className?: string;
}

export function GenericNewForm<T extends Record<string, any>>({
    title,
    fields,
    onSubmit,
    submitButtonText = "Create",
    className = "",
}: GenericNewFormProps<T>) {
    const [formData, setFormData] = useState<Record<string, any>>(() => {
        const initial: Record<string, any> = {};
        fields.forEach((field) => {
            initial[field.key] = field.type === "number" ? 0 : "";
        });
        return initial;
    });

    const isFormValid = fields.every((field) => {
        const value = formData[field.key];
        if (field.required && (value === "" || value === 0)) return false;
        if (field.validation && !field.validation(value)) return false;
        return true;
    });

    const handleFieldChange = (key: string, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const handleSubmit = () => {
        if (!isFormValid) return;
        onSubmit(formData as T);
        // Reset form
        const reset: Record<string, any> = {};
        fields.forEach((field) => {
            reset[field.key] = field.type === "number" ? 0 : "";
        });
        setFormData(reset);
    };

    return (
        <div className={className}>
            <label>{title}</label>
            <div className="d-flex gap-2">
                {fields.map((field) => (
                    <input
                        key={field.key}
                        type={field.type}
                        className="form-control-sm"
                        placeholder={field.placeholder || field.label}
                        value={formData[field.key]}
                        onChange={(e) => {
                            const value =
                                field.type === "number"
                                    ? Number(e.target.value)
                                    : e.target.value;
                            handleFieldChange(field.key, value);
                        }}
                    />
                ))}
                <button
                    className="btn btn-primary"
                    onClick={handleSubmit}
                    disabled={!isFormValid}
                >
                    {submitButtonText}
                </button>
            </div>
        </div>
    );
}
