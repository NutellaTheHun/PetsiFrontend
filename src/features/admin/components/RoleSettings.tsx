import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import type { components } from "../../../api-types";
import { $api } from "../../../lib/app-client";

type Role = components["schemas"]["Role"];
type CreateRoleDto = components["schemas"]["CreateRoleDto"];

export function RoleSettings() {
    const [newRoleName, setNewRoleName] = useState("");
    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

    const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
    const [editedName, setEditedName] = useState("");

    const { data, isLoading, error } = $api.useQuery("get", "/roles");
    if (isLoading) return <p>Loading roles...</p>;
    if (error) return <p>Error loading roles: {String(error)}</p>;

    const roles = data?.items ?? [];

    const queryClient = useQueryClient();

    // Create
    const createRole = $api.useMutation("post", "/roles", {
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["get", "/roles"] });
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

    const selectEdit = (id: number, currentName: string) => {
        setEditingRoleId(id);
        setEditedName(currentName);
    };

    // Delete
    const deleteRole = $api.useMutation("delete", "/roles/{id}", {
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["get", "/roles"] });
            setEditingRoleId(null);
        },
    });

    const handleDeleteRole = () => {
        if (!selectedRoleId) return;
        deleteRole.mutate({ params: { path: { id: selectedRoleId } } });
    };

    return (
        <div
            className="container p-4 border rounded bg-white"
            style={{ width: 400 }}
        >
            <h3>Role Settings</h3>

            <ul className="list-group mb-3">
                {roles.map((role) => (
                    <li
                        key={role.id}
                        onClick={() => setSelectedRoleId(role.id)}
                        className={`list-group-item d-flex justify-content-between align-items-center ${
                            role.id === selectedRoleId
                                ? "active text-white"
                                : ""
                        }`}
                        style={{ cursor: "pointer" }}
                    >
                        {role.roleName}
                    </li>
                ))}
            </ul>

            <div className="input-group mb-3">
                <input
                    type="text"
                    value={newRoleName}
                    onChange={(e) => setNewRoleName(e.target.value)}
                    className="form-control"
                    placeholder="New Role Name"
                />
                <button className="btn btn-primary" onClick={handleAddRole}>
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
