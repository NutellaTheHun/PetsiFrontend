import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import type { SortDirection } from "../../../../lib/entityHookTemplates/UseGenericEntity";
import {
    EntityTableFactory,
    type EntityTableContext,
} from "../../../../lib/entityUIDefinitions/EntityTableFactory";
import type { GenericStatefulEntity } from "../../../../lib/generics/GenericStatefulEntity";
import type { Role, User } from "../../../entityTypes";
import type {
    UserCreateContext,
    UserEditContext,
} from "../../hooks/useUserMutations";
import type { UserSortKey } from "../../hooks/useUsersFindAll";
import { UserRender } from "../../property-render/User.render";

interface UserTableProps
    extends Omit<
        EntityTableContext<
            User,
            UserEditContext,
            UserCreateContext,
            UserSortKey
        >,
        "columns" | "validSortKeys"
    > {
    data: User[];
    useEntityMutation: UseEntityMutationsReturn<
        User,
        UserEditContext,
        UserCreateContext
    >;
    externalSelectedState?: [User | null, (entity: User | null) => void];
    sortKeyState: [UserSortKey, (sortKey: UserSortKey) => void];
    sortDirectionState: [SortDirection, (direction: SortDirection) => void];
    roles: Role[];
}

export function UserTable(props: UserTableProps) {
    return (
        <EntityTableFactory<
            User,
            UserEditContext,
            UserCreateContext,
            UserSortKey
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            sortKeyState={props.sortKeyState}
            sortDirectionState={props.sortDirectionState}
            validSortKeys={["username", "id"]}
            columns={[
                {
                    key: "id",
                    label: "Id",
                    sortable: true,
                    renderProperty: (entity: GenericStatefulEntity<User>) => {
                        return (
                            <UserRender
                                entityProp="id"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "username",
                    label: "Username",
                    sortable: true,
                    renderProperty: (entity: GenericStatefulEntity<User>) => {
                        return (
                            <UserRender
                                entityProp="username"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "email",
                    label: "Email",
                    sortable: true,
                    renderProperty: (entity: GenericStatefulEntity<User>) => {
                        return (
                            <UserRender
                                entityProp="email"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "roles",
                    label: "Roles",
                    sortable: true,
                    renderProperty: (entity: GenericStatefulEntity<User>) => {
                        return (
                            <UserRender
                                entityProp="roles"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                                dataContext={{
                                    roles: props.roles,
                                }}
                            />
                        );
                    },
                },
                {
                    key: "createdAt",
                    label: "Created At",
                    sortable: true,
                    renderProperty: (entity: GenericStatefulEntity<User>) => {
                        return (
                            <UserRender
                                entityProp="createdAt"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "updatedAt",
                    label: "Updated At",
                    sortable: true,
                    renderProperty: (entity: GenericStatefulEntity<User>) => {
                        return (
                            <UserRender
                                entityProp="updatedAt"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
            ]}
        />
    );
}
