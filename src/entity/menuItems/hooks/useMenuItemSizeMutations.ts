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

// Context factory functions
const createMenuItemSizeEditContext = (
    setEditValues: (values: Partial<UpdateMenuItemSizeDto> | null) => void
): MenuItemSizeEditContext => ({
    setSizeName: (sizeName: string) => {
        setEditValues({ sizeName });
    },
});

const createMenuItemSizeCreateContext = (
    setCreateValues: (values: Partial<CreateMenuItemSizeDto> | null) => void
): MenuItemSizeCreateContext => ({
    setSizeName: (sizeName: string) => {
        setCreateValues({ sizeName });
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
        createEditContext: createMenuItemSizeEditContext,
        createCreateContext: createMenuItemSizeCreateContext,
    });
}
