import type { components } from "../../../api-types";
import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    type CreateInventoryAreaItemDto,
    type InventoryAreaItem,
    type NestedInventoryAreaItemDto,
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
        throw new Error();
    }
}

function InventoryAreaItemToUpdateDto(
    entity: Partial<InventoryAreaItem>,
    editEntity: Partial<InventoryAreaItem> // TODO diff update
): UpdateInventoryAreaItemDto {
    let countedItemSize = null;
    if (entity.countedItemSize && editEntity.countedItemSize) {
        countedItemSize = inventoryItemSizeDtoConverter.toNested(
            entity.countedItemSize,
            editEntity.countedItemSize
        );
    }
    return {
        countedInventoryItemId: entity.countedItem?.id,
        countedAmount: entity.amount,
        countedItemSizeId: entity.countedItemSize?.id,
        countedItemSizeDto: countedItemSize ? countedItemSize : undefined,
    };
}

export function ManyInventoryAreaItemToNestedDto(
    originalEntities: Partial<InventoryAreaItem>[],
    editEntities: Partial<InventoryAreaItem>[]
): NestedInventoryAreaItemDto[] {
    const result: NestedInventoryAreaItemDto[] = [];

    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: InventoryAreaItemToCreateDto(editEntity),
            });
        } else {
            const originalEntity = originalEntities.find(
                (id) => id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: InventoryAreaItemToUpdateDto(
                        originalEntity,
                        editEntity
                    ),
                });
            } else {
                throw Error(
                    "id of edited instance not found in original array"
                );
            }
        }
    }
    return result;
}

export function ManyInventoryAreaItemToCreateDto(
    entities: Partial<InventoryAreaItem>[]
): components["schemas"]["CreateInventoryAreaItemDto"][] {
    const result: CreateInventoryAreaItemDto[] = [];
    for (const entity of entities) {
        result.push(InventoryAreaItemToCreateDto(entity));
    }
    return result;
}
