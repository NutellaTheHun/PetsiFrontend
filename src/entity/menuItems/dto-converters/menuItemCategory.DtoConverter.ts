import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateMenuItemCategoryDto,
    MenuItemCategory,
    UpdateMenuItemCategoryDto,
} from "../../entityTypes";

export const menuItemCategoryDtoConverter = createDtoConverter<
    MenuItemCategory,
    CreateMenuItemCategoryDto,
    UpdateMenuItemCategoryDto
>(MenuItemCategoryToCreateDto, MenuItemCategoryToUpdateDto);

function MenuItemCategoryToCreateDto(
    entity: Partial<MenuItemCategory>
): CreateMenuItemCategoryDto {
    return {
        categoryName: entity.categoryName || "",
    };
}

function MenuItemCategoryToUpdateDto(
    entity: Partial<MenuItemCategory>,
    editEntity: Partial<MenuItemCategory>
): UpdateMenuItemCategoryDto {
    return {
        categoryName: diffCheck(entity.categoryName, editEntity.categoryName),
    };
}
