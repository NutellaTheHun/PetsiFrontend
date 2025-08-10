import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
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
    editEntity: Partial<InventoryItemCategory>
): UpdateInventoryItemCategoryDto {
    return {
        itemCategoryName: diffCheck(
            entity?.categoryName,
            editEntity.categoryName
        ),
    };
}
