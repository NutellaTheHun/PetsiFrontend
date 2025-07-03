import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { Role, User } from "../../entityTypes";

export type RoleRenderContext = {
    setRoleName: (roleName: string) => void;
};

export type RoleRenderProps = {
    entityProp: keyof Role;
    instance: Role;
    state: RenderState;
    context: RoleRenderContext;
};

const renderedId = (
    value: number,
    _entity: Role,
    _state: RenderState,
    _context: RoleRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedRoleName = (
    value: string,
    _entity: Role,
    state: RenderState,
    context: RoleRenderContext
) => {
    if (state === "edited") {
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

const renderedUsers = (
    value: User[],
    _entity: Role,
    _state: RenderState,
    _context: RoleRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} users`} />;
};

const renderers: PropertyRendererRecord<Role> = {
    id: renderedId,
    roleName: renderedRoleName,
    users: renderedUsers,
};

export function RoleRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: RoleRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={renderers}
        />
    );
}
