import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
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

const renderedId = (
    value: number,
    _entity: RecipeCategory,
    _state: RenderState,
    _context: RecipeCategoryRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCategoryName = (
    value: string,
    _entity: RecipeCategory,
    state: RenderState,
    context: RecipeCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                type="text"
                value={value || ""}
                onChange={(e) => context.setCategoryName(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedSubCategories = (
    value: RecipeCategory["subCategories"],
    _entity: RecipeCategory,
    _state: RenderState,
    _context: RecipeCategoryRenderContext
) => {
    // TODO implement
    return <GenericValue value={`${value?.length || 0} subcategories`} />;
};

const renderedRecipes = (
    value: RecipeCategory["recipes"],
    _entity: RecipeCategory,
    _state: RenderState,
    _context: RecipeCategoryRenderContext
) => {
    // TODO implement
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
