import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeIngredientDto,
    NestedRecipeIngredientDto,
    RecipeIngredient,
    UpdateRecipeIngredientDto,
} from "../../entityTypes";

export const RecipeIngredientDtoConverter: DtoConverter<
    RecipeIngredient,
    CreateRecipeIngredientDto,
    UpdateRecipeIngredientDto
> = {
    toCreateDto: RecipeIngredientToCreateDto,
    toUpdateDto: RecipeIngredientToUpdateDto,
};

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

export function ManyRecipeIngredientToNestedDto(
    originalEntities: Partial<RecipeIngredient>[],
    editEntities: Partial<RecipeIngredient>[]
): NestedRecipeIngredientDto[] {
    const result: NestedRecipeIngredientDto[] = [];
    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: RecipeIngredientToCreateDto(editEntity),
            });
        } else {
            const originalEntity = originalEntities.find(
                (id) => id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: RecipeIngredientToUpdateDto(
                        originalEntity,
                        editEntity
                    ),
                });
            } else {
                throw Error(
                    "id of edited instance not found in original array"
                );
            }
        }
    }
    return result;
}

export function ManyRecipeIngredientToCreateDto(
    entities: Partial<RecipeIngredient>[]
): CreateRecipeIngredientDto[] {
    const result: CreateRecipeIngredientDto[] = [];
    for (const entity of entities) {
        result.push(RecipeIngredientToCreateDto(entity));
    }
    return result;
}
