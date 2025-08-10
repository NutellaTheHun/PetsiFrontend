import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
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
    editEntity: Partial<InventoryArea> // TODO diff update
): UpdateInventoryAreaDto {
    return {
        areaName:
            editEntity.areaName !== entity.areaName
                ? editEntity.areaName
                : undefined,
    };
}
