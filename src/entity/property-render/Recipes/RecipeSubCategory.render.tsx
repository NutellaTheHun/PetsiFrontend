import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type RecipeSubCategory = components["schemas"]["RecipeSubCategory"];

export type RecipeSubCategoryRenderContext = {
    setSubCategoryName: (name: string) => void;
    setParentCategory: (id: number | null) => void;
};

export type RecipeSubCategoryPropertyRenderer = (
    value: any,
    entity: RecipeSubCategory,
    state: RenderState,
    context: RecipeSubCategoryRenderContext
) => ReactNode;

const renderedId = (
    value: number,
    entity: RecipeSubCategory,
    state: RenderState,
    context: RecipeSubCategoryRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedSubCategoryName = (
    value: string,
    entity: RecipeSubCategory,
    state: RenderState,
    context: RecipeSubCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setSubCategoryName(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedParentCategory = (
    value: RecipeSubCategory["parentCategory"],
    entity: RecipeSubCategory,
    state: RenderState,
    context: RecipeSubCategoryRenderContext
) => {
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
    entity: RecipeSubCategory,
    state: RenderState,
    context: RecipeSubCategoryRenderContext
) => {
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
