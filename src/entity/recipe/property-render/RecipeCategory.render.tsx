import { Text, TextInput } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
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
    return <Text>{value}</Text>;
};

const renderedCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<RecipeCategory>,
    context: RecipeCategoryRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value ?? ""}
                onChange={(e) => context.setCategoryName(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedSubCategories = (
    value: RecipeSubCategory[],
    _statefulInstance: GenericStatefulEntity<RecipeCategory>,
    _context: RecipeCategoryRenderContext
) => {
    return <Text>{`${value?.length ?? 0} subcategories`}</Text>;
};

const renderedRecipes = (
    value: Recipe[],
    _statefulInstance: GenericStatefulEntity<RecipeCategory>,
    _context: RecipeCategoryRenderContext
) => {
    return <Text>{`${value?.length ?? 0} recipes`}</Text>;
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
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={recipeCategoryPropertyRenderer}
        />
    );
}
