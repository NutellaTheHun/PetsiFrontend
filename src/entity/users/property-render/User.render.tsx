import { Text, TextInput } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isCreateState,
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { MultiSelectCheckbox } from "../../../lib/uiComponents/input/MantineMultiSelectCheckbox";
import type { Role, User } from "../../entityTypes";

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
    return <Text>{value}</Text>;
};

const renderedUsername = (
    value: string,
    statefulInstance: GenericStatefulEntity<User>,
    context: UserRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setUsername(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedPassword = (
    value: string,
    statefulInstance: GenericStatefulEntity<User>,
    context: UserRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setPassword(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedEmail = (
    value: string | null,
    statefulInstance: GenericStatefulEntity<User>,
    context: UserRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value ?? ""}
                onChange={(e) => context.setEmail(e.target.value)}
            />
        );
    }
    return <Text>{value ?? "No email"}</Text>;
};

const renderedCreatedAt = (
    value: string,
    statefulInstance: GenericStatefulEntity<User>,
    _context: UserRenderContext
) => {
    if (isCreateState(statefulInstance)) {
        return <Text>{new Date().toISOString()}</Text>;
    }
    return <Text>{value}</Text>;
};

const renderedUpdatedAt = (
    value: string,
    statefulInstance: GenericStatefulEntity<User>,
    _context: UserRenderContext
) => {
    if (isCreateState(statefulInstance)) {
        return <Text>{new Date().toISOString()}</Text>;
    }
    return <Text>{value}</Text>;
};

const renderedRoles = (
    value: Role[],
    statefulInstance: GenericStatefulEntity<User>,
    context: UserRenderContext,
    dataContext?: UserDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MultiSelectCheckbox
                totalOptions={dataContext?.roles ?? []}
                selectedOptions={value ?? []}
                onCheckboxChange={(value) => context.setRoles(value)}
                labelKey="roleName"
            />
        );
    }
    return <Text>{`${value?.length || 0} roles`}</Text>;
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
