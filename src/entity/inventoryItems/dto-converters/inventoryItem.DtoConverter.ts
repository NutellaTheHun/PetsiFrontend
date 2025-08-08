import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemDto,
    InventoryItem,
    UpdateInventoryItemDto,
} from "../../entityTypes";

export const InventoryItemDtoConverter: DtoConverter<
    InventoryItem,
    CreateInventoryItemDto,
    UpdateInventoryItemDto
> = {
    toCreateDto: InventoryItemToCreateDto,
    toUpdateDto: InventoryItemToUpdateDto,
};

function InventoryItemToCreateDto(
    entity: Partial<InventoryItem>
): CreateInventoryItemDto {
    return {
        itemName: entity.itemName || "",
        inventoryItemCategoryId: entity?.category?.id || 0,
        vendorId: entity?.vendor?.id || 0,
        // itemSizeDtos: , manyInventoryItemSizeNestedDto()
    };
}

function InventoryItemToUpdateDto(
    entity: Partial<InventoryItem>,
    editEntity: Partial<InventoryItem> // TODO diff edit
): UpdateInventoryItemDto {
    return {
        itemName: entity.itemName || "",
        inventoryItemCategoryId: entity?.category?.id || 0,
        vendorId: entity?.vendor?.id || 0,
        // itemSizeDtos: , manyInventoryItemSizeNestedDto()
    };
}
