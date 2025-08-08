import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryAreaDto,
    InventoryArea,
    UpdateInventoryAreaDto,
} from "../../entityTypes";

export const InventoryAreaDtoConverter: DtoConverter<
    InventoryArea,
    CreateInventoryAreaDto,
    UpdateInventoryAreaDto
> = {
    toCreateDto: InventoryAreaToCreateDto,
    toUpdateDto: InventoryAreaToUpdateDto,
};

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
        areaName: entity.areaName,
    };
}
