import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericCheckBoxInput } from "../../../lib/generics/propertyRenderers/GenericCheckBoxInput";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import { MenuItemCategoryDropdown } from "../components/menuItemCategory/MenuItemCategoryDropdown";

type MenuItem = components["schemas"]["MenuItem"];

export type MenuItemRenderContext = {
    setCategory: (id: number | null) => void;
    setItemName: (name: string) => void;
    setVeganOption: (id: number | null) => void;
    setTakeNBakeOption: (id: number | null) => void;
    setVeganTakeNBakeOption: (id: number | null) => void;
    setIsPOTM: (isPOTM: boolean) => void;
    setIsParbake: (isParbake: boolean) => void;
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
    value: MenuItem["category"],
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <MenuItemCategoryDropdown
                selectedCategoryId={value?.id ?? null}
                onUpdateCategoryId={context.setCategory}
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
    value: MenuItem["veganOption"],
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            // Searchbar dropdown
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setVeganOption(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Vegan Option</option>
                {/* TODO: Populate with actual menu items */}
            </select>
        );
    }
    return <GenericValueDisplay value={value?.itemName ?? "No vegan option"} />;
};

const renderedTakeNBakeOption = (
    value: MenuItem["takeNBakeOption"],
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            // Searchbar dropdown
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setTakeNBakeOption(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Take N Bake Option</option>
                {/* TODO: Populate with actual menu items */}
            </select>
        );
    }
    return (
        <GenericValueDisplay
            value={value?.itemName ?? "No take n bake option"}
        />
    );
};

const renderedVeganTakeNBakeOption = (
    value: MenuItem["veganTakeNBakeOption"],
    _entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            // Searchbar dropdown
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setVeganTakeNBakeOption(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Vegan Take N Bake Option</option>
                {/* TODO: Populate with actual menu items */}
            </select>
        );
    }
    return (
        <GenericValueDisplay
            value={value?.itemName ?? "No vegan take n bake option"}
        />
    );
};

const renderedValidSizes = (
    value: MenuItem["validSizes"],
    _entity: MenuItem,
    state: RenderState,
    _context: MenuItemRenderContext
) => {
    if (state === "edited") {
        // ValidItemSizeDropdown checkbox
        // placeholder same as normal state "value={`${value?.length || 0} sizes`}"
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
    value: MenuItem["definedContainerItems"],
    _entity: MenuItem,
    _state: RenderState,
    _context: MenuItemRenderContext
) => {
    // TODO Implement
    return <div>Container Items ({value?.length || 0})</div>;
};

const renderedContainerOptions = (
    _value: MenuItem["containerOptions"],
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
    return <GenericValueDisplay value={value} />;
};

const renderedUpdatedAt = (
    value: string,
    _entity: MenuItem,
    _state: RenderState,
    _context: MenuItemRenderContext
) => {
    return <GenericValueDisplay value={value} />;
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
