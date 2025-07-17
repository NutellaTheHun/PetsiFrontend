import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import { type EntityListGroupContext } from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import { NewEntityListGroupFactory } from "../../../../lib/entityUIDefinitions/NewEntityListGroupFactory";
import type { RecipeSubCategory } from "../../../entityTypes";
import {
    type RecipeSubCategoryCreateContext,
    type RecipeSubCategoryEditContext,
} from "../../hooks/useRecipeSubCategoryMutations";
import { RecipeSubCategoryRender } from "../../property-render/RecipeSubCategory.render";

export interface RecipeSubCategoryListGroupProps
    extends Omit<
        EntityListGroupContext<
            RecipeSubCategory,
            RecipeSubCategoryEditContext,
            RecipeSubCategoryCreateContext
        >,
        "renderProperty"
    > {
    data: RecipeSubCategory[];
    useEntityMutation: UseEntityMutationsReturn<
        RecipeSubCategory,
        RecipeSubCategoryEditContext,
        RecipeSubCategoryCreateContext
    >;
    externalSelectedState: [
        RecipeSubCategory | null,
        (e: RecipeSubCategory | null) => void
    ];
}

export function RecipeSubCategoryListGroup(
    props: RecipeSubCategoryListGroupProps
) {
    return (
        <NewEntityListGroupFactory<
            RecipeSubCategory,
            RecipeSubCategoryEditContext,
            RecipeSubCategoryCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <RecipeSubCategoryRender
                        entityProp="subCategoryName"
                        statefulInstance={item}
                        context={
                            item.state === "create"
                                ? props.useEntityMutation.createContext
                                : props.useEntityMutation.editContext
                        }
                    />
                );
            }}
        />
    );
}
