import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateInventoryItemPackageDto,
    InventoryItemPackage,
    UpdateInventoryItemPackageDto,
} from "../../entityTypes";

export const inventoryItemPackageDtoConverter = createDtoConverter<
    InventoryItemPackage,
    CreateInventoryItemPackageDto,
    UpdateInventoryItemPackageDto
>(InventoryItemPackageToCreateDto, InventoryItemPackageToUpdateDto);

function InventoryItemPackageToCreateDto(
    entity: Partial<InventoryItemPackage>
): CreateInventoryItemPackageDto {
    return {
        packageName: entity?.packageName || "",
    };
}

function InventoryItemPackageToUpdateDto(
    entity: Partial<InventoryItemPackage>,
    editEntity: Partial<InventoryItemPackage> // TODO diff edit
): UpdateInventoryItemPackageDto {
    return {
        packageName: diffCheck(entity.packageName, editEntity.packageName),
    };
}
