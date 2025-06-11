import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { $api } from "../../../lib/app-client";
import { RoleListItem } from "./RoleListItem";
import { RoleListItemEdited } from "./RoleListItemEdited";
import { RoleListItemSelected } from "./RoleListItemSelected";

export function RoleSettings() {
    const [newRoleName, setNewRoleName] = useState("");
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

    const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
    const [editedName, setEditedName] = useState("");

    const { data, isLoading, error } = $api.useQuery("get", "/roles");

    const roles = data?.items ?? [];

    const queryClient = useQueryClient();

    // Create
    const createRole = $api.useMutation("post", "/roles", {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get", "/roles"] });
            queryClient.refetchQueries({ queryKey: ["get", "/roles"] });
            setNewRoleName("");
        },
    });

    const handleAddRole = () => {
        if (!newRoleName.trim()) return;
        createRole.mutate({ body: { roleName: newRoleName.trim() } });
    };

    // Update
    const updateRole = $api.useMutation("patch", "/roles/{id}", {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get", "/roles"] });
            queryClient.refetchQueries({ queryKey: ["get", "/roles"] });
            setEditingRoleId(null);
            setEditedName("");
        },
    });

    const handleUpdateRole = () => {
        if (!editingRoleId) return;
        updateRole.mutate({
            params: { path: { id: editingRoleId } },
            body: { roleName: editedName },
        });
    };

    const handleEdit = (id: number, currentName: string) => {
        setEditingRoleId(id);
        setEditedName(currentName);
    };

    // Delete
    const deleteRole = $api.useMutation("delete", "/roles/{id}", {
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["get", "/roles"] });
            queryClient.refetchQueries({ queryKey: ["get", "/roles"] });
            setEditingRoleId(null);
        },
    });

    const handleDeleteRole = () => {
        if (!selectedRoleId) return;
        deleteRole.mutate({ params: { path: { id: selectedRoleId } } });
    };

    if (isLoading) return <p>Loading roles...</p>;
    if (error) return <p>Error loading roles: {String(error)}</p>;

    return (
        <div
            className="container p-4 border rounded bg-white"
            style={{ width: 400 }}
        >
            <h3>Role Settings</h3>

            <ul className="list-group mb-3">
                {roles.map((role) =>
                    role.id === editingRoleId && role.id === selectedRoleId ? (
                        <RoleListItemEdited
                            key={role.id}
                            role={role}
                            setSelectedRoleId={setSelectedRoleId}
                            editedName={editedName}
                            setEditedName={setEditedName}
                            setEditingRoleId={setEditingRoleId}
                            handleUpdate={handleUpdateRole}
                        />
                    ) : role.id === selectedRoleId ? (
                        <RoleListItemSelected
                            key={role.id}
                            role={role}
                            setSelectedRoleId={setSelectedRoleId}
                            handleEdit={handleEdit}
                        />
                    ) : (
                        <RoleListItem
                            key={role.id}
                            role={role}
                            setSelectedRoleId={setSelectedRoleId}
                        />
                    )
                )}
            </ul>

            <div className="input-group mb-3">
                <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    className="form-control"
                    placeholder="New Role Name"
                />
                <button
                    className="btn btn-primary"
                    onClick={handleAddRole}
                    disabled={!newRoleName}
                >
                    Add
                </button>
            </div>

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
