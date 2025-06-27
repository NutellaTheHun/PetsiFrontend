import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { Role, User } from "../../entityTypes";

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
    value: string | null,
    _entity: User,
    state: RenderState,
    context: UserRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                type="email"
                value={value ?? ""}
                onChange={(e) => context.setEmail(e)}
            />
        );
    }
    return <GenericValueDisplay value={value ?? "No email"} />;
};

const renderedCreatedAt = (
    value: string,
    _entity: User,
    _state: RenderState,
    _context: UserRenderContext
) => {
    return <GenericValueDisplay type="date" value={value} />;
};

const renderedUpdatedAt = (
    value: string,
    _entity: User,
    _state: RenderState,
    _context: UserRenderContext
) => {
    return <GenericValueDisplay type="date" value={value} />;
};

const renderedRoles = (
    value: Role[],
    _entity: User,
    _state: RenderState,
    _context: UserRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} roles`} />;
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
