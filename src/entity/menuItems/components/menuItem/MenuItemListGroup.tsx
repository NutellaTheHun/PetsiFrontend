import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import { type EntityListGroupContext } from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import { NewEntityListGroupFactory } from "../../../../lib/entityUIDefinitions/NewEntityListGroupFactory";
import type { MenuItem } from "../../../entityTypes";
import {
    type MenuItemCreateContext,
    type MenuItemEditContext,
} from "../../hooks/useMenuItemMutations";
import { MenuItemRender } from "../../property-render/MenuItem.render";

export interface MenuItemListGroupProps
    extends Omit<
        EntityListGroupContext<
            MenuItem,
            MenuItemEditContext,
            MenuItemCreateContext
        >,
        "renderProperty"
    > {
    data: MenuItem[];
    useEntityMutation: UseEntityMutationsReturn<
        MenuItem,
        MenuItemEditContext,
        MenuItemCreateContext
    >;
    externalSelectedState: [MenuItem | null, (e: MenuItem | null) => void];
}

export function MenuItemListGroup(props: MenuItemListGroupProps) {
    return (
        <NewEntityListGroupFactory<
            MenuItem,
            MenuItemEditContext,
            MenuItemCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <MenuItemRender
                        entityProp="itemName"
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
