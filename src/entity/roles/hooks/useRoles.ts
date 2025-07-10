import type { components } from "../../../api-types";
import {
    SORT_DIRECTION,
    useGenericEntity,
} from "../../../lib/entityHookTemplates/UseGenericEntity";

type Role = components["schemas"]["Role"];

export type RoleSortKey = keyof Pick<Role, "roleName" | "id">;

export interface UseRolesOptions {
    relations?: (keyof Role)[];
    limit?: number;
    offset?: string;
}

export function useRoles(options: UseRolesOptions = {}) {
    return useGenericEntity<Role, RoleSortKey, UseRolesOptions>(
        {
            endpoint: "/roles",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
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
