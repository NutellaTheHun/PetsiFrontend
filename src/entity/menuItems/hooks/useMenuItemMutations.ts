import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
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
    editInstance: Partial<MenuItem> | null,
    setEditInstance: (instance: Partial<MenuItem> | null) => void
): MenuItemEditContext => ({
    setItemName: (itemName: string) => {
        setEditInstance({ ...editInstance, itemName });
    },
    setCategory: (category: MenuItemCategory) => {
        setEditInstance({ ...editInstance, category });
    },
    setVeganOptionMenu: (veganOption: MenuItem) => {
        setEditInstance({ ...editInstance, veganOption });
    },
    setTakeNBakeOption: (takeNBakeOption: MenuItem) => {
        setEditInstance({ ...editInstance, takeNBakeOption });
    },
    setVeganTakeNBakeOption: (veganTakeNBakeOption: MenuItem) => {
        setEditInstance({ ...editInstance, veganTakeNBakeOption });
    },
    setValidSizes: (validSizes: MenuItemSize[]) => {
        setEditInstance({ ...editInstance, validSizes });
    },
    setIsPOTM: (isPOTM: boolean) => {
        setEditInstance({ ...editInstance, isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setEditInstance({ ...editInstance, isParbake });
    },
    setDefinedContainerItems: (definedContainerItems: any[]) => {
        setEditInstance({ ...editInstance, definedContainerItems });
    },
    setContainerOptions: (containerOptions: MenuItemContainerOptions) => {
        setEditInstance({ ...editInstance, containerOptions });
    },
});

const createMenuItemCreateContext = (
    createInstance: Partial<MenuItem>,
    setCreateInstance: (instance: Partial<MenuItem>) => void
): MenuItemCreateContext => ({
    setItemName: (itemName: string) => {
        setCreateInstance({ ...createInstance, itemName });
    },
    setCategory: (category: MenuItemCategory) => {
        setCreateInstance({ ...createInstance, category });
    },
    setVeganOptionMenu: (veganOption: MenuItem) => {
        setCreateInstance({ ...createInstance, veganOption });
    },
    setTakeNBakeOption: (takeNBakeOption: MenuItem) => {
        setCreateInstance({ ...createInstance, takeNBakeOption });
    },
    setVeganTakeNBakeOption: (veganTakeNBakeOption: MenuItem) => {
        setCreateInstance({ ...createInstance, veganTakeNBakeOption });
    },
    setValidSizes: (validSizes: MenuItemSize[]) => {
        setCreateInstance({ ...createInstance, validSizes });
    },
    setIsPOTM: (isPOTM: boolean) => {
        setCreateInstance({ ...createInstance, isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setCreateInstance({ ...createInstance, isParbake });
    },
    setDefinedContainerItems: (
        definedContainerItems: MenuItemContainerItem[]
    ) => {
        setCreateInstance({ ...createInstance, definedContainerItems });
    },
    setContainerOptions: (containerOptions: MenuItemContainerOptions) => {
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
