import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryAreaCountDto,
    InventoryAreaCount,
    UpdateInventoryAreaCountDto,
} from "../../entityTypes";
import {
    ManyInventoryAreaItemToCreateDto,
    ManyInventoryAreaItemToNestedDto,
} from "./inventoryAreaItem.DtoConverter";

export const InventoryAreaCountDtoConverter: DtoConverter<
    InventoryAreaCount,
    CreateInventoryAreaCountDto,
    UpdateInventoryAreaCountDto
> = {
    toCreateDto: InventoryAreaCountToCreateDto,
    toUpdateDto: InventoryAreaCountToUpdateDto,
};

function InventoryAreaCountToCreateDto(
    entity: Partial<InventoryAreaCount>
): CreateInventoryAreaCountDto {
    return {
        inventoryAreaId: entity?.inventoryArea?.id || 0,
        itemCountDtos: ManyInventoryAreaItemToCreateDto(
            entity?.countedItems || []
        ),
    };
}

function InventoryAreaCountToUpdateDto(
    entity: Partial<InventoryAreaCount>,
    editEntity: Partial<InventoryAreaCount> // TODO diff update
): UpdateInventoryAreaCountDto {
    let itemCountDtos = null;
    if (entity.countedItems && editEntity.countedItems) {
        itemCountDtos = ManyInventoryAreaItemToNestedDto(
            entity?.countedItems || [],
            editEntity?.countedItems || []
        );
    }
    return {
        inventoryAreaId: entity.inventoryArea?.id,
        itemCountDtos:
            itemCountDtos && itemCountDtos.length > 0
                ? itemCountDtos
                : undefined,
    };
}
