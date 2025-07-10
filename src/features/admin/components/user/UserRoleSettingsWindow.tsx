import {
    useRoleMutations,
    useUserMutations,
    useUsersFindAll,
} from "../../../../entity/hookIndex";
import { RoleListGroup } from "../../../../entity/roles/components/role/RoleListGroup";
import { useRolesFindAll } from "../../../../entity/roles/hooks/useRolesFindAll";
import { UserTable } from "../../../../entity/users/components/user/UserTable";

export function UserRoleSettingsWindow() {
    const {
        roles,
        isLoading: isLoadingRoles,
        error: rolesError,
    } = useRolesFindAll();
    const roleMutator = useRoleMutations();

    const {
        users,
        isLoading: isLoadingUsers,
        error: usersError,
        setSortKey: usersSetSortKey,
        setSortDirection: usersSetSortDirection,
        sortKey: usersSortKey,
        sortDirection: usersSortDirection,
    } = useUsersFindAll({ relations: ["roles"] });
    const userMutator = useUserMutations();

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {isLoadingRoles ? (
                        <p>Loading roles...</p>
                    ) : rolesError ? (
                        <p>Error loading roles: {String(rolesError)}</p>
                    ) : (
                        <RoleListGroup
                            data={roles}
                            useEntityMutation={roleMutator}
                        />
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {isLoadingUsers ? (
                        <p>Loading users...</p>
                    ) : usersError ? (
                        <p>Error loading users: {String(usersError)}</p>
                    ) : (
                        <UserTable
                            data={users}
                            useEntityMutation={userMutator}
                            sortKeyState={[usersSortKey, usersSetSortKey]}
                            sortDirectionState={[
                                usersSortDirection,
                                usersSetSortDirection,
                            ]}
                            roles={roles}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
