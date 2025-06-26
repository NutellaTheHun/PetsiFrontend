import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

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

export type MenuItemPropertyRenderer = (
    value: any,
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => ReactNode;

export const menuItemPropertyRenderer: PropertyRendererRecord<MenuItem> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    category: (value, entity, state, context) =>
        renderedCategory(value, entity, state, context),
    itemName: (value, entity, state, context) =>
        renderedItemName(value, entity, state, context),
    veganOption: (value, entity, state, context) =>
        renderedVeganOption(value, entity, state, context),
    takeNBakeOption: (value, entity, state, context) =>
        renderedTakeNBakeOption(value, entity, state, context),
    veganTakeNBakeOption: (value, entity, state, context) =>
        renderedVeganTakeNBakeOption(value, entity, state, context),
    validSizes: (value, entity, state, context) =>
        renderedValidSizes(value, entity, state, context),
    isPOTM: (value, entity, state, context) =>
        renderedIsPOTM(value, entity, state, context),
    isParbake: (value, entity, state, context) =>
        renderedIsParbake(value, entity, state, context),
    definedContainerItems: (value, entity, state, context) =>
        renderedDefinedContainerItems(value, entity, state, context),
    containerOptions: (value, entity, state, context) =>
        renderedContainerOptions(value, entity, state, context),
    createdAt: (value, entity, state, context) =>
        renderedCreatedAt(value, entity, state, context),
    updatedAt: (value, entity, state, context) =>
        renderedUpdatedAt(value, entity, state, context),
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

const renderedId = (
    value: number,
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCategory = (
    value: MenuItem["category"],
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setCategory(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Category</option>
                {/* TODO: Populate with actual menu item categories */}
            </select>
        );
    }
    return <GenericValue value={value?.categoryName ?? "No category"} />;
};

const renderedItemName = (
    value: string,
    entity: MenuItem,
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
    return <GenericValue value={value} />;
};

const renderedVeganOption = (
    value: MenuItem["veganOption"],
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
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
    return <GenericValue value={value?.itemName ?? "No vegan option"} />;
};

const renderedTakeNBakeOption = (
    value: MenuItem["takeNBakeOption"],
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
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
    return <GenericValue value={value?.itemName ?? "No take n bake option"} />;
};

const renderedVeganTakeNBakeOption = (
    value: MenuItem["veganTakeNBakeOption"],
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
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
        <GenericValue
            value={value?.itemName ?? "No vegan take n bake option"}
        />
    );
};

const renderedValidSizes = (
    value: MenuItem["validSizes"],
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    return <div>Valid Sizes ({value?.length || 0})</div>;
};

const renderedIsPOTM = (
    value: boolean,
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => context.setIsPOTM(e.target.checked)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value ? "Yes" : "No"} />;
};

const renderedIsParbake = (
    value: boolean,
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="checkbox"
                checked={value}
                onChange={(e) => context.setIsParbake(e.target.checked)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value ? "Yes" : "No"} />;
};

const renderedDefinedContainerItems = (
    value: MenuItem["definedContainerItems"],
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    return <div>Container Items ({value?.length || 0})</div>;
};

const renderedContainerOptions = (
    value: MenuItem["containerOptions"],
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    return <div>Container Options</div>;
};

const renderedCreatedAt = (
    value: string,
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedUpdatedAt = (
    value: string,
    entity: MenuItem,
    state: RenderState,
    context: MenuItemRenderContext
) => {
    return <GenericValue value={value} />;
};
