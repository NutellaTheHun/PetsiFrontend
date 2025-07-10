import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateUserDto,
    Role,
    UpdateUserDto,
    User,
} from "../../entityTypes";
import type { UserRenderContext } from "../property-render/User.render";

export type UserEditContext = Pick<
    UserRenderContext,
    "setUsername" | "setEmail" | "setRoles" | "setPassword"
>;

export type UserCreateContext = Pick<
    UserRenderContext,
    "setUsername" | "setEmail" | "setRoles" | "setPassword"
>;

// DTO converter for User
const userDtoConverter = {
    toCreateDto: (
        entity: Partial<User> & { password?: string }
    ): CreateUserDto => ({
        username: entity.username || "",
        email: entity.email || "",
        password: entity.password || "",
        roleIds: entity.roles?.map((role) => role.id.toString()) || [],
    }),
    toUpdateDto: (
        entity: Partial<User> & { password?: string }
    ): UpdateUserDto => ({
        username: entity.username,
        email: entity.email ? {} : undefined,
        password: entity.password,
        roleIds: entity.roles?.map((role) => role.id.toString()),
    }),
};

// Context factory functions
const createUserEditContext = (
    editInstance: Partial<User> | null,
    setEditInstance: (instance: Partial<User> | null) => void
): UserEditContext => ({
    setUsername: (username: string) => {
        setEditInstance({ ...editInstance, username });
    },
    setEmail: (email: string) => {
        setEditInstance({ ...editInstance, email });
    },
    setPassword: (password: string) => {
        setEditInstance({ ...editInstance, password } as any);
    },
    setRoles: (roles: Role[]) => {
        setEditInstance({ ...editInstance, roles });
    },
});

const createUserCreateContext = (
    createInstance: Partial<User>,
    setCreateInstance: (instance: Partial<User>) => void
): UserCreateContext => ({
    setUsername: (username: string) => {
        setCreateInstance({ ...createInstance, username });
    },
    setEmail: (email: string) => {
        setCreateInstance({ ...createInstance, email });
    },
    setPassword: (password: string) => {
        setCreateInstance({ ...createInstance, password } as any);
    },
    setRoles: (roles: Role[]) => {
        setCreateInstance({ ...createInstance, roles });
    },
});

// Entity-specific mutations hook
export function useUserMutations() {
    return useEntityMutations<
        User,
        CreateUserDto,
        UpdateUserDto,
        UserEditContext,
        UserCreateContext
    >({
        endpoint: "/users",
        dtoConverter: userDtoConverter,
        createEditContext: createUserEditContext,
        createCreateContext: createUserCreateContext,
    });
}
