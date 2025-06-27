import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
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
    setCategory: (id: number | null) => void;
    setItemName: (name: string) => void;
    setVeganOption: (id: number | null) => void;
    setTakeNBakeOption: (id: number | null) => void;
    setVeganTakeNBakeOption: (id: number | null) => void;
    setValidSizes: (sizeIds: number[]) => void;
    setIsPOTM: (isPOTM: boolean) => void;
    setIsParbake: (isParbake: boolean) => void;
    menuItemCategories?: MenuItemCategory[];
    menuItems?: MenuItem[];
    menuItemSizes?: MenuItemSize[];
};

const renderedId = (
    value: number,
    _entity: MenuItem,
    _state: RenderState,
    _context: MenuItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCategory = (
    value: MenuItemCategory,
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemCategoryDropdown
                selectedCategoryId={value?.id ?? null}
                onUpdateCategoryId={context.setCategory}
                menuItemCategories={context.menuItemCategories ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? "No category"} />;
};

const renderedItemName = (
    value: string,
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
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
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSearchBarDropdown
                value={value?.id || null}
                onChange={(menuItemId) =>
                    context.setVeganOption(
                        menuItemId ? Number(menuItemId) : null
                    )
                }
                placeholder="Search items..."
                menuItems={context.menuItems ?? []}
                filterStrings={["vegan"]}
            />
        );
    }
    return <GenericValueDisplay value={value?.itemName ?? "No vegan option"} />;
};

const renderedTakeNBakeOption = (
    value: MenuItem | null,
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSearchBarDropdown
                value={value?.id || null}
                onChange={(menuItemId) =>
                    context.setTakeNBakeOption(
                        menuItemId ? Number(menuItemId) : null
                    )
                }
                placeholder="Search items..."
                menuItems={context.menuItems ?? []}
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
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemSearchBarDropdown
                value={value?.id || null}
                onChange={(menuItemId) =>
                    context.setVeganTakeNBakeOption(
                        menuItemId ? Number(menuItemId) : null
                    )
                }
                placeholder="Search items..."
                menuItems={context.menuItems ?? []}
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
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        const selectedSizeIds = value?.map((size) => size.id) || [];
        return (
            <MenuItemSizeDropdownCheckbox
                selectedSizeIds={selectedSizeIds}
                onUpdateSizeIds={context.setValidSizes}
                menuItemSizes={context.menuItemSizes ?? []}
                placeholder={`${value?.length || 0} sizes`}
            />
        );
    }
    // Add hover over tooltip to show the valid sizes
    return <GenericValueDisplay value={`${value?.length || 0} sizes`} />;
};

const renderedIsPOTM = (
    value: boolean,
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
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
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
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
    _entity: MenuItem,
    _state: RenderState,
    _context: MenuItemRenderContext
) => {
    return <span>({value?.length || 0}) Container Items</span>;
};

const renderedContainerOptions = (
    _value: MenuItemContainerOptions,
    _entity: MenuItem,
    _state: RenderState,
    _context: MenuItemRenderContext
) => {
    // TODO Implement
    return <div>Container Options</div>;
};

const renderedCreatedAt = (
    value: string,
    _entity: MenuItem,
    _state: RenderState,
    _context: MenuItemRenderContext
) => {
    return <GenericValueDisplay type="date" value={value} />;
};

const renderedUpdatedAt = (
    value: string,
    _entity: MenuItem,
    _state: RenderState,
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
    instance: MenuItem;
    state: RenderState;
    context: MenuItemRenderContext;
};

export function MenuItemRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: MenuItemRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={menuItemPropertyRenderer}
        />
    );
}
