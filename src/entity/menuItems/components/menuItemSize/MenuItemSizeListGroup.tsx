import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import {
    EntityListGroupFactory,
    type EntityListGroupContext,
} from "../../../../lib/entityUIDefinitions/EntityListGroupFactory";
import type { MenuItemSize } from "../../../entityTypes";
import {
    type MenuItemSizeCreateContext,
    type MenuItemSizeEditContext,
} from "../../hooks/useMenuItemSizeMutations";
import { MenuItemSizeRender } from "../../property-render/MenuItemSize.render";
export interface MenuItemSizeListGroupProps
    extends Omit<
        EntityListGroupContext<
            MenuItemSize,
            MenuItemSizeEditContext,
            MenuItemSizeCreateContext
        >,
        "renderProperty"
    > {
    data: MenuItemSize[];
    useEntityMutation: UseEntityMutationsReturn<
        MenuItemSize,
        MenuItemSizeEditContext,
        MenuItemSizeCreateContext
    >;
    externalSelectedState: [
        MenuItemSize | null,
        (e: MenuItemSize | null) => void
    ];
}

export function MenuItemSizeListGroup(props: MenuItemSizeListGroupProps) {
    return (
        <EntityListGroupFactory<
            MenuItemSize,
            MenuItemSizeEditContext,
            MenuItemSizeCreateContext
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            renderProperty={(item) => {
                return (
                    <MenuItemSizeRender
                        entityProp="name"
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
