import type { components } from "../../../api-types";
import { useGenericEntity } from "../useGenericEntity";

type User = components["schemas"]["User"];

export interface UseUsersOptions {
    relations?: (keyof User)[];
    limit?: number;
    offset?: string;
}

export function useUsers(options: UseUsersOptions = {}) {
    return useGenericEntity<User>(
        {
            endpoint: "/users",
            defaultSortKey: "username",
            defaultSortDirection: "ASC",
            supportsCreate: true,
            supportsUpdate: true,
            supportsDelete: true,
            itemsPropertyName: "users",
            createPropertyName: "createUser",
            updatePropertyName: "updateUser",
            deletePropertyName: "deleteUser",
        },
        options
    );
}
