import type { components } from "../../../api-types";
import { Tooltip } from "../../../features/shared-components/Tooltip";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
import { GenericCheckBoxInput } from "../../../lib/generics/propertyRenderers/GenericCheckBoxInput";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type {
    MenuItemCategory,
    MenuItemContainerItem,
    MenuItemContainerOptions,
    MenuItemSize,
} from "../../entityTypes";
import { MenuItemSearchBarDropdown } from "../components/menuItem/MenuItemSearchBarDropdown";
import { MenuItemCategoryDropdown } from "../components/menuItemCategory/MenuItemCategoryDropdown";
import { MenuItemSizeDropdownCheckbox } from "../components/menuItemSize/MenuItemSizeDropdownCheckbox";

type MenuItem = components["schemas"]["MenuItem"];

export type MenuItemRenderContext = {
    setCategory: (entity: MenuItemCategory | null) => void;
    setItemName: (name: string) => void;
    setVeganOption: (entity: MenuItem | null) => void;
    setTakeNBakeOption: (entity: MenuItem | null) => void;
    setVeganTakeNBakeOption: (entity: MenuItem | null) => void;
    setValidSizes: (sizes: MenuItemSize[]) => void;
    setIsPOTM: (isPOTM: boolean) => void;
    setIsParbake: (isParbake: boolean) => void;
};

export interface MenuItemDataContext extends EntityDataContext<MenuItem> {
    menuItemCategories?: MenuItemCategory[];
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<MenuItem>,
    _context: MenuItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCategory = (
    value: MenuItemCategory,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext,
    dataContext?: MenuItemDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <MenuItemCategoryDropdown
                selectedCategory={value ?? null}
                onUpdateCategory={(category) => context.setCategory(category)}
                menuItemCategories={dataContext?.menuItemCategories ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? "No category"} />;
};

const renderedItemName = (
    value: string,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setItemName(e);
                }}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedVeganOption = (
    value: MenuItem | null,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext,
    dataContext?: MenuItemDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={(menuItem) => context.setVeganOption(menuItem)}
                placeholder="Search items..."
                menuItems={dataContext?.menuItems ?? []}
                filterStrings={["vegan"]}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName ?? "No vegan option"} />;
};

const renderedTakeNBakeOption = (
    value: MenuItem | null,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext,
    dataContext?: MenuItemDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={(menuItem) => context.setTakeNBakeOption(menuItem)}
                placeholder="Search items..."
                menuItems={dataContext?.menuItems ?? []}
                filterStrings={["take 'n bake"]}
            />
        );
    }
    return (
        <GenericValueDisplay
            value={value?.itemName ?? "No take n bake option"}
        />
    );
};

const renderedVeganTakeNBakeOption = (
    value: MenuItem | null,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext,
    dataContext?: MenuItemDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <MenuItemSearchBarDropdown
                value={value}
                onChange={(menuItem) =>
                    context.setVeganTakeNBakeOption(menuItem)
                }
                placeholder="Search items..."
                menuItems={dataContext?.menuItems ?? []}
                filterStrings={["vegan", "take 'n bake"]}
            />
        );
    }
    return (
        <GenericValueDisplay
            value={value?.itemName ?? "No vegan take n bake option"}
        />
    );
};

const renderedValidSizes = (
    value: MenuItemSize[],
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext,
    dataContext?: MenuItemDataContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <MenuItemSizeDropdownCheckbox
                selectedSizes={value}
                onUpdateSizes={context.setValidSizes}
                menuItemSizes={dataContext?.menuItemSizes ?? []}
                placeholder={`${value?.length || 0} sizes`}
            />
        );
    }

    // Create tooltip text from valid sizes
    const tooltipText = value?.length
        ? value.map((size) => size.name)
        : "No sizes available";

    return (
        <Tooltip content={tooltipText}>
            <GenericValueDisplay value={`${value?.length || 0} sizes`} />
        </Tooltip>
    );
};

const renderedIsPOTM = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <GenericCheckBoxInput
                value={value}
                onChange={(e) => context.setIsPOTM(e)}
            />
        );
    }
    return <GenericValueDisplay value={value ? "Yes" : "No"} />;
};

const renderedIsParbake = (
    value: boolean,
    statefulInstance: GenericStatefulEntity<MenuItem>,
    context: MenuItemRenderContext
) => {
    if (statefulInstance.state === "edit") {
        return (
            <GenericCheckBoxInput
                value={value}
                onChange={(e) => context.setIsParbake(e)}
            />
        );
    }
    return <GenericValueDisplay value={value ? "Yes" : "No"} />;
};

const renderedDefinedContainerItems = (
    value: MenuItemContainerItem[],
    _statefulInstance: GenericStatefulEntity<MenuItem>,
    _context: MenuItemRenderContext
) => {
    return (
        <GenericValueDisplay value={`${value?.length || 0} Container Items`} />
    );
};

const renderedContainerOptions = (
    value: MenuItemContainerOptions,
    _statefulInstance: GenericStatefulEntity<MenuItem>,
    _context: MenuItemRenderContext
) => {
    return (
        <GenericValueDisplay
            value={`${value?.containerRules.length || 0} items allowed, ${
                value?.validQuantity
            } total size`}
        />
    );
};

const renderedCreatedAt = (
    value: string,
    _statefulInstance: GenericStatefulEntity<MenuItem>,
    _context: MenuItemRenderContext
) => {
    return <GenericValueDisplay type="date" value={value} />;
};

const renderedUpdatedAt = (
    value: string,
    _statefulInstance: GenericStatefulEntity<MenuItem>,
    _context: MenuItemRenderContext
) => {
    return <GenericValueDisplay type="date" value={value} />;
};

export const menuItemPropertyRenderer: PropertyRendererRecord<MenuItem> = {
    id: renderedId,
    category: renderedCategory,
    itemName: renderedItemName,
    veganOption: renderedVeganOption,
    takeNBakeOption: renderedTakeNBakeOption,
    veganTakeNBakeOption: renderedVeganTakeNBakeOption,
    validSizes: renderedValidSizes,
    isPOTM: renderedIsPOTM,
    isParbake: renderedIsParbake,
    definedContainerItems: renderedDefinedContainerItems,
    containerOptions: renderedContainerOptions,
    createdAt: renderedCreatedAt,
    updatedAt: renderedUpdatedAt,
};

export type MenuItemRenderProps = {
    entityProp: keyof MenuItem;
    statefulInstance: GenericStatefulEntity<MenuItem>;
    context: MenuItemRenderContext;
    dataContext?: MenuItemDataContext;
};

export function MenuItemRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: MenuItemRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={menuItemPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
