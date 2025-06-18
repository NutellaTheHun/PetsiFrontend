import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../../../../api-types";
import { $api } from "../../../../lib/app-client";
import {
    DynamicTable,
    type TableColumn,
} from "../../../shared-components/table/DynamicTable";

type LabelType = components["schemas"]["LabelType"];

export function LabelTypeSettings() {
    // labelTypeName
    // labelTypeLength
    // labelTypeWidth

    // table of string cols
    const { data, isLoading, error } = $api.useQuery("get", "/label-types");
    const labelTypes = data?.items ?? [];

    const [selectedRowId, setSelectedRowId] = useState<number | null>(null);
    const selectedRow = labelTypes.find((lt) => lt.id === selectedRowId);
    const [selectedName, setselectedName] = useState<string>("");
    const [selectedLength, setselectedLength] = useState<number | null>(null);
    const [selectedWidth, setselectedWidth] = useState<number | null>(null);

    const [createName, setCreateName] = useState<string>("");
    const [createLength, setCreateLength] = useState<number | null>(null);
    const [createWidth, setCreateWidth] = useState<number | null>(null);

    const isFormValid =
        createName.trim() !== "" &&
        typeof createLength === "number" &&
        !isNaN(createLength) &&
        typeof createWidth === "number" &&
        !isNaN(createWidth);

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

    const columns: TableColumn<LabelType>[] = [
        {
            key: "labelTypeName",
            label: "Name",
            render: (row) => (
                <input type="text" value={row.labelTypeName} readOnly />
            ),
        },
        {
            key: "labelTypeLength",
            label: "Length",
            render: (row) => (
                <input type="text" value={row.labelTypeLength} readOnly />
            ),
        },
        {
            key: "labelTypeWidth",
            label: "Width",
            render: (row) => (
                <input type="text" value={row.labelTypeWidth} readOnly />
            ),
        },
    ];

    if (isLoading) return <p>Loading label types...</p>;
    if (error) return <p>Error loading label types: {String(error)}</p>;
    return (
        <div className="container">
            <DynamicTable
                data={labelTypes}
                columns={columns}
                selectedId={selectedRowId}
                onRowClick={setSelectedRowId}
            />
            <div>
                <label>Create new label type</label>
                <div>
                    <input
                        type="text"
                        className="form-control-sm"
                        placeholder="Name"
                        onChange={(e) => setCreateName(e.target.value)}
                    />
                    <input
                        className="form-control-sm"
                        type="text"
                        placeholder="Length"
                        onChange={(e) =>
                            setCreateLength(Number(e.target.value))
                        }
                    />
                    <input
                        type="text"
                        className="form-control-sm"
                        placeholder="Width"
                        onChange={(e) => setCreateWidth(Number(e.target.value))}
                    />
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            if (!isFormValid) return;
                            createType.mutate({
                                body: {
                                    labelTypeName: createName,
                                    labelTypeLength: createLength,
                                    labelTypeWidth: createWidth,
                                },
                            });

                            setCreateName("");
                            setCreateLength(null);
                            setCreateWidth(null);
                        }}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
}
