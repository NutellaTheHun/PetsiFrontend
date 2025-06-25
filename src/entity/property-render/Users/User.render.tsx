import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import type { RenderState } from "../render-types";

type User = components["schemas"]["User"];

export type UserRenderContext = {
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setRoles: (roleIds: number[]) => void;
};

export type UserPropertyRenderer = (
    value: any,
    entity: User,
    state: RenderState,
    context: UserRenderContext
) => ReactNode;

export type UserRenderProps = {
    entityProp: keyof User;
    instance: User;
    state: RenderState;
    context: UserRenderContext;
};

const renderedId = (
    value: number,
    entity: User,
    state: RenderState,
    context: UserRenderContext
) => {
    return <span>{value}</span>;
};

const renderedUsername = (
    value: string,
    entity: User,
    state: RenderState,
    context: UserRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setUsername(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <span>{value}</span>;
};

const renderedEmail = (
    value: Record<string, never> | undefined,
    entity: User,
    state: RenderState,
    context: UserRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="email"
                value={typeof value === "string" ? value : ""}
                onChange={(e) => context.setEmail(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <span>{typeof value === "string" ? value : "No email"}</span>;
};

const renderedCreatedAt = (
    value: string,
    entity: User,
    state: RenderState,
    context: UserRenderContext
) => {
    return <span>{new Date(value).toLocaleDateString()}</span>;
};

const renderedUpdatedAt = (
    value: string,
    entity: User,
    state: RenderState,
    context: UserRenderContext
) => {
    return <span>{new Date(value).toLocaleDateString()}</span>;
};

const renderedRoles = (
    value: User["roles"],
    entity: User,
    state: RenderState,
    context: UserRenderContext
) => {
    // Placeholder for entity reference
    if (state === "edited") {
        return (
            <select
                multiple
                value={value?.map((role) => role.id.toString()) || []}
                onChange={(e) => {
                    const selectedOptions = Array.from(
                        e.target.selectedOptions,
                        (option) => Number(option.value)
                    );
                    context.setRoles(selectedOptions);
                }}
                className="border rounded px-2 py-1"
            >
                {/* TODO: Populate with actual roles */}
                <option value="1">Admin</option>
                <option value="2">Staff</option>
            </select>
        );
    }
    return (
        <span>
            {value?.map((role) => role.roleName).join(", ") || "No roles"}
        </span>
    );
};

const renderers: Record<keyof User, UserPropertyRenderer> = {
    id: renderedId,
    username: renderedUsername,
    email: renderedEmail,
    createdAt: renderedCreatedAt,
    updatedAt: renderedUpdatedAt,
    roles: renderedRoles,
};

export function UserRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: UserRenderProps) {
    const value = entityInstance[entityProp];
    const renderer = renderers[entityProp];

    if (!renderer) {
        return <span>Unknown property: {entityProp}</span>;
    }

    return renderer(value, entityInstance, state, context);
}
