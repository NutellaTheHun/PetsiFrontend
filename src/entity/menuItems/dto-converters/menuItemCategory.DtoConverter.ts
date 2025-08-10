import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
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
    editEntity: Partial<MenuItemCategory> // TODO diff edit
): UpdateMenuItemCategoryDto {
    return {
        categoryName: entity.categoryName || "",
    };
}
