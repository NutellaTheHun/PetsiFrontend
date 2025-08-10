import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateInventoryItemSizeDto,
    InventoryItemSize,
    UpdateInventoryItemSizeDto,
} from "../../entityTypes";

export const inventoryItemSizeDtoConverter = createNestedDtoConverter<
    InventoryItemSize,
    CreateInventoryItemSizeDto,
    UpdateInventoryItemSizeDto
>(InventoryItemSizeToCreateDto, InventoryItemSizeToUpdateDto);

function InventoryItemSizeToCreateDto(
    entity: Partial<InventoryItemSize>
): CreateInventoryItemSizeDto {
    return {
        inventoryItemId: entity.inventoryItem?.id || 0,
        measureUnitId: entity.measureUnit?.id || 0,
        measureAmount: entity.measureAmount || 0,
        inventoryPackageId: entity.packageType?.id || 0,
        cost: Number(entity?.cost) || 0,
    };
}

function InventoryItemSizeToUpdateDto(
    entity: Partial<InventoryItemSize>,
    editEntity: Partial<InventoryItemSize>
): UpdateInventoryItemSizeDto {
    return {
        measureUnitId: diffCheck(
            entity.measureUnit?.id,
            editEntity.measureUnit?.id
        ),

        measureAmount: diffCheck(
            entity.measureAmount,
            editEntity.measureAmount
        ),

        inventoryPackageId: diffCheck(
            entity.packageType?.id,
            editEntity.packageType?.id
        ),

        cost: diffCheck(Number(entity.cost), Number(editEntity.cost)),
    };
}
