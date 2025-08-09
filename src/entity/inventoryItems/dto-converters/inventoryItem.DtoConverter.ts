import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemDto,
    InventoryItem,
    UpdateInventoryItemDto,
} from "../../entityTypes";
import {
    ManyInventoryItemSizeToCreateDto,
    ManyInventoryItemSizeToNestedDto,
} from "./inventoryItemSize.DtoConverter";

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
        inventoryItemCategoryId: entity?.category?.id || undefined,
        vendorId: entity?.vendor?.id || undefined,
        itemSizeDtos: ManyInventoryItemSizeToCreateDto(entity.itemSizes || []),
    };
}

function InventoryItemToUpdateDto(
    entity: Partial<InventoryItem>,
    editEntity: Partial<InventoryItem> // TODO diff edit
): UpdateInventoryItemDto {
    let itemSizeDtos = null;
    itemSizeDtos = ManyInventoryItemSizeToNestedDto(
        entity.itemSizes || [],
        editEntity.itemSizes || []
    );
    return {
        itemName: entity.itemName || "",
        inventoryItemCategoryId: entity?.category?.id || undefined,
        vendorId: entity?.vendor?.id || undefined,
        itemSizeDtos:
            itemSizeDtos && itemSizeDtos.length > 0 ? itemSizeDtos : undefined,
    };
}
