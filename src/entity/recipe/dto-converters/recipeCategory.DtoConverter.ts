import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import type {
    CreateRecipeCategoryDto,
    RecipeCategory,
    UpdateRecipeCategoryDto,
} from "../../entityTypes";
import { recipeSubCategoryDtoConverter } from "./recipeSubCategory.DtoConverter";

export const recipeCategoryDtoConverter = createDtoConverter<
    RecipeCategory,
    CreateRecipeCategoryDto,
    UpdateRecipeCategoryDto
>(RecipeCategoryToCreateDto, RecipeCategoryToUpdateDto);

function RecipeCategoryToCreateDto(
    entity: Partial<RecipeCategory>
): CreateRecipeCategoryDto {
    return {
        categoryName: entity.categoryName || "",
        subCategoryDtos: recipeSubCategoryDtoConverter.toCreateMany(
            entity.subCategories || []
        ),
    };
}

function RecipeCategoryToUpdateDto(
    entity: Partial<RecipeCategory>,
    editEntity: Partial<RecipeCategory> // TODO diff edit
): UpdateRecipeCategoryDto {
    let subCategoryDtos = null;
    subCategoryDtos = recipeSubCategoryDtoConverter.toNestedMany(
        entity.subCategories || [],
        editEntity.subCategories || []
    );
    return {
        categoryName: entity.categoryName || "",
        subCategoryDtos:
            subCategoryDtos && subCategoryDtos.length > 0
                ? subCategoryDtos
                : undefined,
    };
}
