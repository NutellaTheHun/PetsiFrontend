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
    return <GenericValueDisplay value={value} />;
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
    return <GenericValueDisplay value={value} />;
};

const renderedParentCategory = (
    _value: RecipeCategory,
    _entity: RecipeSubCategory,
    _state: RenderState,
    _context: RecipeSubCategoryRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display"} />;
};

const renderedRecipes = (
    value: Recipe[],
    _entity: RecipeSubCategory,
    _state: RenderState,
    _context: RecipeSubCategoryRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} recipes`} />;
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
