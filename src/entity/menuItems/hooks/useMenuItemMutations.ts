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
    setEditValues: (values: Partial<UpdateMenuItemDto> | null) => void
): MenuItemEditContext => ({
    setItemName: (itemName: string) => {
        setEditValues({ itemName });
    },
    setCategoryId: (categoryId: number) => {
        setEditValues({ categoryId });
    },
    setVeganOptionMenuId: (veganOptionMenuId: number) => {
        setEditValues({ veganOptionMenuId });
    },
    setTakeNBakeOptionMenuId: (takeNBakeOptionMenuId: number) => {
        setEditValues({ takeNBakeOptionMenuId });
    },
    setVeganTakeNBakeOptionMenuId: (veganTakeNBakeOptionMenuId: number) => {
        setEditValues({ veganTakeNBakeOptionMenuId });
    },
    setValidSizeIds: (validSizeIds: number[]) => {
        setEditValues({ validSizeIds }); // TODO: fix this
    },
    setIsPOTM: (isPOTM: boolean) => {
        setEditValues({ isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setEditValues({ isParbake });
    },
    setDefinedContainerItemDtos: (definedContainerItemDtos: any[]) => {
        setEditValues({ definedContainerItemDtos });
    },
    setContainerOptionDto: (containerOptionDto: any) => {
        setEditValues({ containerOptionDto });
    },
});

const createMenuItemCreateContext = (
    setCreateValues: (values: Partial<CreateMenuItemDto> | null) => void
): MenuItemCreateContext => ({
    setItemName: (itemName: string) => {
        setCreateValues({ itemName });
    },
    setCategoryId: (categoryId: number) => {
        setCreateValues({ categoryId });
    },
    setVeganOptionMenuId: (veganOptionMenuId: number) => {
        setCreateValues({ veganOptionMenuId });
    },
    setTakeNBakeOptionMenuId: (takeNBakeOptionMenuId: number) => {
        setCreateValues({ takeNBakeOptionMenuId });
    },
    setVeganTakeNBakeOptionMenuId: (veganTakeNBakeOptionMenuId: number) => {
        setCreateValues({ veganTakeNBakeOptionMenuId });
    },
    setValidSizeIds: (validSizeIds: number[]) => {
        setCreateValues({ validSizeIds }); // TODO: fix this
    },
    setIsPOTM: (isPOTM: boolean) => {
        setCreateValues({ isPOTM });
    },
    setIsParbake: (isParbake: boolean) => {
        setCreateValues({ isParbake });
    },
    setDefinedContainerItemDtos: (definedContainerItemDtos: any[]) => {
        setCreateValues({ definedContainerItemDtos });
    },
    setContainerOptionDto: (containerOptionDto: any) => {
        setCreateValues({ containerOptionDto });
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
