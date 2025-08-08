import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type { CreateRoleDto, Role, UpdateRoleDto } from "../../entityTypes";

export const RoleDtoConverter: DtoConverter<
    Role,
    CreateRoleDto,
    UpdateRoleDto
> = {
    toCreateDto: RoleToCreateDto,
    toUpdateDto: RoleToUpdateDto,
};

function RoleToCreateDto(entity: Partial<Role>): CreateRoleDto {
    return {
        roleName: entity.roleName || "",
    };
}

function RoleToUpdateDto(
    entity: Partial<Role>,
    editEntity: Partial<Role> // TODO diff edit
): UpdateRoleDto {
    return {
        roleName: entity.roleName || "",
    };
}
