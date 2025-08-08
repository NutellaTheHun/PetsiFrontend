import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemSizeDto,
    InventoryItemSize,
    UpdateInventoryItemSizeDto,
} from "../../entityTypes";

export const InventoryItemSizeDtoConverter: DtoConverter<
    InventoryItemSize,
    CreateInventoryItemSizeDto,
    UpdateInventoryItemSizeDto
> = {
    toCreateDto: InventoryItemSizeToCreateDto,
    toUpdateDto: InventoryItemSizeToUpdateDto,
};

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
    editEntity: Partial<InventoryItemSize> // TODO diff edit
): UpdateInventoryItemSizeDto {
    return {
        measureUnitId: entity.measureUnit?.id || 0,
        measureAmount: entity.measureAmount || 0,
        inventoryPackageId: entity.packageType?.id || 0,
        cost: Number(entity?.cost) || 0,
    };
}
