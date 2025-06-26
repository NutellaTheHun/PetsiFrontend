import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValue } from "../../../lib/generics/propertyRenderers/GenericValue";

type Role = components["schemas"]["Role"];

export type RoleRenderContext = {
    setRoleName: (roleName: string) => void;
    setUsers: (userIds: number[]) => void;
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
    return <GenericValue value={value} />;
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
    return <GenericValue value={value} />;
};

const renderedUsers = (
    value: Role["users"],
    _entity: Role,
    state: RenderState,
    context: RoleRenderContext
) => {
    // TODO implement, user search dropdown? handle list?
    if (state === "edited") {
        return (
            <select
                multiple
                value={value?.map((user) => user.id.toString()) || []}
                onChange={(e) => {
                    const selectedOptions = Array.from(
                        e.target.selectedOptions,
                        (option) => Number(option.value)
                    );
                    context.setUsers(selectedOptions);
                }}
                className="border rounded px-2 py-1"
            >
                {/* TODO: Populate with actual users */}
                <option value="1">User 1</option>
                <option value="2">User 2</option>
            </select>
        );
    }
    return (
        <GenericValue
            value={value?.map((user) => user.username).join(", ") || "No users"}
        />
    );
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
