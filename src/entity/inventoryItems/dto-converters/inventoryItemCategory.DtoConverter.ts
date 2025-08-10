import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import type {
    CreateInventoryItemCategoryDto,
    InventoryItemCategory,
    UpdateInventoryItemCategoryDto,
} from "../../entityTypes";

export const inventoryItemCategoryDtoConverter = createDtoConverter<
    InventoryItemCategory,
    CreateInventoryItemCategoryDto,
    UpdateInventoryItemCategoryDto
>(InventoryItemCategoryToCreateDto, InventoryItemCategoryToUpdateDto);

function InventoryItemCategoryToCreateDto(
    entity: Partial<InventoryItemCategory>
): CreateInventoryItemCategoryDto {
    return {
        itemCategoryName: entity?.categoryName || "",
    };
}

function InventoryItemCategoryToUpdateDto(
    entity: Partial<InventoryItemCategory>,
    editEntity: Partial<InventoryItemCategory> // TODO diff edit
): UpdateInventoryItemCategoryDto {
    return {
        itemCategoryName: entity?.categoryName || "",
    };
}
