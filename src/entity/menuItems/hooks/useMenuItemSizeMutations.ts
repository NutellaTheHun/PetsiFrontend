import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemSizeDto,
    MenuItemSize,
    UpdateMenuItemSizeDto,
} from "../../entityTypes";

export type MenuItemSizeEditContext = {
    setSizeName: (name: string) => void;
};

export type MenuItemSizeCreateContext = {
    setSizeName: (name: string) => void;
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
    editInstance: Partial<MenuItemSize> | null,
    setEditInstance: (instance: Partial<MenuItemSize> | null) => void
): MenuItemSizeEditContext => ({
    setSizeName: (name: string) => {
        setEditInstance({ ...editInstance, name });
    },
});

const createMenuItemSizeCreateContext = (
    createInstance: Partial<MenuItemSize>,
    setCreateInstance: (instance: Partial<MenuItemSize>) => void
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
