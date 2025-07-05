import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
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
    _statefulInstance: GenericStatefulEntity<RecipeCategory>,
    _context: RecipeCategoryRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<RecipeCategory>,
    context: RecipeCategoryRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                type="text"
                value={value ?? ""}
                onChange={(e) => context.setCategoryName(e)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedSubCategories = (
    value: RecipeSubCategory[],
    _statefulInstance: GenericStatefulEntity<RecipeCategory>,
    _context: RecipeCategoryRenderContext
) => {
    return (
        <GenericValueDisplay value={`${value?.length ?? 0} subcategories`} />
    );
};

const renderedRecipes = (
    value: Recipe[],
    _statefulInstance: GenericStatefulEntity<RecipeCategory>,
    _context: RecipeCategoryRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length ?? 0} recipes`} />;
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
    statefulInstance: GenericStatefulEntity<RecipeCategory>;
    context: RecipeCategoryRenderContext;
};

export function RecipeCategoryRender({
    entityProp,
    statefulInstance,
    context,
}: RecipeCategoryRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={recipeCategoryPropertyRenderer}
        />
    );
}
