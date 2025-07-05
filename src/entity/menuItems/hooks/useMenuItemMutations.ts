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
    setEditInstance: (instance: MenuItem | null) => void,
    editDto: Partial<UpdateMenuItemDto> | null,
    editInstance: MenuItem | null
): MenuItemEditContext => ({
    setItemName: (itemName: string) => {
        setEditDto({ ...editDto, itemName });
        setEditInstance(editInstance ? { ...editInstance, itemName } : null);
    },
    setCategory: (category: MenuItemCategory) => {
        setEditDto({ ...editDto, categoryId: category.id });
        setEditInstance(editInstance ? { ...editInstance, category } : null);
    },
    setVeganOptionMenu: (veganOption: MenuItem) => {
        setEditDto({ ...editDto, veganOptionMenuId: veganOption.id });
        setEditInstance(editInstance ? { ...editInstance, veganOption } : null);
    },
    setTakeNBakeOption: (takeNBakeOption: MenuItem) => {
        setEditDto({ ...editDto, takeNBakeOptionMenuId: takeNBakeOption.id });
        setEditInstance(
            editInstance ? { ...editInstance, takeNBakeOption } : null
        );
    },
    setVeganTakeNBakeOption: (veganTakeNBakeOption: MenuItem) => {
        setEditDto({
            ...editDto,
            veganTakeNBakeOptionMenuId: veganTakeNBakeOption.id,
        });
        setEditInstance(
            editInstance ? { ...editInstance, veganTakeNBakeOption } : null
        );
    },
    setValidSizes: (validSizes: MenuItemSize[]) => {
        setEditDto({
            ...editDto,
            validSizeIds: validSizes.map((size) => size.id),
        });
        setEditInstance(editInstance ? { ...editInstance, validSizes } : null);
    },
    setIsPOTM: (isPOTM: boolean) => {
        setEditDto({ ...editDto, isPOTM });
        setEditInstance(editInstance ? { ...editInstance, isPOTM } : null);
    },
    setIsParbake: (isParbake: boolean) => {
        setEditDto({ ...editDto, isParbake });
        setEditInstance(editInstance ? { ...editInstance, isParbake } : null);
    },
    setDefinedContainerItems: (definedContainerItems: any[]) => {
        setEditDto({ ...editDto /*definedContainerItemDtos*/ }); // TODO: fix this, to dto function?
        setEditInstance(
            editInstance ? { ...editInstance, definedContainerItems } : null
        );
    },
    setContainerOptions: (containerOptions: MenuItemContainerOptions) => {
        setEditDto({ ...editDto /*containerOptions*/ }); // TODO: fix this, to dto function?
        setEditInstance(
            editInstance ? { ...editInstance, containerOptions } : null
        );
    },
});

const createMenuItemCreateContext = (
    setCreateDto: (dto: Partial<CreateMenuItemDto> | null) => void,
    setCreateInstance: (instance: Partial<MenuItem> | null) => void,
    createDto: Partial<CreateMenuItemDto> | null,
    createInstance: Partial<MenuItem> | null
): MenuItemCreateContext => ({
    setItemName: (itemName: string) => {
        setCreateDto({ ...createDto, itemName });
        setCreateInstance({ ...createInstance, itemName });
    },
    setCategory: (category: MenuItemCategory) => {
        setCreateDto({ ...createDto, categoryId: category.id });
        setCreateInstance({ ...createInstance, category });
    },
    setVeganOptionMenu: (veganOption: MenuItem) => {
        setCreateDto({ ...createDto, veganOptionMenuId: veganOption.id });
        setCreateInstance({ ...createInstance, veganOption });
    },
    setTakeNBakeOption: (takeNBakeOption: MenuItem) => {
        setCreateDto({
            ...createDto,
            takeNBakeOptionMenuId: takeNBakeOption.id,
        });
        setCreateInstance({ ...createInstance, takeNBakeOption });
    },
    setVeganTakeNBakeOption: (veganTakeNBakeOption: MenuItem) => {
        setCreateDto({
            ...createDto,
            veganTakeNBakeOptionMenuId: veganTakeNBakeOption.id,
        });
        setCreateInstance({ ...createInstance, veganTakeNBakeOption });
    },
    setValidSizes: (validSizes: MenuItemSize[]) => {
        setCreateDto({
            ...createDto,
            validSizeIds: validSizes.map((size) => size.id),
        });
        setCreateInstance({ ...createInstance, validSizes });
    },
    setIsPOTM: (isPOTM: boolean) => {
        setCreateDto({ ...createDto, isPOTM });
        setCreateInstance({ ...createInstance, isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setCreateDto({ ...createDto, isParbake });
        setCreateInstance({ ...createInstance, isParbake });
    },
    setDefinedContainerItems: (
        definedContainerItems: MenuItemContainerItem[]
    ) => {
        setCreateDto({ ...createDto /*definedContainerItemDtos*/ }); // TODO: fix this, to dto function?
        setCreateInstance({ ...createInstance, definedContainerItems });
    },
    setContainerOptions: (containerOptions: MenuItemContainerOptions) => {
        setCreateDto({ ...createDto /*containerOptions*/ }); // TODO: fix this, to dto function?
        setCreateInstance({ ...createInstance, containerOptions });
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
