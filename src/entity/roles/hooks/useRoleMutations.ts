import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type { CreateRoleDto, Role, UpdateRoleDto } from "../../entityTypes";
import type { RoleRenderContext } from "../property-render/Role.render";

export type RoleEditContext = Pick<RoleRenderContext, "setRoleName">;

export type RoleCreateContext = Pick<RoleRenderContext, "setRoleName">;

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
