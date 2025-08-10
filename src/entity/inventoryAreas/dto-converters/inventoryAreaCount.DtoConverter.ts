import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckDtos,
} from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateInventoryAreaCountDto,
    InventoryAreaCount,
    UpdateInventoryAreaCountDto,
} from "../../entityTypes";
import { inventoryAreaItemDtoConverter } from "./inventoryAreaItem.DtoConverter";

export const inventoryAreaCountDtoConverter = createDtoConverter<
    InventoryAreaCount,
    CreateInventoryAreaCountDto,
    UpdateInventoryAreaCountDto
>(InventoryAreaCountToCreateDto, InventoryAreaCountToUpdateDto);

function InventoryAreaCountToCreateDto(
    entity: Partial<InventoryAreaCount>
): CreateInventoryAreaCountDto {
    return {
        inventoryAreaId: entity?.inventoryArea?.id || 0,
        itemCountDtos: inventoryAreaItemDtoConverter.toCreateMany(
            entity?.countedItems || []
        ),
    };
}

function InventoryAreaCountToUpdateDto(
    entity: Partial<InventoryAreaCount>,
    editEntity: Partial<InventoryAreaCount>
): UpdateInventoryAreaCountDto {
    let itemCountDtos = null;
    if (entity.countedItems && editEntity.countedItems) {
        itemCountDtos = inventoryAreaItemDtoConverter.toNestedMany(
            entity?.countedItems || [],
            editEntity?.countedItems || []
        );
    }

    return {
        inventoryAreaId: diffCheck(
            entity.inventoryArea?.id,
            editEntity.inventoryArea?.id
        ),

        itemCountDtos: diffCheckDtos(itemCountDtos),
    };
}
