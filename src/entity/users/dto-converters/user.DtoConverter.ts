import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type { CreateUserDto, UpdateUserDto, User } from "../../entityTypes";

export const UserDtoConverter: DtoConverter<
    User,
    CreateUserDto,
    UpdateUserDto
> = {
    toCreateDto: UserToCreateDto,
    toUpdateDto: UserToUpdateDto,
};

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
    editEntity: Partial<User> // TODO diff edit
): UpdateUserDto {
    return {
        username: entity.username || "",
        email: entity.email || "",
        password: entity.password || "",
        roleIds: entity.roles?.map((role) => role.id),
    };
}
