import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    Recipe,
    RecipeCategory,
    RecipeSubCategory,
} from "../../entityTypes";

export type RecipeCategoryRenderContext = {
    setCategoryName: (name: string) => void;
};

const renderedId = (
    value: number,
    _entity: RecipeCategory,
    _state: RenderState,
    _context: RecipeCategoryRenderContext
) => {
    return <GenericValueDisplay value={value} />;
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
    return <GenericValueDisplay value={value} />;
};

const renderedSubCategories = (
    value: RecipeSubCategory[],
    _entity: RecipeCategory,
    _state: RenderState,
    _context: RecipeCategoryRenderContext
) => {
    // TODO implement
    return (
        <GenericValueDisplay value={`${value?.length || 0} subcategories`} />
    );
};

const renderedRecipes = (
    value: Recipe[],
    _entity: RecipeCategory,
    _state: RenderState,
    _context: RecipeCategoryRenderContext
) => {
    // TODO implement
    return <GenericValueDisplay value={`${value?.length || 0} recipes`} />;
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
