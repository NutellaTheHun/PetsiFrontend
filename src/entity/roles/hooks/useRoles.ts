import type { components } from "../../../api-types";
import { useGenericEntity } from "../../../lib/entityHookTemplates/UseGenericEntity";

type Role = components["schemas"]["Role"];

export interface UseRolesOptions {
    relations?: (keyof Role)[];
    limit?: number;
    offset?: string;
}

export function useRoles(options: UseRolesOptions = {}) {
    return useGenericEntity<Role>(
        {
            endpoint: "/roles",
            defaultSortKey: "roleName",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "roles",
            createPropertyName: "createRole",
            updatePropertyName: "updateRole",
            deletePropertyName: "deleteRole",
        },
        options
    );
}
