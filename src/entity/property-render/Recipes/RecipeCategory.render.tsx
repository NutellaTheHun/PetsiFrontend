import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

type RecipeCategory = components["schemas"]["RecipeCategory"];

export type RecipeCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

export type RecipeCategoryPropertyRenderer = (
    value: any,
    entity: RecipeCategory,
    state: RenderState,
    context: RecipeCategoryRenderContext
) => ReactNode;

const renderedId = (
    value: number,
    entity: RecipeCategory,
    state: RenderState,
    context: RecipeCategoryRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCategoryName = (
    value: string,
    entity: RecipeCategory,
    state: RenderState,
    context: RecipeCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setCategoryName(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedSubCategories = (
    value: RecipeCategory["subCategories"],
    entity: RecipeCategory,
    state: RenderState,
    context: RecipeCategoryRenderContext
) => {
    return <GenericValue value={`${value?.length || 0} subcategories`} />;
};

const renderedRecipes = (
    value: RecipeCategory["recipes"],
    entity: RecipeCategory,
    state: RenderState,
    context: RecipeCategoryRenderContext
) => {
    return <GenericValue value={`${value?.length || 0} recipes`} />;
};

export const recipeCategoryPropertyRenderer: Record<
    keyof RecipeCategory,
    RecipeCategoryPropertyRenderer
> = {
    id: renderedId,
    categoryName: renderedCategoryName,
    subCategories: renderedSubCategories,
    recipes: renderedRecipes,
};

export type RecipeCategoryRenderProps = {
    entityProp: keyof RecipeCategory;
    instance: RecipeCategory;
    state: RenderState;
    context: RecipeCategoryRenderContext;
};

export function RecipeCategoryRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: RecipeCategoryRenderProps) {
    const renderer = recipeCategoryPropertyRenderer[entityProp];
    return renderer(entityInstance[entityProp], entityInstance, state, context);
}
