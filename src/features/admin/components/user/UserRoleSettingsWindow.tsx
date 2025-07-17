import { Paper } from "@mantine/core";
import {
    useRoleMutations,
    useUserMutations,
    useUsersFindAll,
} from "../../../../entity/hookIndex";
import { RoleListGroup } from "../../../../entity/roles/components/role/RoleListGroup";
import { useRolesFindAll } from "../../../../entity/roles/hooks/useRolesFindAll";
import { UserTable } from "../../../../entity/users/components/user/UserTable";
import { MantineTitle } from "../../../../lib/uiComponents/MantineTitle";

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
                        <Paper withBorder shadow="sm" p="md" mt="md" w={600}>
                            <MantineTitle title="Roles" />
                            <RoleListGroup
                                data={roles}
                                useEntityMutation={roleMutator}
                            />
                        </Paper>
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
                        <Paper withBorder shadow="sm" p="md" mt="md">
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
                        </Paper>
                    )}
                </div>
            </div>
        </div>
    );
}
