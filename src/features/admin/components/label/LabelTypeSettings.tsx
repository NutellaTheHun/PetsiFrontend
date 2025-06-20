import { useState } from "react";
import type { components } from "../../../../api-types";
import { useLabelTypes } from "../../../../entity-hooks/useLabelTypes";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../shared-components/table/GenericTable";
import { GenericInput } from "../../../shared-components/table/render-cell-content/GenericInput";
import { LabelTypeNewForm } from "./LabelTypeNewForm";

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
    const [isEdit, setIsEdit] = useState(false);

    const setEdit = (id: number | null) => {
        setTargetId(id);
        if (id === null) {
            setIsEdit(false);
            setEditValues(null);
        } else {
            setIsEdit(true);
            const rowToEdit = labelTypes.find((row) => row.id === id);
            if (!rowToEdit) return;
            const { id: _, ...editableValues } = rowToEdit;
            setEditValues(editableValues);
        }
    };

    const setSelect = (id: number | null) => {
        setTargetId(id);
        setIsEdit(false);
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
            editable: false,
            render: (row, readonly) => (
                <GenericInput
                    key={String(row.id)}
                    type="number"
                    value={row.id}
                    onChange={(val) => handleValueChange("labelTypeName", val)}
                    readOnly={readonly}
                />
            ),
        },
        {
            key: "labelTypeName",
            label: "Name",
            sortable: true,
            editable: true,
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
            editable: true,
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
            editable: true,
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
            <GenericTable
                data={labelTypes}
                columns={columns}
                targetId={targetId}
                isEdit={isEdit}
                onHeaderClick={handleHeaderClick}
                sortBy={sortKey}
                sortDirection={sortDirection}
                onSetEdit={setEdit}
                onSetSelected={setSelect}
                onDeleteRow={(id) =>
                    deleteType.mutate({ params: { path: { id } } })
                }
                onUpdateRow={(id) => {
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
