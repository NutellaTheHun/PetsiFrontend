import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeIngredientDto,
    InventoryItem,
    Recipe,
    RecipeIngredient,
    UnitOfMeasure,
    UpdateRecipeIngredientDto,
} from "../../entityTypes";
import type { RecipeIngredientRenderContext } from "../property-render/RecipeIngredient.render";

export type RecipeIngredientEditContext = Pick<
    RecipeIngredientRenderContext,
    | "setIngredientInventoryItem"
    | "setIngredientRecipe"
    | "setQuantity"
    | "setQuantityMeasure"
>;

export type RecipeIngredientCreateContext = Pick<
    RecipeIngredientRenderContext,
    | "setParentRecipe"
    | "setIngredientInventoryItem"
    | "setIngredientRecipe"
    | "setQuantity"
    | "setQuantityMeasure"
>;

// DTO converter for RecipeIngredient
const recipeIngredientDtoConverter = {
    toCreateDto: (
        entity: Partial<RecipeIngredient>
    ): CreateRecipeIngredientDto => ({
        parentRecipeId: entity.parentRecipe?.id || 0,
        ingredientInventoryItemId:
            entity.ingredientInventoryItem?.id || undefined,
        ingredientRecipeId: entity.ingredientRecipe?.id || undefined,
        quantity: entity.quantity || 0,
        quantityMeasurementId: entity.quantityMeasure?.id || 0,
    }),
    toUpdateDto: (
        entity: Partial<RecipeIngredient>
    ): UpdateRecipeIngredientDto => ({
        quantity: entity.quantity || 0,
        quantityMeasurementId: entity.quantityMeasure?.id || 0,
        ingredientInventoryItemId: entity.ingredientInventoryItem?.id
            ? {}
            : undefined,
        ingredientRecipeId: entity.ingredientRecipe?.id ? {} : undefined,
    }),
};

// Context factory functions
const createRecipeIngredientEditContext = (
    editInstance: Partial<RecipeIngredient> | null,
    setEditInstance: (instance: Partial<RecipeIngredient> | null) => void
): RecipeIngredientEditContext => ({
    setIngredientInventoryItem: (item: InventoryItem | null) => {
        setEditInstance({
            ...editInstance,
            ingredientInventoryItem: item || undefined,
        });
    },
    setIngredientRecipe: (recipe: Recipe | null) => {
        setEditInstance({
            ...editInstance,
            ingredientRecipe: recipe || undefined,
        });
    },
    setQuantity: (quantity: number) => {
        setEditInstance({ ...editInstance, quantity });
    },
    setQuantityMeasure: (measurement: UnitOfMeasure) => {
        setEditInstance({ ...editInstance, quantityMeasure: measurement });
    },
});

const createRecipeIngredientCreateContext = (
    createInstance: Partial<RecipeIngredient>,
    setCreateInstance: (instance: Partial<RecipeIngredient>) => void
): RecipeIngredientCreateContext => ({
    setParentRecipe: (recipe: Recipe) => {
        setCreateInstance({ ...createInstance, parentRecipe: recipe });
    },
    setIngredientInventoryItem: (item: InventoryItem | null) => {
        setCreateInstance({
            ...createInstance,
            ingredientInventoryItem: item || undefined,
        });
    },
    setIngredientRecipe: (recipe: Recipe | null) => {
        setCreateInstance({
            ...createInstance,
            ingredientRecipe: recipe || undefined,
        });
    },
    setQuantity: (quantity: number) => {
        setCreateInstance({ ...createInstance, quantity });
    },
    setQuantityMeasure: (measurement: UnitOfMeasure) => {
        setCreateInstance({
            ...createInstance,
            quantityMeasure: measurement,
        });
    },
});

// Entity-specific mutations hook
export function useRecipeIngredientMutations() {
    return useEntityMutations<
        RecipeIngredient,
        CreateRecipeIngredientDto,
        UpdateRecipeIngredientDto,
        RecipeIngredientEditContext,
        RecipeIngredientCreateContext
    >({
        endpoint: "/recipe-ingredients",
        dtoConverter: recipeIngredientDtoConverter,
        createEditContext: createRecipeIngredientEditContext,
        createCreateContext: createRecipeIngredientCreateContext,
    });
}
