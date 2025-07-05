import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateMenuItemSizeDto,
    MenuItemSize,
    UpdateMenuItemSizeDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type MenuItemSizeEditContext = {
    setSizeName: (sizeName: string) => void;
};

export type MenuItemSizeCreateContext = {
    setSizeName: (sizeName: string) => void;
};

// DTO converter for MenuItemSize
const menuItemSizeDtoConverter = {
    toCreateDto: (entity: Partial<MenuItemSize>): CreateMenuItemSizeDto => ({
        sizeName: entity.name || "",
    }),
    toUpdateDto: (entity: Partial<MenuItemSize>): UpdateMenuItemSizeDto => ({
        sizeName: entity.name || "",
    }),
};

// Context factory functions
const createMenuItemSizeEditContext = (
    setEditDto: (dto: Partial<UpdateMenuItemSizeDto> | null) => void,
    setEditInstance: (instance: Partial<MenuItemSize> | null) => void,
    editDto: Partial<UpdateMenuItemSizeDto> | null,
    editInstance: Partial<MenuItemSize> | null
): MenuItemSizeEditContext => ({
    setSizeName: (name: string) => {
        setEditInstance({ ...editInstance, name });
        setEditDto({ ...editDto, sizeName: name });
    },
});

const createMenuItemSizeCreateContext = (
    setCreateDto: (dto: Partial<CreateMenuItemSizeDto> | null) => void,
    setCreateInstance: (instance: Partial<MenuItemSize> | null) => void,
    createDto: Partial<CreateMenuItemSizeDto> | null,
    createInstance: Partial<MenuItemSize> | null
): MenuItemSizeCreateContext => ({
    setSizeName: (name: string) => {
        setCreateInstance({ ...createInstance, name });
        setCreateDto({ ...createDto, sizeName: name });
    },
});

// Entity-specific mutations hook
export function useMenuItemSizeMutations() {
    return useEntityMutations<
        MenuItemSize,
        CreateMenuItemSizeDto,
        UpdateMenuItemSizeDto,
        MenuItemSizeEditContext,
        MenuItemSizeCreateContext
    >({
        endpoint: "/menu-item-sizes",
        dtoConverter: menuItemSizeDtoConverter,
        createEditContext: createMenuItemSizeEditContext,
        createCreateContext: createMenuItemSizeCreateContext,
    });
}
