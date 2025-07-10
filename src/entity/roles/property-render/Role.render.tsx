import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isCreateState,
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
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
    return <GenericValueDisplay value={value} />;
};

const renderedRoleName = (
    value: string,
    statefulInstance: GenericStatefulEntity<Role>,
    context: RoleRenderContext
) => {
    if (isEditState(statefulInstance) || isCreateState(statefulInstance)) {
        return (
            <GenericInput
                type="text"
                value={value}
                onChange={(e) => context.setRoleName(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

// TODO: Implement this
const renderedUsers = (
    value: User[],
    _statefulInstance: GenericStatefulEntity<Role>,
    _context: RoleRenderContext,
    _dataContext?: RoleDataContext
) => {
    return <GenericValueDisplay value={`${value?.length ?? 0} users`} />;
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
