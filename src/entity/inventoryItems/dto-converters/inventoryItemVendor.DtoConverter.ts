import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import type {
    CreateInventoryItemVendorDto,
    InventoryItemVendor,
    UpdateInventoryItemVendorDto,
} from "../../entityTypes";

export const inventoryItemVendorDtoConverter = createDtoConverter<
    InventoryItemVendor,
    CreateInventoryItemVendorDto,
    UpdateInventoryItemVendorDto
>(InventoryItemVendorToCreateDto, InventoryItemVendorToUpdateDto);

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
