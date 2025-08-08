import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeDto,
    Recipe,
    UpdateRecipeDto,
} from "../../entityTypes";

export const RecipeDtoConverter: DtoConverter<
    Recipe,
    CreateRecipeDto,
    UpdateRecipeDto
> = {
    toCreateDto: RecipeToCreateDto,
    toUpdateDto: RecipeToUpdateDto,
};

function RecipeToCreateDto(entity: Partial<Recipe>): CreateRecipeDto {
    return {
        recipeName: entity.recipeName || "",
        producedMenuItemId: entity.producedMenuItem?.id || 0,
        isIngredient: entity.isIngredient,
        batchResultMeasurementId: entity.batchResultMeasurement?.id || 0,
        batchResultQuantity: entity.batchResultQuantity || 0,
        servingSizeMeasurementId: entity.servingSizeMeasurement?.id || 0,
        servingSizeQuantity: entity.servingSizeQuantity || 0,
        salesPrice: entity.salesPrice || 0,
        categoryId: entity.category?.id || 0,
        subCategoryId: entity.subCategory?.id || 0,
        ingredientDtos: [], // RecipeIngredientsToCreateDtos()
    };
}

function RecipeToUpdateDto(
    entity: Partial<Recipe>,
    editEntity: Partial<Recipe> // TODO diff edit
): UpdateRecipeDto {
    return {
        recipeName: entity.recipeName || "",
        producedMenuItemId: entity.producedMenuItem?.id || 0,
        isIngredient: entity.isIngredient,
        batchResultMeasurementId: entity.batchResultMeasurement?.id || 0,
        batchResultQuantity: entity.batchResultQuantity || 0,
        servingSizeMeasurementId: entity.servingSizeMeasurement?.id || 0,
        servingSizeQuantity: entity.servingSizeQuantity || 0,
        salesPrice: entity.salesPrice || 0,
        categoryId: entity.category?.id || 0,
        subCategoryId: entity.subCategory?.id || 0,
        ingredientDtos: [], // RecipeIngredientsToCreateDtos()
    };
}
