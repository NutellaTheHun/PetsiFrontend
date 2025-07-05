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
    toUpdateDto: (entity: MenuItemSize): UpdateMenuItemSizeDto => ({
        sizeName: entity.name,
    }),
};

// Context factory functions
const createMenuItemSizeEditContext = (
    setEditInstance: (instance: MenuItemSize | null) => void,
    editInstance: MenuItemSize | null
): MenuItemSizeEditContext => ({
    setSizeName: (name: string) => {
        setEditInstance(editInstance ? { ...editInstance, name } : null);
    },
});

const createMenuItemSizeCreateContext = (
    setCreateInstance: (instance: Partial<MenuItemSize> | null) => void,
    createInstance: Partial<MenuItemSize> | null
): MenuItemSizeCreateContext => ({
    setSizeName: (name: string) => {
        setCreateInstance({ ...createInstance, name });
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
