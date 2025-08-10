import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import type { CreateRoleDto, Role, UpdateRoleDto } from "../../entityTypes";

export const roleDtoConverter = createDtoConverter<
    Role,
    CreateRoleDto,
    UpdateRoleDto
>(RoleToCreateDto, RoleToUpdateDto);

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
