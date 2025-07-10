import {
    SORT_DIRECTION,
    useEntityFindAll,
} from "../../../lib/entityHookTemplates/UseEntityFindAll";
import type { User } from "../../entityTypes";

export type UserSortKey = keyof Pick<User, "username" | "id">;

export interface UseUsersOptions {
    relations?: (keyof User)[];
    limit?: number;
    offset?: string;
}

export function useUsersFindAll(options: UseUsersOptions = {}) {
    return useEntityFindAll<User>(
        {
            endpoint: "/users",
            defaultSortKey: "id",
            defaultSortDirection: SORT_DIRECTION.ASC,
            itemsPropertyName: "users",
        },
        options
    );
}
