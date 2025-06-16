import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../../../../api-types";
import { $api } from "../../../../lib/app-client";
import { NewRoleForm } from "./NewRoleForm";
import { RoleListItem } from "./RoleListItem";
import { RoleListItemEdited } from "./RoleListItemEdited";
import { RoleListItemSelected } from "./RoleListItemSelected";

export function RoleSettings() {
    type Role = components["schemas"]["Role"];

    const [newRoleName, setNewRoleName] = useState("");
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

    const [editingRoleId, setEditingRoleId] = useState<number | null>(null);

    const { data, isLoading, error } = $api.useQuery("get", "/roles");

    const roles = data?.items ?? [];

    const queryClient = useQueryClient();

    const refreshRoles = () =>
        queryClient.invalidateQueries({ queryKey: ["get", "/roles"] });

    // Create
    const createRoleRequest = $api.useMutation("post", "/roles", {
        onSuccess: () => {
            refreshRoles();
            setNewRoleName("");
        },
    });

    const handleAddRole = () => {
        if (!newRoleName.trim()) return;
        createRoleRequest.mutate({ body: { roleName: newRoleName.trim() } });
    };

    // Update
    const updateRoleRequest = $api.useMutation("patch", "/roles/{id}", {
        onSuccess: () => {
            refreshRoles();
            setEditingRoleId(null);
        },
    });

    const handleUpdateRole = (name: string) => {
        if (!editingRoleId) return;
        updateRoleRequest.mutate({
            params: { path: { id: editingRoleId } },
            body: { roleName: name },
        });
    };

    // Delete
    const deleteRoleRequest = $api.useMutation("delete", "/roles/{id}", {
        onSuccess() {
            refreshRoles();
            setEditingRoleId(null);
        },
    });

    const handleDeleteRole = () => {
        if (!selectedRoleId) return;
        deleteRoleRequest.mutate({ params: { path: { id: selectedRoleId } } });
    };

    // ---

    const renderRoleItem = (role: Role) => {
        if (role.id === editingRoleId && role.id === selectedRoleId) {
            return (
                <RoleListItemEdited
                    key={role.id}
                    role={role}
                    setEditingRoleId={setEditingRoleId}
                    handleUpdate={handleUpdateRole}
                />
            );
        }
        if (role.id === selectedRoleId) {
            return (
                <RoleListItemSelected
                    key={role.id}
                    role={role}
                    setSelectedRoleId={setSelectedRoleId}
                    handleEdit={setEditingRoleId}
                />
            );
        }
        return (
            <RoleListItem
                key={role.id}
                role={role}
                setSelectedRoleId={setSelectedRoleId}
            />
        );
    };

    if (isLoading) return <p>Loading roles...</p>;
    if (error) return <p>Error loading roles: {String(error)}</p>;

    return (
        <div
            className="container p-4 border rounded bg-white"
            style={{ width: 400 }}
        >
            <h3>Role Settings</h3>

            <ul className="list-group mb-3">{roles.map(renderRoleItem)}</ul>

            <NewRoleForm OnSubmit={handleAddRole} />

            <button
                className="btn btn-danger"
                onClick={handleDeleteRole}
                disabled={!selectedRoleId}
            >
                Remove Selected
            </button>
        </div>
    );
}
