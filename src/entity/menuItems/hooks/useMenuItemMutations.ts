import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemDto,
    MenuItem,
    MenuItemCategory,
    UpdateMenuItemDto,
} from "../../entityTypes";

export type MenuItemEditContext = {
    setItemName: (name: string) => void;
    setCategory: (category: MenuItemCategory) => void;
};

export type MenuItemCreateContext = {
    setItemName: (name: string) => void;
    setCategory: (category: MenuItemCategory) => void;
};

// DTO converter for MenuItem
const menuItemDtoConverter = {
    toCreateDto: (entity: Partial<MenuItem>): CreateMenuItemDto => ({
        itemName: entity.itemName || "",
        categoryId: entity.category?.id || 0,
        validSizeIds: entity.validSizes?.map((size) => size.id) || [],
        definedContainerItemDtos: entity.definedContainerItems?.map((item) => ({
            id: item.id,
            quantity: item.quantity,
        })),
        containerOptionDto: entity.containerOptions?.map((option) => ({
            id: option.id,
            optionName: option.optionName,
            optionDescription: option.optionDescription,
            optionPrice: option.optionPrice,
        })),
    }),
    toUpdateDto: (entity: Partial<MenuItem>): UpdateMenuItemDto => ({
        itemName: entity.itemName,
        categoryId: entity.category?.id,
        validSizeIds: entity.validSizes?.map((size) => size.id),
        definedContainerItemDtos: entity.definedContainerItems?.map((item) => ({
            id: item.id,
            quantity: item.quantity,
        })),
        containerOptionDto: {
            mode: "update",
            id: entity.containerOptions.id,
            containerRuleDtos: entity.containerOptions?.containerRules?.map(
                (rule) => ({
                    mode: "update",
                    id: rule.id,
                    validMenuItemId: rule.validItem.id,
                    validSizeIds: rule.validSizes.map((size) => size.id),
                })
            ),
            validQuantity: entity.containerOptions?.validQuantity,
        },
    }),
};

// Context factory functions
const createMenuItemEditContext = (
    editInstance: Partial<MenuItem> | null,
    setEditInstance: (instance: Partial<MenuItem> | null) => void
): MenuItemEditContext => ({
    setItemName: (name: string) => {
        setEditInstance({ ...editInstance, itemName: name });
    },
    setCategory: (category: MenuItemCategory) => {
        setEditInstance({ ...editInstance, category });
    },
});

const createMenuItemCreateContext = (
    createInstance: Partial<MenuItem>,
    setCreateInstance: (instance: Partial<MenuItem>) => void
): MenuItemCreateContext => ({
    setItemName: (name: string) => {
        setCreateInstance({ ...createInstance, itemName: name });
    },
    setCategory: (category: MenuItemCategory) => {
        setCreateInstance({ ...createInstance, category });
    },
});

// Entity-specific mutations hook
export function useMenuItemMutations() {
    return useEntityMutations<
        MenuItem,
        CreateMenuItemDto,
        UpdateMenuItemDto,
        MenuItemEditContext,
        MenuItemCreateContext
    >({
        endpoint: "/menu-items",
        dtoConverter: menuItemDtoConverter,
        createEditContext: createMenuItemEditContext,
        createCreateContext: createMenuItemCreateContext,
    });
}
