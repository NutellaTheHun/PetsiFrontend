import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemDto,
    MenuItem,
    MenuItemCategory,
    MenuItemSize,
    UpdateMenuItemDto,
} from "../../entityTypes";
import type { MenuItemRenderContext } from "../property-render/MenuItem.render";

// should derive from render context pick<>
/*export type MenuItemEditContext = {
    setItemName: (name: string) => void;
    setCategory: (category: MenuItemCategory | null) => void;
    setVeganOption: (id: number | null) => void;
    setTakeNBakeOption: (id: number | null) => void;
    setVeganTakeNBakeOption: (id: number | null) => void;
    setValidSizes: (sizeIds: number[]) => void;
    setIsPOTM: (isPOTM: boolean) => void;
    setIsParbake: (isParbake: boolean) => void;
};

// should derive from render context pick<>
export type MenuItemCreateContext = {
    setItemName: (name: string) => void;
    setCategory: (category: MenuItemCategory) => void;
    setVeganOption: (id: number | null) => void;
    setTakeNBakeOption: (id: number | null) => void;
    setVeganTakeNBakeOption: (id: number | null) => void;
    setValidSizes: (sizeIds: number[]) => void;
    setIsPOTM: (isPOTM: boolean) => void;
    setIsParbake: (isParbake: boolean) => void;
};*/
export type MenuItemEditContext = Pick<
    MenuItemRenderContext,
    | "setItemName"
    | "setCategory"
    | "setVeganOption"
    | "setTakeNBakeOption"
    | "setVeganTakeNBakeOption"
    | "setValidSizes"
    | "setIsPOTM"
    | "setIsParbake"
>;

export type MenuItemCreateContext = Pick<
    MenuItemRenderContext,
    | "setItemName"
    | "setCategory"
    | "setVeganOption"
    | "setTakeNBakeOption"
    | "setVeganTakeNBakeOption"
    | "setValidSizes"
    | "setIsPOTM"
    | "setIsParbake"
>;

// DTO converter for MenuItem
const menuItemDtoConverter = {
    toCreateDto: (entity: Partial<MenuItem>): CreateMenuItemDto => ({
        itemName: entity.itemName || "",
        categoryId: entity.category?.id || 0,
        veganOptionMenuId: entity.veganOption?.id ?? undefined,
        takeNBakeOptionMenuId: entity.takeNBakeOption?.id ?? undefined,
        veganTakeNBakeOptionMenuId:
            entity.veganTakeNBakeOption?.id ?? undefined,
        validSizeIds: entity.validSizes?.map((size) => size.id) || [],
        isPOTM: entity.isPOTM ?? false,
        isParbake: entity.isParbake ?? false,
        definedContainerItemDtos: Array.isArray(entity.definedContainerItems)
            ? entity.definedContainerItems.map((item) => ({
                  parentContainerId: undefined,
                  parentContainerSizeId: item.parentContainerSize?.id ?? 0,
                  containedMenuItemId: item.containedItem?.id ?? 0,
                  containedMenuItemSizeId: item.containedItemSize.id ?? 0,
                  quantity: item.quantity,
              }))
            : undefined,
        containerOptionDto: entity.containerOptions
            ? {
                  parentContainerMenuItemId: undefined,
                  containerRuleDtos:
                      entity.containerOptions.containerRules?.map((rule) => ({
                          parentContainerOptionsId: undefined,
                          validMenuItemId: rule.validItem.id,
                          validSizeIds: rule.validSizes.map((size) => size.id),
                      })),
                  validQuantity: entity.containerOptions?.validQuantity ?? 0,
              }
            : undefined,
    }),
    toUpdateDto: (entity: Partial<MenuItem>): UpdateMenuItemDto => ({
        itemName: entity.itemName,
        categoryId: entity.category?.id,
        veganOptionMenuId: entity.veganOption?.id ?? undefined,
        takeNBakeOptionMenuId: entity.takeNBakeOption?.id ?? undefined,
        veganTakeNBakeOptionMenuId:
            entity.veganTakeNBakeOption?.id ?? undefined,
        isPOTM: entity.isPOTM ?? false,
        isParbake: entity.isParbake ?? false,
        validSizeIds: entity.validSizes?.map((size) => size.id),
        definedContainerItemDtos: entity.definedContainerItems?.map((item) => ({
            id: item.id,
            quantity: item.quantity,
        })),
        containerOptionDto: entity.containerOptions
            ? {
                  create: undefined,
                  update: {
                      id: entity.containerOptions?.id ?? 0,
                      dto: {
                          containerRuleDtos:
                              entity.containerOptions?.containerRules?.map(
                                  (rule) => ({
                                      create: undefined,
                                      update: {
                                          id: rule.id,
                                          dto: {
                                              validMenuItemId:
                                                  rule.validItem.id,
                                              validSizeIds: rule.validSizes.map(
                                                  (size) => size.id
                                              ),
                                          },
                                      },
                                  })
                              ),
                      },
                  },
              }
            : undefined,
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
    setCategory: (category: MenuItemCategory | null) => {
        setEditInstance({ ...editInstance, category });
    },
    setVeganOption: (veganOption: MenuItem | null) => {
        setEditInstance({
            ...editInstance,
            veganOption: veganOption,
        });
    },
    setTakeNBakeOption: (takeNBakeOption: MenuItem | null) => {
        setEditInstance({
            ...editInstance,
            takeNBakeOption: takeNBakeOption,
        });
    },
    setVeganTakeNBakeOption: (veganTakeNBakeOption: MenuItem | null) => {
        setEditInstance({
            ...editInstance,
            veganTakeNBakeOption: veganTakeNBakeOption,
        });
    },
    setValidSizes: (sizes: MenuItemSize[]) => {
        setEditInstance({
            ...editInstance,
            validSizes: sizes,
        });
    },
    setIsPOTM: (isPOTM: boolean) => {
        setEditInstance({ ...editInstance, isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setEditInstance({ ...editInstance, isParbake });
    },
});

const createMenuItemCreateContext = (
    createInstance: Partial<MenuItem>,
    setCreateInstance: (instance: Partial<MenuItem>) => void
): MenuItemCreateContext => ({
    setItemName: (name: string) => {
        setCreateInstance({ ...createInstance, itemName: name });
    },
    setCategory: (category: MenuItemCategory | null) => {
        setCreateInstance({ ...createInstance, category });
    },
    setVeganOption: (veganOption: MenuItem | null) => {
        setCreateInstance({
            ...createInstance,
            veganOption: veganOption,
        });
    },
    setTakeNBakeOption: (takeNBakeOption: MenuItem | null) => {
        setCreateInstance({
            ...createInstance,
            takeNBakeOption: takeNBakeOption,
        });
    },
    setVeganTakeNBakeOption: (veganTakeNBakeOption: MenuItem | null) => {
        setCreateInstance({
            ...createInstance,
            veganTakeNBakeOption: veganTakeNBakeOption,
        });
    },
    setValidSizes: (sizes: MenuItemSize[]) => {
        setCreateInstance({
            ...createInstance,
            validSizes: sizes,
        });
    },
    setIsPOTM: (isPOTM: boolean) => {
        setCreateInstance({ ...createInstance, isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setCreateInstance({ ...createInstance, isParbake });
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
