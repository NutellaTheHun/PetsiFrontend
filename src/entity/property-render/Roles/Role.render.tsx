import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import type { RenderState } from "../render-types";

type Role = components["schemas"]["Role"];

export type RoleRenderContext = {
    setRoleName: (roleName: string) => void;
    setUsers: (userIds: number[]) => void;
};

export type RolePropertyRenderer = (
    value: any,
    entity: Role,
    state: RenderState,
    context: RoleRenderContext
) => ReactNode;

export type RoleRenderProps = {
    entityProp: keyof Role;
    instance: Role;
    state: RenderState;
    context: RoleRenderContext;
};

const renderedId = (
    value: number,
    entity: Role,
    state: RenderState,
    context: RoleRenderContext
) => {
    return <span>{value}</span>;
};

const renderedRoleName = (
    value: string,
    entity: Role,
    state: RenderState,
    context: RoleRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setRoleName(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <span>{value}</span>;
};

const renderedUsers = (
    value: Role["users"],
    entity: Role,
    state: RenderState,
    context: RoleRenderContext
) => {
    // Placeholder for entity reference
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
        <span>
            {value?.map((user) => user.username).join(", ") || "No users"}
        </span>
    );
};

const renderers: Record<keyof Role, RolePropertyRenderer> = {
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
    const value = entityInstance[entityProp];
    const renderer = renderers[entityProp];

    if (!renderer) {
        return <span>Unknown property: {entityProp}</span>;
    }

    return renderer(value, entityInstance, state, context);
}
