import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemSizeDto,
    MenuItemSize,
    UpdateMenuItemSizeDto,
} from "../../entityTypes";
import type { MenuItemSizeRenderContext } from "../property-render/MenuItemSize.render";

export type MenuItemSizeEditContext = Pick<
    MenuItemSizeRenderContext,
    "setName"
>;

export type MenuItemSizeCreateContext = Pick<
    MenuItemSizeRenderContext,
    "setName"
>;

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
    setName: (name: string) => {
        setEditInstance({ ...editInstance, name });
    },
});

const createMenuItemSizeCreateContext = (
    createInstance: Partial<MenuItemSize>,
    setCreateInstance: (instance: Partial<MenuItemSize>) => void
): MenuItemSizeCreateContext => ({
    setName: (name: string) => {
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
