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
import { RoleDropdownCheckbox } from "../../roles/components/role/RoleDropdownCheckbox";

export type UserRenderContext = {
    setUsername: (username: string) => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setRoles: (roles: Role[]) => void;
};

export interface UserDataContext extends EntityDataContext<User> {
    roles?: Role[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<User>,
    _context: UserRenderContext
) => {
    return <span>{value}</span>;
};

const renderedUsername = (
    value: string,
    statefulInstance: GenericStatefulEntity<User>,
    context: UserRenderContext
) => {
    if (isEditState(statefulInstance) || isCreateState(statefulInstance)) {
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

const renderedPassword = (
    value: string,
    statefulInstance: GenericStatefulEntity<User>,
    context: UserRenderContext
) => {
    if (isEditState(statefulInstance) || isCreateState(statefulInstance)) {
        return (
            <GenericInput
                type="password"
                value={value}
                onChange={(e) => context.setPassword(e)}
            />
        );
    }
    return <GenericValueDisplay value={"No"} />;
};

const renderedEmail = (
    value: string | null,
    statefulInstance: GenericStatefulEntity<User>,
    context: UserRenderContext
) => {
    if (isEditState(statefulInstance) || isCreateState(statefulInstance)) {
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
    statefulInstance: GenericStatefulEntity<User>,
    _context: UserRenderContext
) => {
    if (isCreateState(statefulInstance)) {
        return (
            <GenericValueDisplay type="date" value={new Date().toISOString()} />
        );
    }
    return <GenericValueDisplay type="date" value={value} />;
};

const renderedUpdatedAt = (
    value: string,
    statefulInstance: GenericStatefulEntity<User>,
    _context: UserRenderContext
) => {
    if (isCreateState(statefulInstance)) {
        return (
            <GenericValueDisplay type="date" value={new Date().toISOString()} />
        );
    }
    return <GenericValueDisplay type="date" value={value} />;
};

const renderedRoles = (
    value: Role[],
    statefulInstance: GenericStatefulEntity<User>,
    context: UserRenderContext,
    dataContext?: UserDataContext
) => {
    if (isCreateState(statefulInstance) || isEditState(statefulInstance)) {
        return (
            <RoleDropdownCheckbox
                selectedRoles={value ?? []}
                onUpdateRoles={(roles) => context.setRoles(roles)}
                roles={dataContext?.roles ?? []}
            />
        );
    }
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

export type UserRenderProps = {
    entityProp: keyof User;
    statefulInstance: GenericStatefulEntity<User>;
    context: UserRenderContext;
    dataContext?: UserDataContext;
};

export function UserRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: UserRenderProps) {
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
