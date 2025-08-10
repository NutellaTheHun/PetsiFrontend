import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import type {
    CreateRecipeIngredientDto,
    RecipeIngredient,
    UpdateRecipeIngredientDto,
} from "../../entityTypes";

export const recipeIngredientDtoConverter = createNestedDtoConverter<
    RecipeIngredient,
    CreateRecipeIngredientDto,
    UpdateRecipeIngredientDto
>(RecipeIngredientToCreateDto, RecipeIngredientToUpdateDto);

function RecipeIngredientToCreateDto(
    entity: Partial<RecipeIngredient>
): CreateRecipeIngredientDto {
    return {
        parentRecipeId: entity.parentRecipe?.id || 0,
        ingredientInventoryItemId:
            entity.ingredientInventoryItem?.id || undefined,
        ingredientRecipeId: entity.ingredientRecipe?.id || undefined,
        quantity: entity.quantity || 0,
        quantityMeasurementId: entity.quantityMeasure?.id || 0,
    };
}

function RecipeIngredientToUpdateDto(
    entity: Partial<RecipeIngredient>,
    editEntity: Partial<RecipeIngredient> // TODO diff edit
): UpdateRecipeIngredientDto {
    return {
        ingredientInventoryItemId:
            entity.ingredientInventoryItem?.id || undefined,
        ingredientRecipeId: entity.ingredientRecipe?.id || undefined,
        quantity: entity.quantity || 0,
        quantityMeasurementId: entity.quantityMeasure?.id || 0,
    };
}
