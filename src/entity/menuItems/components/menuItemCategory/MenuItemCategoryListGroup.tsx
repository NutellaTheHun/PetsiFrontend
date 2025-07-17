import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import {
    EntityListGroupFactory,
    type EntityListGroupContext,
} from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import type { MenuItemCategory } from "../../../entityTypes";
import {
    type MenuItemCategoryCreateContext,
    type MenuItemCategoryEditContext,
} from "../../hooks/useMenuItemCategoryMutations";
import { MenuItemCategoryRender } from "../../property-render/MenuItemCategory.render";

export interface MenuItemCategoryListGroupProps
    extends Omit<
        EntityListGroupContext<
            MenuItemCategory,
            MenuItemCategoryEditContext,
            MenuItemCategoryCreateContext
        >,
        "renderProperty"
    > {
    data: MenuItemCategory[];
    useEntityMutation: UseEntityMutationsReturn<
        MenuItemCategory,
        MenuItemCategoryEditContext,
        MenuItemCategoryCreateContext
    >;
    externalSelectedState: [
        MenuItemCategory | null,
        (e: MenuItemCategory | null) => void
    ];
}

export function MenuItemCategoryListGroup(
    props: MenuItemCategoryListGroupProps
) {
    return (
        <EntityListGroupFactory<
            MenuItemCategory,
            MenuItemCategoryEditContext,
            MenuItemCategoryCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <MenuItemCategoryRender
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
