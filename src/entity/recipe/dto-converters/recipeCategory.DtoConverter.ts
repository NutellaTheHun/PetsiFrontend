import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeCategoryDto,
    RecipeCategory,
    UpdateRecipeCategoryDto,
} from "../../entityTypes";
import {
    ManyRecipeSubCategoryToCreateDto,
    ManyRecipeSubCategoryToNestedDto,
} from "./recipeSubCategory.DtoConverter";

export const RecipeCategoryDtoConverter: DtoConverter<
    RecipeCategory,
    CreateRecipeCategoryDto,
    UpdateRecipeCategoryDto
> = {
    toCreateDto: RecipeCategoryToCreateDto,
    toUpdateDto: RecipeCategoryToUpdateDto,
};

function RecipeCategoryToCreateDto(
    entity: Partial<RecipeCategory>
): CreateRecipeCategoryDto {
    return {
        categoryName: entity.categoryName || "",
        subCategoryDtos: ManyRecipeSubCategoryToCreateDto(
            entity.subCategories || []
        ),
    };
}

function RecipeCategoryToUpdateDto(
    entity: Partial<RecipeCategory>,
    editEntity: Partial<RecipeCategory> // TODO diff edit
): UpdateRecipeCategoryDto {
    let subCategoryDtos = null;
    subCategoryDtos = ManyRecipeSubCategoryToNestedDto(
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
