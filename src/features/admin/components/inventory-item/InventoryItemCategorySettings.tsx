import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../../../../api-types";
import { $api } from "../../../../lib/app-client";
import { GenericListGroup } from "../../../shared-components/list-group/GenericListGroup";

type InventoryItemCategory = components["schemas"]["InventoryItemCategory"];

export function InventoryItemCategorySettings() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const { data, isLoading, error } = $api.useQuery(
        "get",
        "/inventory-item-categories"
    );

    const categories = data?.items ?? [];

    const queryClient = useQueryClient();

    const refresh = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/inventory-item-categories"],
        });

    // Create
    const createSize = $api.useMutation("post", "/inventory-item-categories", {
        onSuccess: refresh,
    });

    // Update
    const UpdateSize = $api.useMutation(
        "patch",
        "/inventory-item-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    // Delete
    const deleteSize = $api.useMutation(
        "delete",
        "/inventory-item-categories/{id}",
        {
            onSuccess: refresh,
        }
    );

    // ---
    if (isLoading) return <p>Loading categories...</p>;
    if (error) return <p>Error loading categories: {String(error)}</p>;

    return (
        <GenericListGroup<InventoryItemCategory, "categoryName">
            title="Categories"
            items={categories}
            targetProp="categoryName"
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onAdd={(name) =>
                createSize.mutate({ body: { itemCategoryName: name } })
            }
            onDelete={(id) => deleteSize.mutate({ params: { path: { id } } })}
            onUpdate={(id, name) =>
                UpdateSize.mutate({
                    params: { path: { id } },
                    body: { itemCategoryName: name },
                })
            }
        />
    );
}
