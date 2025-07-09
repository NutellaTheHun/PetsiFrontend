import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeCategoryDto,
    RecipeCategory,
    UpdateRecipeCategoryDto,
} from "../../entityTypes";

export type RecipeCategoryEditContext = {
    setCategoryName: (name: string) => void;
};

export type RecipeCategoryCreateContext = {
    setCategoryName: (name: string) => void;
};

// DTO converter for RecipeCategory
const recipeCategoryDtoConverter = {
    toCreateDto: (
        entity: Partial<RecipeCategory>
    ): CreateRecipeCategoryDto => ({
        categoryName: entity.categoryName || "",
    }),
    toUpdateDto: (
        entity: Partial<RecipeCategory>
    ): UpdateRecipeCategoryDto => ({
        categoryName: entity.categoryName || "",
    }),
};

// Context factory functions
const createRecipeCategoryEditContext = (
    editInstance: Partial<RecipeCategory> | null,
    setEditInstance: (instance: Partial<RecipeCategory> | null) => void
): RecipeCategoryEditContext => ({
    setCategoryName: (name: string) => {
        setEditInstance({ ...editInstance, categoryName: name });
    },
});

const createRecipeCategoryCreateContext = (
    createInstance: Partial<RecipeCategory>,
    setCreateInstance: (instance: Partial<RecipeCategory>) => void
): RecipeCategoryCreateContext => ({
    setCategoryName: (name: string) => {
        setCreateInstance({ ...createInstance, categoryName: name });
    },
});

// Entity-specific mutations hook
export function useRecipeCategoryMutations() {
    return useEntityMutations<
        RecipeCategory,
        CreateRecipeCategoryDto,
        UpdateRecipeCategoryDto,
        RecipeCategoryEditContext,
        RecipeCategoryCreateContext
    >({
        endpoint: "/recipe-categories",
        dtoConverter: recipeCategoryDtoConverter,
        createEditContext: createRecipeCategoryEditContext,
        createCreateContext: createRecipeCategoryCreateContext,
    });
}
