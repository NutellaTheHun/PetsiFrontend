import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateMenuItemDto,
    MenuItem,
    MenuItemCategory,
    MenuItemContainerItem,
    MenuItemContainerOptions,
    MenuItemSize,
    UpdateMenuItemDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type MenuItemEditContext = {
    setItemName: (itemName: string) => void;
    setCategory: (category: MenuItemCategory) => void;
    setVeganOptionMenu: (veganOptionMenu: MenuItem) => void;
    setTakeNBakeOption: (takeNBakeOption: MenuItem) => void;
    setVeganTakeNBakeOption: (veganTakeNBakeOption: MenuItem) => void;
    setValidSizes: (validSizes: MenuItemSize[]) => void;
    setIsPOTM: (isPOTM: boolean) => void;
    setIsParbake: (isParbake: boolean) => void;
    setDefinedContainerItems: (
        definedContainerItems: MenuItemContainerItem[]
    ) => void;
    setContainerOptions: (containerOptions: MenuItemContainerOptions) => void;
};

export type MenuItemCreateContext = {
    setItemName: (itemName: string) => void;
    setCategory: (category: MenuItemCategory) => void;
    setVeganOptionMenu: (veganOptionMenu: MenuItem) => void;
    setTakeNBakeOption: (takeNBakeOption: MenuItem) => void;
    setVeganTakeNBakeOption: (veganTakeNBakeOption: MenuItem) => void;
    setValidSizes: (validSizes: MenuItemSize[]) => void;
    setIsPOTM: (isPOTM: boolean) => void;
    setIsParbake: (isParbake: boolean) => void;
    setDefinedContainerItems: (
        definedContainerItems: MenuItemContainerItem[]
    ) => void;
    setContainerOptions: (containerOptions: MenuItemContainerOptions) => void;
};

// Context factory functions
const createMenuItemEditContext = (
    setEditDto: (dto: Partial<UpdateMenuItemDto> | null) => void,
    setEditInstance: (instance: Partial<MenuItem> | null) => void,
    editDto: Partial<UpdateMenuItemDto> | null,
    editInstance: Partial<MenuItem> | null
): MenuItemEditContext => ({
    setItemName: (itemName: string) => {
        setEditInstance({ ...editInstance, itemName });
        setEditDto({ ...editDto, itemName });
    },
    setCategory: (category: MenuItemCategory) => {
        setEditInstance({ ...editInstance, category });
        setEditDto({ ...editDto, categoryId: category.id });
    },
    setVeganOptionMenu: (veganOption: MenuItem) => {
        setEditInstance({ ...editInstance, veganOption });
        setEditDto({ ...editDto, veganOptionMenuId: veganOption.id });
    },
    setTakeNBakeOption: (takeNBakeOption: MenuItem) => {
        setEditInstance({ ...editInstance, takeNBakeOption });
        setEditDto({ ...editDto, takeNBakeOptionMenuId: takeNBakeOption.id });
    },
    setVeganTakeNBakeOption: (veganTakeNBakeOption: MenuItem) => {
        setEditInstance({ ...editInstance, veganTakeNBakeOption });
        setEditDto({
            ...editDto,
            veganTakeNBakeOptionMenuId: veganTakeNBakeOption.id,
        });
    },
    setValidSizes: (validSizes: MenuItemSize[]) => {
        setEditInstance({ ...editInstance, validSizes });
        setEditDto({
            ...editDto,
            validSizeIds: validSizes.map((size) => size.id),
        });
    },
    setIsPOTM: (isPOTM: boolean) => {
        setEditInstance({ ...editInstance, isPOTM });
        setEditDto({ ...editDto, isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setEditInstance({ ...editInstance, isParbake });
        setEditDto({ ...editDto, isParbake });
    },
    setDefinedContainerItems: (definedContainerItems: any[]) => {
        setEditInstance({ ...editInstance, definedContainerItems });
        setEditDto({ ...editDto /*definedContainerItemDtos*/ }); // TODO: fix this, to dto function?
    },
    setContainerOptions: (containerOptions: MenuItemContainerOptions) => {
        setEditInstance({ ...editInstance, containerOptions });
        setEditDto({ ...editDto /*containerOptions*/ }); // TODO: fix this, to dto function?
    },
});

const createMenuItemCreateContext = (
    setCreateDto: (dto: Partial<CreateMenuItemDto> | null) => void,
    setCreateInstance: (instance: Partial<MenuItem> | null) => void,
    createDto: Partial<CreateMenuItemDto> | null,
    createInstance: Partial<MenuItem> | null
): MenuItemCreateContext => ({
    setItemName: (itemName: string) => {
        setCreateInstance({ ...createInstance, itemName });
        setCreateDto({ ...createDto, itemName });
    },
    setCategory: (category: MenuItemCategory) => {
        setCreateInstance({ ...createInstance, category });
        setCreateDto({ ...createDto, categoryId: category.id });
    },
    setVeganOptionMenu: (veganOption: MenuItem) => {
        setCreateInstance({ ...createInstance, veganOption });
        setCreateDto({ ...createDto, veganOptionMenuId: veganOption.id });
    },
    setTakeNBakeOption: (takeNBakeOption: MenuItem) => {
        setCreateInstance({ ...createInstance, takeNBakeOption });
        setCreateDto({
            ...createDto,
            takeNBakeOptionMenuId: takeNBakeOption.id,
        });
    },
    setVeganTakeNBakeOption: (veganTakeNBakeOption: MenuItem) => {
        setCreateInstance({ ...createInstance, veganTakeNBakeOption });
        setCreateDto({
            ...createDto,
            veganTakeNBakeOptionMenuId: veganTakeNBakeOption.id,
        });
    },
    setValidSizes: (validSizes: MenuItemSize[]) => {
        setCreateInstance({ ...createInstance, validSizes });
        setCreateDto({
            ...createDto,
            validSizeIds: validSizes.map((size) => size.id),
        });
    },
    setIsPOTM: (isPOTM: boolean) => {
        setCreateInstance({ ...createInstance, isPOTM });
        setCreateDto({ ...createDto, isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setCreateInstance({ ...createInstance, isParbake });
        setCreateDto({ ...createDto, isParbake });
    },
    setDefinedContainerItems: (
        definedContainerItems: MenuItemContainerItem[]
    ) => {
        setCreateInstance({ ...createInstance, definedContainerItems });
        setCreateDto({ ...createDto /*definedContainerItemDtos*/ }); // TODO: fix this, to dto function?
    },
    setContainerOptions: (containerOptions: MenuItemContainerOptions) => {
        setCreateInstance({ ...createInstance, containerOptions });
        setCreateDto({ ...createDto /*containerOptions*/ }); // TODO: fix this, to dto function?
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
        createEditContext: createMenuItemEditContext,
        createCreateContext: createMenuItemCreateContext,
    });
}
