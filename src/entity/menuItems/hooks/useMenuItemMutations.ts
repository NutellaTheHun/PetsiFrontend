import { useEntityMutations } from "../../../lib/generics/UseEntityMutations";
import type {
    CreateMenuItemDto,
    MenuItem,
    UpdateMenuItemDto,
} from "../../entityTypes";

// Define separate context types for create and update
export type MenuItemEditContext = {
    setItemName: (itemName: string) => void;
    setCategoryId: (categoryId: number) => void;
    setVeganOptionMenuId: (veganOptionMenuId: number) => void;
    setTakeNBakeOptionMenuId: (takeNBakeOptionMenuId: number) => void;
    setVeganTakeNBakeOptionMenuId: (veganTakeNBakeOptionMenuId: number) => void;
    setValidSizeIds: (validSizeIds: number[]) => void;
    setIsPOTM: (isPOTM: boolean) => void;
    setIsParbake: (isParbake: boolean) => void;
    setDefinedContainerItemDtos: (definedContainerItemDtos: any[]) => void;
    setContainerOptionDto: (containerOptionDto: any) => void;
};

export type MenuItemCreateContext = {
    setItemName: (itemName: string) => void;
    setCategoryId: (categoryId: number) => void;
    setVeganOptionMenuId: (veganOptionMenuId: number) => void;
    setTakeNBakeOptionMenuId: (takeNBakeOptionMenuId: number) => void;
    setVeganTakeNBakeOptionMenuId: (veganTakeNBakeOptionMenuId: number) => void;
    setValidSizeIds: (validSizeIds: number[]) => void;
    setIsPOTM: (isPOTM: boolean) => void;
    setIsParbake: (isParbake: boolean) => void;
    setDefinedContainerItemDtos: (definedContainerItemDtos: any[]) => void;
    setContainerOptionDto: (containerOptionDto: any) => void;
};

// Context factory functions
const createMenuItemEditContext = (
    setEditValues: (values: Partial<UpdateMenuItemDto> | null) => void,
    setEditInstance: (instance: MenuItem | null) => void,
    editValues: Partial<UpdateMenuItemDto> | null,
    editInstance: MenuItem | null
): MenuItemEditContext => ({
    setItemName: (itemName: string) => {
        setEditValues({ ...editValues, itemName });
    },
    setCategoryId: (categoryId: number) => {
        setEditValues({ ...editValues, categoryId });
    },
    setVeganOptionMenuId: (veganOptionMenuId: number) => {
        setEditValues({ ...editValues, veganOptionMenuId });
    },
    setTakeNBakeOptionMenuId: (takeNBakeOptionMenuId: number) => {
        setEditValues({ ...editValues, takeNBakeOptionMenuId });
    },
    setVeganTakeNBakeOptionMenuId: (veganTakeNBakeOptionMenuId: number) => {
        setEditValues({ ...editValues, veganTakeNBakeOptionMenuId });
    },
    setValidSizeIds: (validSizeIds: number[]) => {
        setEditValues({ ...editValues, validSizeIds }); // TODO: fix this
    },
    setIsPOTM: (isPOTM: boolean) => {
        setEditValues({ ...editValues, isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setEditValues({ ...editValues, isParbake });
    },
    setDefinedContainerItemDtos: (definedContainerItemDtos: any[]) => {
        setEditValues({ ...editValues, definedContainerItemDtos });
    },
    setContainerOptionDto: (containerOptionDto: any) => {
        setEditValues({ ...editValues, containerOptionDto });
    },
});

const createMenuItemCreateContext = (
    setCreateValues: (values: Partial<CreateMenuItemDto> | null) => void,
    setCreateInstance: (instance: Partial<MenuItem> | null) => void,
    createValues: Partial<CreateMenuItemDto> | null,
    createInstance: Partial<MenuItem> | null
): MenuItemCreateContext => ({
    setItemName: (itemName: string) => {
        setCreateValues({ ...createValues, itemName });
        setCreateInstance({ ...createInstance, itemName });
    },
    setCategoryId: (categoryId: number) => {
        setCreateValues({ ...createValues, categoryId });
        // Note: The entity uses 'category' but DTO uses 'categoryId'
        // We don't set this on the instance since it's a DTO field
    },
    setVeganOptionMenuId: (veganOptionMenuId: number) => {
        setCreateValues({ ...createValues, veganOptionMenuId });
        // Note: The entity uses 'veganOptionMenu' but DTO uses 'veganOptionMenuId'
        // We don't set this on the instance since it's a DTO field
    },
    setTakeNBakeOptionMenuId: (takeNBakeOptionMenuId: number) => {
        setCreateValues({ ...createValues, takeNBakeOptionMenuId });
        // Note: The entity uses 'takeNBakeOptionMenu' but DTO uses 'takeNBakeOptionMenuId'
        // We don't set this on the instance since it's a DTO field
    },
    setVeganTakeNBakeOptionMenuId: (veganTakeNBakeOptionMenuId: number) => {
        setCreateValues({ ...createValues, veganTakeNBakeOptionMenuId });
        // Note: The entity uses 'veganTakeNBakeOptionMenu' but DTO uses 'veganTakeNBakeOptionMenuId'
        // We don't set this on the instance since it's a DTO field
    },
    setValidSizeIds: (validSizeIds: number[]) => {
        setCreateValues({ ...createValues, validSizeIds }); // TODO: fix this
        // Note: The entity uses 'validSizes' but DTO uses 'validSizeIds'
        // We don't set this on the instance since it's a DTO field
    },
    setIsPOTM: (isPOTM: boolean) => {
        setCreateValues({ ...createValues, isPOTM });
        setCreateInstance({ ...createInstance, isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setCreateValues({ ...createValues, isParbake });
        setCreateInstance({ ...createInstance, isParbake });
    },
    setDefinedContainerItemDtos: (definedContainerItemDtos: any[]) => {
        setCreateValues({ ...createValues, definedContainerItemDtos });
        // Note: The entity uses 'definedContainerItems' but DTO uses 'definedContainerItemDtos'
        // We don't set this on the instance since it's a DTO field
    },
    setContainerOptionDto: (containerOptionDto: any) => {
        setCreateValues({ ...createValues, containerOptionDto });
        // Note: The entity uses 'containerOption' but DTO uses 'containerOptionDto'
        // We don't set this on the instance since it's a DTO field
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
