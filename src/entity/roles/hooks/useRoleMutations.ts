import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type { CreateRoleDto, Role, UpdateRoleDto } from "../../entityTypes";

export type RoleEditContext = {
    setRoleName: (name: string) => void;
};

export type RoleCreateContext = {
    setRoleName: (name: string) => void;
};

// DTO converter for Role
const roleDtoConverter = {
    toCreateDto: (entity: Partial<Role>): CreateRoleDto => ({
        roleName: entity.roleName || "",
    }),
    toUpdateDto: (entity: Partial<Role>): UpdateRoleDto => ({
        roleName: entity.roleName || "",
    }),
};

// Context factory functions
const createRoleEditContext = (
    editInstance: Partial<Role> | null,
    setEditInstance: (instance: Partial<Role> | null) => void
): RoleEditContext => ({
    setRoleName: (name: string) => {
        setEditInstance({ ...editInstance, roleName: name });
    },
});

const createRoleCreateContext = (
    createInstance: Partial<Role>,
    setCreateInstance: (instance: Partial<Role>) => void
): RoleCreateContext => ({
    setRoleName: (name: string) => {
        setCreateInstance({ ...createInstance, roleName: name });
    },
});

// Entity-specific mutations hook
export function useRoleMutations() {
    return useEntityMutations<
        Role,
        CreateRoleDto,
        UpdateRoleDto,
        RoleEditContext,
        RoleCreateContext
    >({
        endpoint: "/roles",
        dtoConverter: roleDtoConverter,
        createEditContext: createRoleEditContext,
        createCreateContext: createRoleCreateContext,
    });
}
