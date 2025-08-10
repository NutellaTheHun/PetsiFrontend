import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckArray,
} from "../../../lib/dtoConverters/updatePropertyDiff";
import type { CreateUserDto, UpdateUserDto, User } from "../../entityTypes";

export const userDtoConverter = createDtoConverter<
    User,
    CreateUserDto,
    UpdateUserDto
>(UserToCreateDto, UserToUpdateDto);

function UserToCreateDto(entity: Partial<User>): CreateUserDto {
    return {
        username: entity.username || "",
        email: entity.email || "",
        password: entity.password || "",
        roleIds: entity.roles?.map((role) => role.id),
    };
}

function UserToUpdateDto(
    entity: Partial<User>,
    editEntity: Partial<User>
): UpdateUserDto {
    return {
        username: diffCheck(entity.username, editEntity.username),
        email: diffCheck(entity.email, editEntity.email),
        password: diffCheck(entity.password, editEntity.password), // TODO figure this out
        roleIds: diffCheckArray(
            entity.roles?.map((role) => role.id) || [],
            editEntity.roles?.map((role) => role.id) || []
        ),
    };
}
