import { Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
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
    return <Text>{value}</Text>;
};

const renderedSubCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<RecipeSubCategory>,
    context: RecipeSubCategoryRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setSubCategoryName(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedParentCategory = (
    _value: RecipeCategory,
    _statefulInstance: GenericStatefulEntity<RecipeSubCategory>,
    _context: RecipeSubCategoryRenderContext
) => {
    return <Text>{"Nothing to display"}</Text>;
};

const renderedRecipes = (
    value: Recipe[],
    _statefulInstance: GenericStatefulEntity<RecipeSubCategory>,
    _context: RecipeSubCategoryRenderContext
) => {
    return <Text>{`${value?.length ?? 0} recipes`}</Text>;
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
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={recipeSubCategoryPropertyRenderer}
        />
    );
}
