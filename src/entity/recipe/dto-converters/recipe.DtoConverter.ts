import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckDtos,
} from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateRecipeDto,
    Recipe,
    UpdateRecipeDto,
} from "../../entityTypes";
import { recipeIngredientDtoConverter } from "./recipeIngredient.DtoConverter";

export const recipeDtoConverter = createDtoConverter<
    Recipe,
    CreateRecipeDto,
    UpdateRecipeDto
>(RecipeToCreateDto, RecipeToUpdateDto);

function RecipeToCreateDto(entity: Partial<Recipe>): CreateRecipeDto {
    return {
        recipeName: entity.recipeName || "",
        producedMenuItemId: entity.producedMenuItem?.id || 0,
        isIngredient: entity.isIngredient || false,
        batchResultMeasurementId: entity.batchResultMeasurement?.id || 0,
        batchResultQuantity: entity.batchResultQuantity || 0,
        servingSizeMeasurementId: entity.servingSizeMeasurement?.id || 0,
        servingSizeQuantity: entity.servingSizeQuantity || 0,
        salesPrice: entity.salesPrice || 0,
        categoryId: entity.category?.id || 0,
        subCategoryId: entity.subCategory?.id || 0,
        ingredientDtos: recipeIngredientDtoConverter.toCreateMany(
            entity.ingredients || []
        ),
    };
}

function RecipeToUpdateDto(
    entity: Partial<Recipe>,
    editEntity: Partial<Recipe> // TODO diff edit
): UpdateRecipeDto {
    let ingredientDtos = null;
    ingredientDtos = recipeIngredientDtoConverter.toNestedMany(
        entity.ingredients || [],
        editEntity.ingredients || []
    );
    return {
        recipeName: diffCheck(entity.recipeName, editEntity.recipeName),

        producedMenuItemId: diffCheck(
            entity.producedMenuItem?.id,
            editEntity.producedMenuItem?.id
        ),

        isIngredient: diffCheck(entity.isIngredient, editEntity.isIngredient),

        batchResultMeasurementId: diffCheck(
            entity.batchResultMeasurement?.id,
            editEntity.batchResultMeasurement?.id
        ),

        batchResultQuantity: diffCheck(
            entity.batchResultQuantity,
            editEntity.batchResultQuantity
        ),

        servingSizeMeasurementId: diffCheck(
            entity.servingSizeMeasurement?.id,
            editEntity.servingSizeMeasurement?.id
        ),

        servingSizeQuantity: diffCheck(
            entity.servingSizeQuantity,
            editEntity.servingSizeQuantity
        ),

        salesPrice: diffCheck(entity.salesPrice, editEntity.salesPrice),

        categoryId: diffCheck(entity.category?.id, editEntity.category?.id),

        subCategoryId: diffCheck(
            entity.subCategory?.id,
            editEntity.subCategory?.id
        ),

        ingredientDtos: diffCheckDtos(ingredientDtos),
    };
}
