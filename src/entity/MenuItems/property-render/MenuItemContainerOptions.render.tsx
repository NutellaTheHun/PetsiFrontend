import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type MenuItemContainerOptions =
    components["schemas"]["MenuItemContainerOptions"];

export type MenuItemContainerOptionsRenderContext = {
    setValidQuantity: (quantity: number) => void;
    setParentContainer: (id: number | null) => void;
};

const renderedId = (
    value: number,
    _entity: MenuItemContainerOptions,
    _state: RenderState,
    _context: MenuItemContainerOptionsRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedParentContainer = (
    value: MenuItemContainerOptions["parentContainer"],
    _entity: MenuItemContainerOptions,
    state: RenderState,
    context: MenuItemContainerOptionsRenderContext
) => {
    if (state === "edited") {
        return (
            // Searchbar dropdown
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setParentContainer(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Parent Container</option>
                {/* TODO: Populate with actual menu items */}
            </select>
        );
    }
    return <GenericValue value={value?.itemName || "No parent container"} />;
};

const renderedContainerRules = (
    value: MenuItemContainerOptions["containerRules"],
    _entity: MenuItemContainerOptions,
    _state: RenderState,
    _context: MenuItemContainerOptionsRenderContext
) => {
    // TODO Implement
    return <div>Container Rules ({value?.length || 0})</div>;
};

const renderedValidQuantity = (
    value: number,
    _entity: MenuItemContainerOptions,
    state: RenderState,
    context: MenuItemContainerOptionsRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="number"
                onChange={(e) => {
                    context.setValidQuantity(Number(e));
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};

export const menuItemContainerOptionsPropertyRenderer: PropertyRendererRecord<MenuItemContainerOptions> =
    {
        id: renderedId,
        parentContainer: renderedParentContainer,
        containerRules: renderedContainerRules,
        validQuantity: renderedValidQuantity,
    };

export type MenuItemContainerOptionsRenderProps = {
    entityProp: keyof MenuItemContainerOptions;
    instance: MenuItemContainerOptions;
    state: RenderState;
    context: MenuItemContainerOptionsRenderContext;
};

export function MenuItemContainerOptionsRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: MenuItemContainerOptionsRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={menuItemContainerOptionsPropertyRenderer}
        />
    );
}
