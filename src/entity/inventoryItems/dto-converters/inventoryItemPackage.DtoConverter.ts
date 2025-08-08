import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemPackageDto,
    InventoryItemPackage,
    UpdateInventoryItemPackageDto,
} from "../../entityTypes";

export const InventoryItemPackageDtoConverter: DtoConverter<
    InventoryItemPackage,
    CreateInventoryItemPackageDto,
    UpdateInventoryItemPackageDto
> = {
    toCreateDto: InventoryItemPackageToCreateDto,
    toUpdateDto: InventoryItemPackageToUpdateDto,
};

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
        packageName: entity?.packageName || "",
    };
}
