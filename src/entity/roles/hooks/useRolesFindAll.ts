import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { Role } from "../../entityTypes";

export interface UseRolesOptions {
    relations?: (keyof Role)[];
    limit?: number;
    offset?: string;
}

export function useRolesFindAll(options: UseRolesOptions = {}) {
    return useEntityFindAll<Role>(
        {
            endpoint: "/roles",
            defaultSortKey: "roleName",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "roles",
        },
        options
    );
}
