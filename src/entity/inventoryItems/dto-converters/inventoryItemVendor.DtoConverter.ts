import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemVendorDto,
    InventoryItemVendor,
    UpdateInventoryItemVendorDto,
} from "../../entityTypes";

export const InventoryItemVendorDtoConverter: DtoConverter<
    InventoryItemVendor,
    CreateInventoryItemVendorDto,
    UpdateInventoryItemVendorDto
> = {
    toCreateDto: InventoryItemVendorToCreateDto,
    toUpdateDto: InventoryItemVendorToUpdateDto,
};

function InventoryItemVendorToCreateDto(
    entity: Partial<InventoryItemVendor>
): CreateInventoryItemVendorDto {
    return {
        vendorName: entity.vendorName || "",
    };
}

function InventoryItemVendorToUpdateDto(
    entity: Partial<InventoryItemVendor>,
    editEntity: Partial<InventoryItemVendor> // TODO diff edit
): UpdateInventoryItemVendorDto {
    return {
        vendorName: entity.vendorName || "",
    };
}
