import {
    GenericNewForm,
    type FormField,
} from "../../../shared-components/GenericNewForm";

type LabelTypeFormData = {
    labelTypeName: string;
    labelTypeLength: number;
    labelTypeWidth: number;
};

type Props = {
    onSubmit: (data: LabelTypeFormData) => void;
};

export function LabelTypeNewForm({ onSubmit }: Props) {
    const fields: FormField[] = [
        {
            key: "labelTypeName",
            label: "Name",
            type: "text",
            placeholder: "Name",
            required: true,
        },
        {
            key: "labelTypeLength",
            label: "Length",
            type: "number",
            placeholder: "Length",
            required: true,
            validation: (value) => typeof value === "number" && !isNaN(value),
        },
        {
            key: "labelTypeWidth",
            label: "Width",
            type: "number",
            placeholder: "Width",
            required: true,
            validation: (value) => typeof value === "number" && !isNaN(value),
        },
    ];

    return (
        <GenericNewForm<LabelTypeFormData>
            title="Create new label type"
            fields={fields}
            onSubmit={onSubmit}
        />
    );
}
