import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../../../../api-types";
import { $api } from "../../../../lib/app-client";
import {
    GenericTable,
    type GenericTableColumn,
} from "../../../shared-components/table/GenericTable";
import { LabelTypeNewForm } from "./LabelTypeNewForm";

type LabelType = components["schemas"]["LabelType"];

export function LabelTypeSettings() {
    const [sortKey, setSortKey] = useState<keyof LabelType>("labelTypeName");
    const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("ASC");

    const { data, isLoading, error } = $api.useQuery("get", "/label-types", {
        params: {
            query: {
                sortBy: sortKey,
                sortOrder: sortDirection,
            },
        },
    });
    const labelTypes = data?.items ?? [];

    const [editId, setEditId] = useState<number | null>(null);
    const [editName, setEditName] = useState<string>("");
    const [editLength, setEditLength] = useState<number | null>(null);
    const [editWidth, setEditWidth] = useState<number | null>(null);
    const resetEdit = () => {
        setEditName("");
        setEditLength(null);
        setEditWidth(null);
        setEditId(null);
    };
    const handleEditToggle = (id: number | null) => {
        if (id === null) {
            resetEdit();
        } else {
            resetEdit();
            setEditId(id);
        }
    };

    const [selectId, setSelectId] = useState<number | null>(null);
    const handleSelectRow = (id: number | null) => {
        if (editId && editId !== id) {
            resetEdit();
        }
        setSelectId(id);
    };

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/label-types"],
        });

    const createType = $api.useMutation("post", "/label-types", {
        onSuccess: refresh,
    });

    const updateType = $api.useMutation("patch", "/label-types/{id}", {
        onSuccess: refresh,
    });

    const deleteType = $api.useMutation("delete", "/label-types/{id}", {
        onSuccess: refresh,
    });

    const columns: GenericTableColumn<LabelType>[] = [
        {
            key: "labelTypeName",
            label: "Name",
            sortable: true,
            editable: true,
            render: (row, readonly) => (
                <input
                    type="text"
                    key={String(row.id)}
                    value={
                        editId === row.id
                            ? editName === ""
                                ? row.labelTypeName
                                : editName
                            : row.labelTypeName
                    }
                    onChange={(e) => setEditName(e.target.value)}
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
                <input
                    type="number"
                    key={String(row.id)}
                    value={
                        editId === row.id
                            ? editLength ?? row.labelTypeLength
                            : row.labelTypeLength
                    }
                    onChange={(e) => setEditLength(Number(e.target.value))}
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
                <input
                    type="number"
                    key={String(row.id)}
                    value={
                        editId === row.id
                            ? editWidth ?? row.labelTypeWidth
                            : row.labelTypeWidth
                    }
                    onChange={(e) => setEditWidth(Number(e.target.value))}
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
                selectedId={selectId}
                editedId={editId}
                onRowClick={handleSelectRow} // *
                onHeaderClick={handleHeaderClick}
                sortBy={sortKey}
                sortDirection={sortDirection}
                onSetEdit={handleEditToggle}
                onSetSelected={setSelectId}
                onDeleteRow={(id) =>
                    deleteType.mutate({ params: { path: { id } } })
                }
                onUpdateRow={(id) => {
                    if (
                        typeof editLength === "number" &&
                        typeof editWidth === "number" &&
                        editName.trim() !== ""
                    ) {
                        updateType.mutate({
                            params: { path: { id } },
                            body: {
                                labelTypeName: editName,
                                labelTypeLength: editLength,
                                labelTypeWidth: editWidth,
                            },
                        });
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
