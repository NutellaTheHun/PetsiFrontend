import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemDto,
    InventoryItem,
    InventoryItemCategory,
    InventoryItemVendor,
    UpdateInventoryItemDto,
} from "../../entityTypes";
import type { InventoryItemRenderContext } from "../property-render/InventoryItem.render";

export type InventoryItemEditContext = Pick<
    InventoryItemRenderContext,
    "setItemName" | "setCategory" | "setVendor"
>;

export type InventoryItemCreateContext = Pick<
    InventoryItemRenderContext,
    "setItemName" | "setCategory" | "setVendor"
>;

// DTO converter for InventoryItem
const inventoryItemDtoConverter = {
    toCreateDto: (entity: Partial<InventoryItem>): CreateInventoryItemDto => ({
        itemName: entity.itemName || "",
        inventoryItemCategoryId: entity.category?.id || 0,
        vendorId: entity.vendor?.id || 0,
    }),
    toUpdateDto: (entity: Partial<InventoryItem>): UpdateInventoryItemDto => ({
        itemName: entity.itemName,
        inventoryItemCategoryId: entity.category?.id,
        vendorId: entity.vendor?.id,
    }),
};

// Context factory functions
const createInventoryItemEditContext = (
    editInstance: Partial<InventoryItem> | null,
    setEditInstance: (instance: Partial<InventoryItem> | null) => void
): InventoryItemEditContext => ({
    setItemName: (name: string) => {
        setEditInstance({ ...editInstance, itemName: name });
    },
    setCategory: (category: InventoryItemCategory | null) => {
        setEditInstance({ ...editInstance, category });
    },
    setVendor: (vendor: InventoryItemVendor | null) => {
        setEditInstance({ ...editInstance, vendor });
    },
});

const createInventoryItemCreateContext = (
    createInstance: Partial<InventoryItem>,
    setCreateInstance: (instance: Partial<InventoryItem>) => void
): InventoryItemCreateContext => ({
    setItemName: (name: string) => {
        setCreateInstance({ ...createInstance, itemName: name });
    },
    setCategory: (category: InventoryItemCategory | null) => {
        setCreateInstance({ ...createInstance, category });
    },
    setVendor: (vendor: InventoryItemVendor | null) => {
        setCreateInstance({ ...createInstance, vendor });
    },
});

// Entity-specific mutations hook
export function useInventoryItemMutations() {
    return useEntityMutations<
        InventoryItem,
        CreateInventoryItemDto,
        UpdateInventoryItemDto,
        InventoryItemEditContext,
        InventoryItemCreateContext
    >({
        endpoint: "/inventory-items",
        dtoConverter: inventoryItemDtoConverter,
        createEditContext: createInventoryItemEditContext,
        createCreateContext: createInventoryItemCreateContext,
    });
}
