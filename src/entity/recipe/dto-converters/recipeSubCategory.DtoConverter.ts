import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import type {
    CreateRecipeSubCategoryDto,
    RecipeSubCategory,
    UpdateRecipeSubCategoryDto,
} from "../../entityTypes";

export const recipeSubCategoryDtoConverter = createNestedDtoConverter<
    RecipeSubCategory,
    CreateRecipeSubCategoryDto,
    UpdateRecipeSubCategoryDto
>(RecipeSubCategoryToCreateDto, RecipeSubCategoryToUpdateDto);

function RecipeSubCategoryToCreateDto(
    entity: Partial<RecipeSubCategory>
): CreateRecipeSubCategoryDto {
    return {
        subCategoryName: entity.subCategoryName || "",
        parentCategoryId: entity.parentCategory?.id || 0,
    };
}

function RecipeSubCategoryToUpdateDto(
    entity: Partial<RecipeSubCategory>,
    editEntity: Partial<RecipeSubCategory> // TODO diff edit
): UpdateRecipeSubCategoryDto {
    return {
        subCategoryName: entity.subCategoryName || "",
    };
}
