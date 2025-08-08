import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemCategoryDto,
    MenuItemCategory,
    UpdateMenuItemCategoryDto,
} from "../../entityTypes";

export const MenuItemCategoryDtoConverter: DtoConverter<
    MenuItemCategory,
    CreateMenuItemCategoryDto,
    UpdateMenuItemCategoryDto
> = {
    toCreateDto: MenuItemCategoryToCreateDto,
    toUpdateDto: MenuItemCategoryToUpdateDto,
};

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
