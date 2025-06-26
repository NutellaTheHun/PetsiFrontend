import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValue } from "../../../lib/generics/propertyRenderers/GenericValue";

type RecipeSubCategory = components["schemas"]["RecipeSubCategory"];

export type RecipeSubCategoryRenderContext = {
    setSubCategoryName: (name: string) => void;
    setParentCategory: (id: number | null) => void;
};

const renderedId = (
    value: number,
    _entity: RecipeSubCategory,
    _state: RenderState,
    _context: RecipeSubCategoryRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedSubCategoryName = (
    value: string,
    _entity: RecipeSubCategory,
    state: RenderState,
    context: RecipeSubCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                type="text"
                value={value}
                onChange={(e) => context.setSubCategoryName(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedParentCategory = (
    value: RecipeSubCategory["parentCategory"],
    _entity: RecipeSubCategory,
    state: RenderState,
    context: RecipeSubCategoryRenderContext
) => {
    // TODO implement, sub recipe category search dropdown?
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setParentCategory(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Category</option>
                {/* TODO: Populate with actual recipe categories */}
            </select>
        );
    }
    return <GenericValue value={value?.categoryName || "No Category"} />;
};

const renderedRecipes = (
    value: RecipeSubCategory["recipes"],
    _entity: RecipeSubCategory,
    _state: RenderState,
    _context: RecipeSubCategoryRenderContext
) => {
    // TODO implement, sub recipe search dropdown, but list?
    return <GenericValue value={`${value?.length || 0} recipes`} />;
};

export const recipeSubCategoryPropertyRenderer: PropertyRendererRecord<RecipeSubCategory> =
    {
        id: renderedId,
        subCategoryName: renderedSubCategoryName,
        parentCategory: renderedParentCategory,
        recipes: renderedRecipes,
    };

export type RecipeSubCategoryRenderProps = {
    entityProp: keyof RecipeSubCategory;
    instance: RecipeSubCategory;
    state: RenderState;
    context: RecipeSubCategoryRenderContext;
};

export function RecipeSubCategoryRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: RecipeSubCategoryRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={recipeSubCategoryPropertyRenderer}
        />
    );
}
