import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { Role } from "../../entityTypes";

export type RoleSortKey = keyof Pick<Role, "roleName" | "id">;

export interface UseRolesOptions {
    relations?: (keyof Role)[];
    limit?: number;
    offset?: string;
}

export function useRolesFindAll(options: UseRolesOptions = {}) {
    return useEntityFindAll<Role>(
        {
            endpoint: "/roles",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "roles",
        },
        options
    );
}
