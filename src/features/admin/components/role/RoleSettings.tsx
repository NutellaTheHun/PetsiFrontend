import { useState } from "react";
import type { Role, UpdateRoleDto } from "../../../../entity/entityTypes";
import { useRoles } from "../../../../entity/roles/hooks/useRoles";
import { RoleRender } from "../../../../entity/roles/property-render/Role.render";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";

export function RoleSettings() {
    const { roles, isLoading, error, createRole, updateRole, deleteRole } =
        useRoles();

    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
    const [editingRoleId, setEditingRoleId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<UpdateRoleDto | null>(null);

    if (isLoading) return <p>Loading roles...</p>;
    if (error) return <p>Error loading roles: {String(error)}</p>;

    return (
        <GenericListGroup<Role>
            items={roles}
            selectedIdState={[selectedRoleId, setSelectedRoleId]}
            editingIdState={[editingRoleId, setEditingRoleId]}
            onAdd={(name) => createRole.mutate({ body: { roleName: name } })}
            onDelete={(id) => deleteRole.mutate({ params: { path: { id } } })}
            onUpdate={(id) =>
                updateRole.mutate({
                    params: { path: { id } },
                    body: { roleName: name },
                })
            }
            renderItem={(role) => (
                <RoleRender
                    entityProp="roleName"
                    instance={role}
                    state={selectedRoleId === role.id ? "edited" : "normal"}
                    context={{
                        setRoleName: (name) => {
                            setEditValues({ ...editValues, roleName: name });
                        },
                    }}
                />
            )}
        />
    );
}
