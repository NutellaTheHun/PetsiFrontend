import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateInventoryAreaDto,
    InventoryArea,
    UpdateInventoryAreaDto,
} from "../../entityTypes";

export const inventoryAreaDtoConverter = createDtoConverter<
    InventoryArea,
    CreateInventoryAreaDto,
    UpdateInventoryAreaDto
>(InventoryAreaToCreateDto, InventoryAreaToUpdateDto);

function InventoryAreaToCreateDto(
    entity: Partial<InventoryArea>
): CreateInventoryAreaDto {
    return {
        areaName: entity.areaName || "",
    };
}

function InventoryAreaToUpdateDto(
    entity: Partial<InventoryArea>,
    editEntity: Partial<InventoryArea>
): UpdateInventoryAreaDto {
    return {
        areaName: diffCheck(entity.areaName, editEntity.areaName),
    };
}
