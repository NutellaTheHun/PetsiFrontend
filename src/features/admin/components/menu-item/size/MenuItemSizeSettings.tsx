import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../../../../../api-types";
import { $api } from "../../../../../lib/app-client";
import { NewSizeForm } from "./NewSizeForm";
import { SizeListItem } from "./SizeListItem";
import { SizeListItemEdited } from "./SizeListItemEdited";
import { SizeListItemSelected } from "./SizeListItemSelected";

export function MenuItemSizeSettings() {
    type MenuItemSize = components["schemas"]["MenuItemSize"];

    const [selectedSizeId, setSelectedSizeId] = useState<number | null>(null);
    const [editingSizeId, setEditingSizeId] = useState<number | null>(null);

    const { data, isLoading, error } = $api.useQuery("get", "/menu-item-sizes");

    const sizes = data?.items ?? [];

    const queryClient = useQueryClient();

    const refreshSizes = () =>
        queryClient.invalidateQueries({
            queryKey: ["get", "/menu-item-sizes"],
        });

    // Create
    const createSizeRequest = $api.useMutation("post", "/menu-item-sizes", {
        onSuccess: () => {
            refreshSizes();
        },
    });

    const handleAddSize = (name: string) => {
        if (!name.trim()) return;
        createSizeRequest.mutate({ body: { sizeName: name.trim() } });
    };

    // Update
    const updateSizeRequest = $api.useMutation(
        "patch",
        "/menu-item-sizes/{id}",
        {
            onSuccess: () => {
                refreshSizes();
                setEditingSizeId(null);
            },
        }
    );

    const handleUpdateSize = (name: string) => {
        if (!editingSizeId) return;
        updateSizeRequest.mutate({
            params: { path: { id: editingSizeId } },
            body: { sizeName: name },
        });
    };

    // Delete
    const deleteSizeRequest = $api.useMutation(
        "delete",
        "/menu-item-sizes/{id}",
        {
            onSuccess: () => {
                refreshSizes();
                setEditingSizeId(null);
            },
        }
    );

    const handleDeleteSize = () => {
        if (!selectedSizeId) return;
        deleteSizeRequest.mutate({ params: { path: { id: selectedSizeId } } });
    };

    // ---

    const renderSizeItem = (size: MenuItemSize) => {
        if (size.id === editingSizeId && size.id === selectedSizeId) {
            return (
                <SizeListItemEdited
                    key={size.id}
                    size={size}
                    setEditingSizeId={setEditingSizeId}
                    handleUpdate={handleUpdateSize}
                />
            );
        }
        if (size.id === selectedSizeId) {
            return (
                <SizeListItemSelected
                    key={size.id}
                    size={size}
                    handleEdit={setEditingSizeId}
                />
            );
        }
        return (
            <SizeListItem
                key={size.id}
                size={size}
                setSelectedSizeId={setSelectedSizeId}
            />
        );
    };

    if (isLoading) return <p>Loading sizes...</p>;
    if (error) return <p>Error loading sizes: {String(error)}</p>;

    return (
        <div
            className="container p-4 border rounded bg-white"
            style={{ width: 400 }}
        >
            <h3>Size Settings</h3>

            <ul className="list-group mb-3">{sizes.map(renderSizeItem)}</ul>

            <NewSizeForm OnSubmit={handleAddSize} />

            <button
                className="btn btn-danger"
                onClick={handleDeleteSize}
                disabled={!selectedSizeId}
            >
                Remove Selected
            </button>
        </div>
    );
}
