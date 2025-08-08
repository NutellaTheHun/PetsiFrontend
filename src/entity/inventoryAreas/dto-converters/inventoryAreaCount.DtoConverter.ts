import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryAreaCountDto,
    InventoryAreaCount,
    UpdateInventoryAreaCountDto,
} from "../../entityTypes";
import { ManyInventoryAreaItemToCreateDto } from "./inventoryAreaItem.DtoConverter";

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
        itemCountDtos: ManyInventoryAreaItemToCreateDto(entity.countedItems), // ManyInventoryAreaItemsToNestedDtos()
    };
}

function InventoryAreaCountToUpdateDto(
    entity: Partial<InventoryAreaCount>,
    editEntity: Partial<InventoryAreaCount> // TODO diff update
): UpdateInventoryAreaCountDto {
    return {
        inventoryAreaId: entity.inventoryArea?.id,
        itemCountDtos: [], // ManyInventoryAreaItemsToNestedDtos()
    };
}
