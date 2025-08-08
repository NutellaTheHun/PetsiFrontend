import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemCategoryDto,
    InventoryItemCategory,
    UpdateInventoryItemCategoryDto,
} from "../../entityTypes";

export const InventoryItemCategoryDtoConverter: DtoConverter<
    InventoryItemCategory,
    CreateInventoryItemCategoryDto,
    UpdateInventoryItemCategoryDto
> = {
    toCreateDto: InventoryItemCategoryToCreateDto,
    toUpdateDto: InventoryItemCategoryToUpdateDto,
};

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
