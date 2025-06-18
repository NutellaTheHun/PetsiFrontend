import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../../../../api-types";
import { $api } from "../../../../lib/app-client";
import { GenericListGroup } from "../../../shared-components/list-group/GenericListGroup";

type InventoryArea = components["schemas"]["InventoryArea"];

export function InventoryAreaSettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const { data, isLoading, error } = $api.useQuery("get", "/inventory-areas");
    const areas = data?.items ?? [];
    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/inventory-areas"],
        });

    const createArea = $api.useMutation("post", "/inventory-areas", {
        onSuccess: refresh,
    });

    const updateArea = $api.useMutation("patch", "/inventory-areas/{id}", {
        onSuccess: refresh,
    });

    const deleteArea = $api.useMutation("delete", "/inventory-areas/{id}", {
        onSuccess: refresh,
    });

    if (isLoading) return <p>Loading areas...</p>;
    if (error) return <p>Error loading areas: {String(error)}</p>;

    return (
        <GenericListGroup<InventoryArea, "areaName">
            title="Areas"
            items={areas}
            targetProp="areaName"
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onAdd={(name) => createArea.mutate({ body: { areaName: name } })}
            onDelete={(id) => deleteArea.mutate({ params: { path: { id } } })}
            onUpdate={(id, name) => {
                updateArea.mutate({
                    params: { path: { id } },
                    body: { areaName: name },
                });
            }}
        />
    );
}
