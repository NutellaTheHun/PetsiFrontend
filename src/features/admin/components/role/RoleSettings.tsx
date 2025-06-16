import { useQueryClient } from "@tanstack/react-query";
import type { components } from "../../../../api-types";
import { $api } from "../../../../lib/app-client";
import { GenericListGroup } from "../../../shared-components/list-group/GenericListGroup";
import { RoleListItem } from "./RoleListItem";
import { RoleListItemEdited } from "./RoleListItemEdited";
import { RoleListItemSelected } from "./RoleListItemSelected";

export function RoleSettings() {
    type Role = components["schemas"]["Role"];

    const { data, isLoading, error } = $api.useQuery("get", "/roles");

    const queryClient = useQueryClient();

    const roles = data?.items ?? [];

    const refresh = () => {
        queryClient.invalidateQueries({ queryKey: ["get", "/roles"] });
    };

    const createRole = $api.useMutation("post", "/roles", {
        onSuccess: refresh,
    });

    const updateRole = $api.useMutation("patch", "/roles/{id}", {
        onSuccess: refresh,
    });

    const deleteRole = $api.useMutation("delete", "/roles/{id}", {
        onSuccess: refresh,
    });

    if (isLoading) return <p>Loading roles...</p>;
    if (error) return <p>Error loading roles: {String(error)}</p>;

    return (
        <GenericListGroup<Role>
            title="Role Settings"
            items={roles}
            onAdd={(name) => createRole.mutate({ body: { roleName: name } })}
            onDelete={(id) => deleteRole.mutate({ params: { path: { id } } })}
            onUpdate={(id, name) =>
                updateRole.mutate({
                    params: { path: { id } },
                    body: { roleName: name },
                })
            }
            renderItem={(role, state) => {
                const {
                    selectedId,
                    editingId,
                    setSelectedId,
                    setEditingId,
                    handleUpdate,
                } = state;
                if (role.id === editingId && role.id === selectedId) {
                    return (
                        <RoleListItemEdited
                            key={role.id}
                            role={role}
                            setEditingRoleId={setEditingId}
                            handleUpdate={handleUpdate}
                        />
                    );
                }
                if (role.id === selectedId) {
                    return (
                        <RoleListItemSelected
                            key={role.id}
                            role={role}
                            handleEdit={setEditingId}
                        />
                    );
                }
                return (
                    <RoleListItem
                        key={role.id}
                        role={role}
                        setSelectedRoleId={setSelectedId}
                    />
                );
            }}
        />
    );
}
