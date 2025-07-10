import {
    GenericEntityPropertyRenderer,
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

export type RecipeSubCategoryRenderContext = {
    setSubCategoryName: (name: string) => void;
    setParentCategory?: (category: RecipeCategory) => void; // Only for create context, not edit
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<RecipeSubCategory>,
    _context: RecipeSubCategoryRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedSubCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<RecipeSubCategory>,
    context: RecipeSubCategoryRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    _statefulInstance: GenericStatefulEntity<RecipeSubCategory>,
    _context: RecipeSubCategoryRenderContext
) => {
    return <GenericValueDisplay value={"Nothing to display"} />;
};

const renderedRecipes = (
    value: Recipe[],
    _statefulInstance: GenericStatefulEntity<RecipeSubCategory>,
    _context: RecipeSubCategoryRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length ?? 0} recipes`} />;
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
    statefulInstance: GenericStatefulEntity<RecipeSubCategory>;
    context: RecipeSubCategoryRenderContext;
};

export function RecipeSubCategoryRender({
    entityProp,
    statefulInstance,
    context,
}: RecipeSubCategoryRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={recipeSubCategoryPropertyRenderer}
        />
    );
}
