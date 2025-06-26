import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

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

export const recipeCategoryPropertyRenderer: PropertyRendererRecord<RecipeCategory> =
    {
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
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={recipeCategoryPropertyRenderer}
        />
    );
}
