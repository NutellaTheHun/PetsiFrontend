import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import {
    type CreateInventoryAreaItemDto,
    type InventoryAreaItem,
    type UpdateInventoryAreaItemDto,
} from "../../entityTypes";
import { inventoryItemSizeDtoConverter } from "../../inventoryItems/dto-converters/inventoryItemSize.DtoConverter";

export const inventoryAreaItemDtoConverter = createNestedDtoConverter<
    InventoryAreaItem,
    CreateInventoryAreaItemDto,
    UpdateInventoryAreaItemDto
>(InventoryAreaItemToCreateDto, InventoryAreaItemToUpdateDto);

function InventoryAreaItemToCreateDto(
    entity: Partial<InventoryAreaItem>
): CreateInventoryAreaItemDto {
    if (entity.countedItemSize) {
        return {
            parentInventoryCountId: entity.parentInventoryCount?.id || 0,
            countedInventoryItemId: entity.countedItem?.id || 0,
            countedAmount: entity.amount || 0,
            countedItemSizeId: entity.countedItemSize?.id || 0,
            countedItemSizeDto: inventoryItemSizeDtoConverter.toCreate(
                entity.countedItemSize
            ),
        };
    } else {
        throw new Error(); // TODO update this
    }
}

function InventoryAreaItemToUpdateDto(
    entity: Partial<InventoryAreaItem>,
    editEntity: Partial<InventoryAreaItem>
): UpdateInventoryAreaItemDto {
    let countedItemSize = null;
    if (entity.countedItemSize && editEntity.countedItemSize) {
        countedItemSize = inventoryItemSizeDtoConverter.toNested(
            entity.countedItemSize,
            editEntity.countedItemSize
        );
    }

    return {
        countedInventoryItemId: diffCheck(
            entity.countedItem?.id,
            editEntity.countedItem?.id
        ),

        countedAmount: diffCheck(entity.amount, editEntity.amount),

        countedItemSizeId: diffCheck(
            entity.countedItemSize?.id,
            editEntity.countedItemSize?.id
        ),

        countedItemSizeDto: countedItemSize ? countedItemSize : undefined,
    };
}
