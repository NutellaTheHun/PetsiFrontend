import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import { type EntityListGroupContext } from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import { NewEntityListGroupFactory } from "../../../../lib/entityUIDefinitions/NewEntityListGroupFactory";
import type { RecipeCategory } from "../../../entityTypes";
import {
    type RecipeCategoryCreateContext,
    type RecipeCategoryEditContext,
} from "../../hooks/useRecipeCategoryMutations";
import { RecipeCategoryRender } from "../../property-render/RecipeCategory.render";

export interface RecipeCategoryListGroupProps
    extends Omit<
        EntityListGroupContext<
            RecipeCategory,
            RecipeCategoryEditContext,
            RecipeCategoryCreateContext
        >,
        "renderProperty"
    > {
    data: RecipeCategory[];
    useEntityMutation: UseEntityMutationsReturn<
        RecipeCategory,
        RecipeCategoryEditContext,
        RecipeCategoryCreateContext
    >;
    externalSelectedState: [
        RecipeCategory | null,
        (e: RecipeCategory | null) => void
    ];
}

export function RecipeCategoryListGroup(props: RecipeCategoryListGroupProps) {
    return (
        <NewEntityListGroupFactory<
            RecipeCategory,
            RecipeCategoryEditContext,
            RecipeCategoryCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <RecipeCategoryRender
                        entityProp="categoryName"
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
