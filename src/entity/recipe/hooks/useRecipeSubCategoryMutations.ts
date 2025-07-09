import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeSubcategoryDto,
    RecipeCategory,
    RecipeSubCategory,
    UpdateRecipeSubcategoryDto,
} from "../../entityTypes";

export type RecipeSubCategoryEditContext = {
    setSubCategoryName: (name: string) => void;
    setParentCategory: (category: RecipeCategory) => void;
};

export type RecipeSubCategoryCreateContext = {
    setSubCategoryName: (name: string) => void;
    setParentCategory: (category: RecipeCategory) => void;
};

// DTO converter for RecipeSubCategory
const recipeSubCategoryDtoConverter = {
    toCreateDto: (
        entity: Partial<RecipeSubCategory>
    ): CreateRecipeSubcategoryDto => ({
        subCategoryName: entity.subCategoryName || "",
        parentCategoryId: entity.parentCategory?.id || 0,
    }),
    toUpdateDto: (
        entity: Partial<RecipeSubCategory>
    ): UpdateRecipeSubcategoryDto => ({
        subCategoryName: entity.subCategoryName || "",
    }),
};

// Context factory functions
const createRecipeSubCategoryEditContext = (
    editInstance: Partial<RecipeSubCategory> | null,
    setEditInstance: (instance: Partial<RecipeSubCategory> | null) => void
): RecipeSubCategoryEditContext => ({
    setSubCategoryName: (name: string) => {
        setEditInstance({ ...editInstance, subCategoryName: name });
    },
    setParentCategory: (category: RecipeCategory) => {
        setEditInstance({ ...editInstance, parentCategory: category });
    },
});

const createRecipeSubCategoryCreateContext = (
    createInstance: Partial<RecipeSubCategory>,
    setCreateInstance: (instance: Partial<RecipeSubCategory>) => void
): RecipeSubCategoryCreateContext => ({
    setSubCategoryName: (name: string) => {
        setCreateInstance({ ...createInstance, subCategoryName: name });
    },
    setParentCategory: (category: RecipeCategory) => {
        setCreateInstance({ ...createInstance, parentCategory: category });
    },
});

// Entity-specific mutations hook
export function useRecipeSubCategoryMutations() {
    return useEntityMutations<
        RecipeSubCategory,
        CreateRecipeSubcategoryDto,
        UpdateRecipeSubcategoryDto,
        RecipeSubCategoryEditContext,
        RecipeSubCategoryCreateContext
    >({
        endpoint: "/recipe-sub-categories",
        dtoConverter: recipeSubCategoryDtoConverter,
        createEditContext: createRecipeSubCategoryEditContext,
        createCreateContext: createRecipeSubCategoryCreateContext,
    });
}
