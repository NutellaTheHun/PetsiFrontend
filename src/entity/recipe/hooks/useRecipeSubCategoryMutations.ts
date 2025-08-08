import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeSubCategoryDto,
    RecipeCategory,
    RecipeSubCategory,
    UpdateRecipeSubCategoryDto,
} from "../../entityTypes";
import type { RecipeSubCategoryRenderContext } from "../property-render/RecipeSubCategory.render";

export type RecipeSubCategoryEditContext = Pick<
    RecipeSubCategoryRenderContext,
    "setSubCategoryName"
>;

export type RecipeSubCategoryCreateContext = Pick<
    RecipeSubCategoryRenderContext,
    "setSubCategoryName" | "setParentCategory"
>;

// DTO converter for RecipeSubCategory
const recipeSubCategoryDtoConverter = {
    toCreateDto: (
        entity: Partial<RecipeSubCategory>
    ): CreateRecipeSubCategoryDto => ({
        subCategoryName: entity.subCategoryName || "",
        parentCategoryId: entity.parentCategory?.id || 0,
    }),
    toUpdateDto: (
        entity: Partial<RecipeSubCategory>
    ): UpdateRecipeSubCategoryDto => ({
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
        CreateRecipeSubCategoryDto,
        UpdateRecipeSubCategoryDto,
        RecipeSubCategoryEditContext,
        RecipeSubCategoryCreateContext
    >({
        endpoint: "/recipe-sub-categories",
        dtoConverter: recipeSubCategoryDtoConverter,
        createEditContext: createRecipeSubCategoryEditContext,
        createCreateContext: createRecipeSubCategoryCreateContext,
    });
}
