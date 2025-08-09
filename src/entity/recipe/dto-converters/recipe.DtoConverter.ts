import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeDto,
    Recipe,
    UpdateRecipeDto,
} from "../../entityTypes";
import {
    ManyRecipeIngredientToCreateDto,
    ManyRecipeIngredientToNestedDto,
} from "./recipeIngredient.DtoConverter";

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
        ingredientDtos: ManyRecipeIngredientToCreateDto(
            entity.ingredients || []
        ),
    };
}

function RecipeToUpdateDto(
    entity: Partial<Recipe>,
    editEntity: Partial<Recipe> // TODO diff edit
): UpdateRecipeDto {
    let ingredientDtos = null;
    ingredientDtos = ManyRecipeIngredientToNestedDto(
        entity.ingredients || [],
        editEntity.ingredients || []
    );
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
        ingredientDtos:
            ingredientDtos && ingredientDtos.length > 0
                ? ingredientDtos
                : undefined,
    };
}
