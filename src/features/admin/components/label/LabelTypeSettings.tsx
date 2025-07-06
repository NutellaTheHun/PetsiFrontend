import { useState } from "react";
import type { components } from "../../../../api-types";
import { LabelTypeNewForm } from "../../../../entity/labels/components/labelType/LabelTypeNewForm";
import { useLabelTypes } from "../../../../entity/labels/hooks/useLabelTypes";
import { GenericInput } from "../../../../lib/generics/propertyRenderers/GenericInput";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../../lib/generics/table/GenericTable";

type LabelType = components["schemas"]["LabelType"];
type LabelTypeUpdate = Omit<LabelType, "id">;

export function LabelTypeSettings() {
    const {
        labelTypes,
        isLoading,
        error,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        createType,
        updateType,
        deleteType,
    } = useLabelTypes();

    const [editValues, setEditValues] = useState<LabelTypeUpdate | null>(null);

    const [targetId, setTargetId] = useState<number | null>(null);
    const [editingId, setEditingId] = useState<number | null>(null);

    const setEdit = (id: number | null) => {
        setTargetId(id);
        if (id === null) {
            setEditingId(null);
            setEditValues(null);
        } else {
            setEditingId(id);
            const rowToEdit = labelTypes.find(
                (row: LabelType) => row.id === id
            );
            if (!rowToEdit) return;
            const { id: _, ...editableValues } = rowToEdit;
            setEditValues(editableValues);
        }
    };

    const setSelect = (id: number | null) => {
        setTargetId(id);
        setEditingId(null);
        if (editValues) {
            setEditValues(null);
        }
    };

    const handleValueChange = (
        key: keyof LabelTypeUpdate,
        value: string | number
    ) => {
        if (editValues) {
            setEditValues({ ...editValues, [key]: value });
        }
    };

    const columns: GenericTableColumn<LabelType>[] = [
        {
            key: "id",
            label: "Id",
            sortable: true,
            render: (row, readonly) => (
                <GenericInput
                    key={String(row.id)}
                    type="number"
                    value={row.id}
                    //onChange={(val) => handleValueChange("labelTypeName", val)}
                    readOnly={readonly}
                />
            ),
        },
        {
            key: "labelTypeName",
            label: "Name",
            sortable: true,
            render: (row, readonly) => (
                <GenericInput
                    key={String(row.id)}
                    type="text"
                    value={
                        targetId === row.id && editValues
                            ? editValues.labelTypeName
                            : row.labelTypeName
                    }
                    onChange={(val) => handleValueChange("labelTypeName", val)}
                    readOnly={readonly}
                />
            ),
        },
        {
            key: "labelTypeLength",
            label: "Length",
            sortable: false,
            render: (row, readonly) => (
                <GenericInput
                    key={String(row.id)}
                    type="number"
                    value={
                        targetId === row.id && editValues
                            ? editValues.labelTypeLength
                            : row.labelTypeLength
                    }
                    onChange={(val) =>
                        handleValueChange("labelTypeLength", Number(val))
                    }
                    readOnly={readonly}
                />
            ),
        },
        {
            key: "labelTypeWidth",
            label: "Width",
            sortable: false,
            render: (row, readonly) => (
                <GenericInput
                    key={String(row.id)}
                    type="number"
                    value={
                        targetId === row.id && editValues
                            ? editValues.labelTypeWidth
                            : row.labelTypeWidth
                    }
                    onChange={(val) =>
                        handleValueChange("labelTypeWidth", Number(val))
                    }
                    readOnly={readonly}
                />
            ),
        },
    ];

    const handleHeaderClick = (key: keyof LabelType) => {
        if (key === sortKey) {
            setSortDirection(sortDirection === "ASC" ? "DESC" : "ASC");
        } else {
            setSortKey(key);
            setSortDirection("ASC");
        }
    };

    if (isLoading) return <p>Loading label types...</p>;
    if (error) return <p>Error loading label types: {String(error)}</p>;
    return (
        <div className="container">
            <GenericTable<LabelType>
                data={labelTypes}
                columns={columns}
                targetId={targetId}
                editingId={editingId}
                onHeaderClick={handleHeaderClick}
                sortBy={sortKey}
                sortDirection={sortDirection}
                onSetEdit={setEdit}
                onSetSelected={setSelect}
                onDelete={(id) =>
                    deleteType.mutate({ params: { path: { id } } })
                }
                onUpdate={(id) => {
                    if (
                        editValues &&
                        editValues.labelTypeName.trim() !== "" &&
                        editValues.labelTypeLength !== null &&
                        editValues.labelTypeWidth !== null
                    ) {
                        updateType.mutate(
                            {
                                params: { path: { id } },
                                body: editValues,
                            },
                            {
                                onSuccess: () => {
                                    setSelect(null);
                                },
                            }
                        );
                    }
                }}
            />
            <div>
                <LabelTypeNewForm
                    onSubmit={(data) => createType.mutate({ body: data })}
                />
            </div>
        </div>
    );
}
