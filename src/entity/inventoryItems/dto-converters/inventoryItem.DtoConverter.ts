import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckDtos,
} from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateInventoryItemDto,
    InventoryItem,
    UpdateInventoryItemDto,
} from "../../entityTypes";
import { inventoryItemSizeDtoConverter } from "./inventoryItemSize.DtoConverter";

export const inventoryItemDtoConverter = createDtoConverter<
    InventoryItem,
    CreateInventoryItemDto,
    UpdateInventoryItemDto
>(InventoryItemToCreateDto, InventoryItemToUpdateDto);

function InventoryItemToCreateDto(
    entity: Partial<InventoryItem>
): CreateInventoryItemDto {
    return {
        itemName: entity.itemName || "",
        inventoryItemCategoryId: entity?.category?.id || undefined,
        vendorId: entity?.vendor?.id || undefined,
        itemSizeDtos: inventoryItemSizeDtoConverter.toCreateMany(
            entity.itemSizes || []
        ),
    };
}

function InventoryItemToUpdateDto(
    entity: Partial<InventoryItem>,
    editEntity: Partial<InventoryItem>
): UpdateInventoryItemDto {
    let itemSizeDtos = null;
    itemSizeDtos = inventoryItemSizeDtoConverter.toNestedMany(
        entity.itemSizes || [],
        editEntity.itemSizes || []
    );

    return {
        itemName: diffCheck(entity.itemName, editEntity.itemName),

        inventoryItemCategoryId: diffCheck(
            entity.category?.id,
            editEntity.category?.id
        ),

        vendorId: diffCheck(entity.vendor?.id, editEntity.vendor?.id),

        itemSizeDtos: diffCheckDtos(itemSizeDtos),
    };
}
