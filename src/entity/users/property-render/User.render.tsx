import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";

type User = components["schemas"]["User"];

export type UserRenderContext = {
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setRoles: (roleIds: number[]) => void;
};

export type UserRenderProps = {
    entityProp: keyof User;
    instance: User;
    state: RenderState;
    context: UserRenderContext;
};

const renderedId = (
    value: number,
    _entity: User,
    _state: RenderState,
    _context: UserRenderContext
) => {
    return <span>{value}</span>;
};

const renderedUsername = (
    value: string,
    _entity: User,
    state: RenderState,
    context: UserRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                type="text"
                value={value}
                onChange={(e) => context.setUsername(e)}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedEmail = (
    value: Record<string, never> | undefined,
    _entity: User,
    state: RenderState,
    context: UserRenderContext
) => {
    if (state === "edited") {
        // Email type for generic input?
        return (
            <GenericInput
                type="text"
                value={typeof value === "string" ? value : ""}
                onChange={(e) => context.setEmail(e)}
            />
        );
    }
    return (
        <GenericValueDisplay
            value={typeof value === "string" ? value : "No email"}
        />
    );
};

const renderedCreatedAt = (
    value: string,
    _entity: User,
    _state: RenderState,
    _context: UserRenderContext
) => {
    return <GenericValueDisplay value={new Date(value).toLocaleDateString()} />;
};

const renderedUpdatedAt = (
    value: string,
    _entity: User,
    _state: RenderState,
    _context: UserRenderContext
) => {
    return <GenericValueDisplay value={new Date(value).toLocaleDateString()} />;
};

const renderedRoles = (
    value: User["roles"],
    _entity: User,
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

const renderers: PropertyRendererRecord<User> = {
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
