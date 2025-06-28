import { useState } from "react";
import type { components } from "../../../../api-types";
import { useRoles } from "../../../../entity/roles/hooks/useRoles";
import { GenericListGroup } from "../../../../lib/generics/listGroup/GenericListGroup";

type Role = components["schemas"]["Role"];

export function RoleSettings() {
    const { roles, isLoading, error, createRole, updateRole, deleteRole } =
        useRoles();

    const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);

    if (isLoading) return <p>Loading roles...</p>;
    if (error) return <p>Error loading roles: {String(error)}</p>;

    return (
        <GenericListGroup<Role, "roleName">
            title="Role Settings"
            items={roles}
            targetProp="roleName"
            selectedId={selectedRoleId}
            onSetSelectId={setSelectedRoleId}
            onAdd={(name) => createRole.mutate({ body: { roleName: name } })}
            onDelete={(id) => deleteRole.mutate({ params: { path: { id } } })}
            onUpdate={(id, name) =>
                updateRole.mutate({
                    params: { path: { id } },
                    body: { roleName: name },
                })
            }
        />
    );
}
