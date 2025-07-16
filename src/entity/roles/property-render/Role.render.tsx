import { Text, TextInput } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import type { Role, User } from "../../entityTypes";

export type RoleRenderContext = {
    setRoleName: (roleName: string) => void;
};

export interface RoleDataContext extends EntityDataContext<Role> {
    users?: User[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<Role>,
    _context: RoleRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedRoleName = (
    value: string,
    statefulInstance: GenericStatefulEntity<Role>,
    context: RoleRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setRoleName(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

// TODO: Implement this
const renderedUsers = (
    value: User[],
    _statefulInstance: GenericStatefulEntity<Role>,
    _context: RoleRenderContext,
    _dataContext?: RoleDataContext
) => {
    return <Text>{`${value?.length ?? 0} users`}</Text>;
};

const renderers: PropertyRendererRecord<Role> = {
    id: renderedId,
    roleName: renderedRoleName,
    users: renderedUsers,
};

export type RoleRenderProps = {
    entityProp: keyof Role;
    statefulInstance: GenericStatefulEntity<Role>;
    context: RoleRenderContext;
    dataContext?: RoleDataContext;
};

export function RoleRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: RoleRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={renderers}
            dataContext={dataContext}
        />
    );
}
