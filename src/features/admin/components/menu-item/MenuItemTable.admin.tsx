import type {
    MenuItem,
    MenuItemCategory,
    MenuItemSize,
} from "../../../../entity/entityTypes";
import type {
    MenuItemCreateContext,
    MenuItemEditContext,
} from "../../../../entity/menuItems/hooks/useMenuItemMutations";
import type { MenuItemSortKey } from "../../../../entity/menuItems/hooks/useMenuItemsFindAll";
import { MenuItemRender } from "../../../../entity/menuItems/property-render/MenuItem.render";
import type { UseEntityMutationsReturn } from "../../../../lib/entityHookTemplates/UseEntityMutations";
import type { SortDirection } from "../../../../lib/entityHookTemplates/UseGenericEntity";
import {
    EntityTableFactory,
    type EntityTableContext,
} from "../../../../lib/entityUIDefinitions/EntityTableFactory";
import type { GenericStatefulEntity } from "../../../../lib/GenericStatefulEntity";

export interface MenuItemTableAdminProps
    extends Omit<
        EntityTableContext<
            MenuItem,
            MenuItemEditContext,
            MenuItemCreateContext,
            MenuItemSortKey
        >,
        "columns" | "validSortKeys"
    > {
    data: MenuItem[];
    useEntityMutation: UseEntityMutationsReturn<
        MenuItem,
        MenuItemEditContext,
        MenuItemCreateContext
    >;
    externalSelectedState: [MenuItem | null, (entity: MenuItem | null) => void];
    sortKeyState: [MenuItemSortKey, (sortKey: MenuItemSortKey) => void];
    sortDirectionState: [SortDirection, (direction: SortDirection) => void];
    categories: MenuItemCategory[];
    sizes: MenuItemSize[];
}

export function MenuItemTableAdmin(props: MenuItemTableAdminProps) {
    return (
        <EntityTableFactory<
            MenuItem,
            MenuItemEditContext,
            MenuItemCreateContext,
            MenuItemSortKey
        >
            data={props.data}
            useEntityMutation={props.useEntityMutation}
            externalSelectedState={props.externalSelectedState}
            sortKeyState={props.sortKeyState}
            sortDirectionState={props.sortDirectionState}
            validSortKeys={["itemName", "category", "id"]}
            columns={[
                {
                    key: "id",
                    label: "Id",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<MenuItem>
                    ) => {
                        return (
                            <MenuItemRender
                                entityProp="id"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "itemName",
                    label: "Item Name",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<MenuItem>
                    ) => {
                        return (
                            <MenuItemRender
                                entityProp="itemName"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "category",
                    label: "Category",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<MenuItem>
                    ) => {
                        return (
                            <MenuItemRender
                                entityProp="category"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "validSizes",
                    label: "Valid Sizes",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<MenuItem>
                    ) => {
                        return (
                            <MenuItemRender
                                entityProp="validSizes"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
                {
                    key: "createdAt",
                    label: "Created At",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<MenuItem>
                    ) => {
                        return (
                            <MenuItemRender
                                entityProp="createdAt"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },

                {
                    key: "updatedAt",
                    label: "Updated At",
                    sortable: true,
                    renderProperty: (
                        entity: GenericStatefulEntity<MenuItem>
                    ) => {
                        return (
                            <MenuItemRender
                                entityProp="updatedAt"
                                statefulInstance={entity}
                                context={
                                    entity.state === "create"
                                        ? props.useEntityMutation.createContext
                                        : props.useEntityMutation.editContext
                                }
                            />
                        );
                    },
                },
            ]}
        />
    );
}
