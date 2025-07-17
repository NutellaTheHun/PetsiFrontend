import { Paper, Title } from "@mantine/core";
import { useState } from "react";
import type {
    InventoryItem,
    InventoryItemCategory,
    InventoryItemPackage,
    InventoryItemVendor,
} from "../../../../entity/entityTypes";
import { useInventoryItemVendorMutations } from "../../../../entity/hookIndex";
import { InventoryItemCategoryListGroup } from "../../../../entity/inventoryItems/components/InventoryItemCategory/InventoryItemCategoryListGroup";
import { InventoryItemPackageListGroup } from "../../../../entity/inventoryItems/components/InventoryItemPackage/InventoryItemPackageListGroup";
import { InventoryItemVendorListGroup } from "../../../../entity/inventoryItems/components/InventoryItemVendor/InventoryItemVendorListGroup";
import { InventoryItemTable } from "../../../../entity/inventoryItems/components/inventoryItem/InventoryItemTable";
import { useInventoryItemCategories } from "../../../../entity/inventoryItems/hooks/useInventoryItemCategories";
import { useInventoryItemCategoryMutations } from "../../../../entity/inventoryItems/hooks/useInventoryItemCategoryMutations";
import { useInventoryItemMutations } from "../../../../entity/inventoryItems/hooks/useInventoryItemMutations";
import { useInventoryItemPackageMutations } from "../../../../entity/inventoryItems/hooks/useInventoryItemPackageMutations";
import { useInventoryItemPackages } from "../../../../entity/inventoryItems/hooks/useInventoryItemPackages";
import { useInventoryItemVendors } from "../../../../entity/inventoryItems/hooks/useInventoryItemVendors";
import { useInventoryItemsFindAll } from "../../../../entity/inventoryItems/hooks/useInventoryItemsFindAll";

export function InventoryItemAdminWindow() {
    const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(
        null
    );

    const [selectedCategory, setSelectedCategory] =
        useState<InventoryItemCategory | null>(null);

    const [selectedPackage, setSelectedPackage] =
        useState<InventoryItemPackage | null>(null);

    const [selectedVendor, setSelectedVendor] =
        useState<InventoryItemVendor | null>(null);

    const {
        inventoryItems,
        sortKey,
        sortDirection,
        setSortKey,
        setSortDirection,
        isLoading,
        error,
    } = useInventoryItemsFindAll({
        relations: ["category", "vendor"],
    });

    const inventoryItemMutations = useInventoryItemMutations();

    const { inventoryItemCategories } = useInventoryItemCategories();
    const inventoryItemCategoryMutations = useInventoryItemCategoryMutations();

    const { inventoryItemPackages } = useInventoryItemPackages();
    const inventoryItemPackageMutations = useInventoryItemPackageMutations();

    const { inventoryItemVendors } = useInventoryItemVendors();
    const inventoryItemVendorMutations = useInventoryItemVendorMutations();

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <Paper withBorder shadow="sm" p="md" mt="md" w={400}>
                        <Title order={4}>Inventory Item Categories</Title>
                        <InventoryItemCategoryListGroup
                            data={inventoryItemCategories}
                            useEntityMutation={inventoryItemCategoryMutations}
                            externalSelectedState={[
                                selectedCategory,
                                setSelectedCategory,
                            ]}
                        />
                    </Paper>
                </div>
                <div className="col">
                    <Paper withBorder shadow="sm" p="md" mt="md" w={400}>
                        <Title order={4}>Inventory Item Packages</Title>
                        <InventoryItemPackageListGroup
                            data={inventoryItemPackages}
                            useEntityMutation={inventoryItemPackageMutations}
                            externalSelectedState={[
                                selectedPackage,
                                setSelectedPackage,
                            ]}
                        />
                    </Paper>
                </div>
                <div className="col">
                    <Paper withBorder shadow="sm" p="md" mt="md" w={400}>
                        <Title order={4}>Inventory Item Vendors</Title>
                        <InventoryItemVendorListGroup
                            data={inventoryItemVendors}
                            useEntityMutation={inventoryItemVendorMutations}
                            externalSelectedState={[
                                selectedVendor,
                                setSelectedVendor,
                            ]}
                        />
                    </Paper>
                </div>
            </div>
            <div className="row">
                <div className="col"></div>
            </div>
            <div className="row">
                <div className="col">
                    {isLoading ? (
                        <p>Loading inventory items...</p>
                    ) : error ? (
                        <p>Error loading inventory items: {String(error)}</p>
                    ) : (
                        <Paper withBorder shadow="sm" p="md" mt="md" w={1000}>
                            <Title order={4}>Inventory Items</Title>
                            <InventoryItemTable
                                data={inventoryItems}
                                useEntityMutation={inventoryItemMutations}
                                externalSelectedState={[
                                    selectedItem,
                                    setSelectedItem,
                                ]}
                                sortKeyState={[sortKey, setSortKey]}
                                sortDirectionState={[
                                    sortDirection,
                                    setSortDirection,
                                ]}
                                inventoryItemCategories={
                                    inventoryItemCategories
                                }
                                inventoryItemVendors={inventoryItemVendors}
                            />
                        </Paper>
                    )}
                </div>
            </div>
        </div>
    );
}
