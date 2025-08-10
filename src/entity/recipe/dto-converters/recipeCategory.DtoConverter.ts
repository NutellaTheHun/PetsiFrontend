import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckDtos,
} from "../../../lib/dtoConverters/updatePropertyDiff";
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
    editEntity: Partial<RecipeCategory>
): UpdateRecipeCategoryDto {
    let subCategoryDtos = null;
    subCategoryDtos = recipeSubCategoryDtoConverter.toNestedMany(
        entity.subCategories || [],
        editEntity.subCategories || []
    );
    return {
        categoryName: diffCheck(entity.categoryName, editEntity.categoryName),
        subCategoryDtos: diffCheckDtos(subCategoryDtos),
    };
}
