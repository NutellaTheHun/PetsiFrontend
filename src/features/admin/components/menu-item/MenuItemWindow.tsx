import { Paper, Title } from "@mantine/core";
import { useState } from "react";
import type {
    MenuItem,
    MenuItemCategory,
    MenuItemSize,
} from "../../../../entity/entityTypes";
import {
    useMenuItemCategoriesFindAll,
    useMenuItemCategoryMutations,
    useMenuItemMutations,
    useMenuItemsFindAll,
    useMenuItemSizeMutations,
    useMenuItemSizesFindAll,
} from "../../../../entity/hookIndex";
import { MenuItemCategoryListGroup } from "../../../../entity/menuItems/components/menuItemCategory/MenuItemCategoryListGroup";
import { MenuItemSizeListGroup } from "../../../../entity/menuItems/components/menuItemSize/MenuItemSizeListGroup";
import { MenuItemTableAdmin } from "./MenuItemTable.admin";

export function MenuItemsWindow() {
    const {
        menuItemCategories,
        isLoading: isLoadingCategories,
        error: categoryError,
    } = useMenuItemCategoriesFindAll();
    const useMenuItemCategoryMutation = useMenuItemCategoryMutations();
    const [selectedMenuItemCategory, setSelectedMenuItemCategory] =
        useState<MenuItemCategory | null>(null);

    const {
        menuItemSizes,
        isLoading: isLoadingSizes,
        error: sizeError,
    } = useMenuItemSizesFindAll();
    const useMenuItemSizeMutation = useMenuItemSizeMutations();
    const [selectedMenuItemSize, setSelectedMenuItemSize] =
        useState<MenuItemSize | null>(null);

    const {
        menuItems,
        isLoading: isLoadingMenuItems,
        error: menuItemError,
        sortKey: menuItemSortKey,
        sortDirection: menuItemSortDirection,
        setSortKey: menuItemSetSortKey,
        setSortDirection: menuItemSetSortDirection,
    } = useMenuItemsFindAll();
    const useMenuItemMutation = useMenuItemMutations();
    const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(
        null
    );
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    {isLoadingCategories ? (
                        <div>Loading...</div>
                    ) : categoryError ? (
                        <div>Error: {categoryError.message}</div>
                    ) : (
                        <Paper withBorder shadow="sm" p="md" mt="md" w={400}>
                            <Title order={4}>Menu Item Categories</Title>
                            <MenuItemCategoryListGroup
                                data={menuItemCategories}
                                useEntityMutation={useMenuItemCategoryMutation}
                                externalSelectedState={[
                                    selectedMenuItemCategory,
                                    setSelectedMenuItemCategory,
                                ]}
                            />
                        </Paper>
                    )}
                </div>
                <div className="col">
                    {isLoadingSizes ? (
                        <div>Loading...</div>
                    ) : sizeError ? (
                        <div>Error: {sizeError.message}</div>
                    ) : (
                        <Paper withBorder shadow="sm" p="md" mt="md" w={400}>
                            <Title order={4}>Menu Item Sizes</Title>
                            <MenuItemSizeListGroup
                                data={menuItemSizes}
                                useEntityMutation={useMenuItemSizeMutation}
                                externalSelectedState={[
                                    selectedMenuItemSize,
                                    setSelectedMenuItemSize,
                                ]}
                            />
                        </Paper>
                    )}
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {isLoadingMenuItems ? (
                        <div>Loading...</div>
                    ) : menuItemError ? (
                        <div>Error: {menuItemError.message}</div>
                    ) : (
                        <Paper withBorder shadow="sm" p="md" mt="md" w={900}>
                            <Title order={4}>Menu Items</Title>
                            <MenuItemTableAdmin
                                data={menuItems}
                                useEntityMutation={useMenuItemMutation}
                                externalSelectedState={[
                                    selectedMenuItem,
                                    setSelectedMenuItem,
                                ]}
                                sortKeyState={[
                                    menuItemSortKey,
                                    menuItemSetSortKey,
                                ]}
                                sortDirectionState={[
                                    menuItemSortDirection,
                                    menuItemSetSortDirection,
                                ]}
                                categories={menuItemCategories}
                                sizes={menuItemSizes}
                            />
                        </Paper>
                    )}
                </div>
            </div>
        </div>
    );
}
