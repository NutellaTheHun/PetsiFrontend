import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { User } from "../../entityTypes";

export interface UseUsersOptions {
    relations?: (keyof User)[];
    limit?: number;
    offset?: string;
}

export function useUsersFindAll(options: UseUsersOptions = {}) {
    return useEntityFindAll<User>(
        {
            endpoint: "/users",
            defaultSortKey: "username",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "users",
        },
        options
    );
}
