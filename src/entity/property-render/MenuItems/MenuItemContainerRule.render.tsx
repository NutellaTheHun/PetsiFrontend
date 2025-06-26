import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type MenuItemContainerRule = components["schemas"]["MenuItemContainerRule"];

export type MenuItemContainerRuleRenderContext = {
    setValidItem: (id: number | null) => void;
    setValidSizes: (sizes: number[]) => void;
};

export type MenuItemContainerRulePropertyRenderer = (
    value: any,
    entity: MenuItemContainerRule,
    state: RenderState,
    context: MenuItemContainerRuleRenderContext
) => ReactNode;

export const menuItemContainerRulePropertyRenderer: PropertyRendererRecord<MenuItemContainerRule> =
    {
        id: (value, entity, state, context) =>
            renderedId(value, entity, state, context),
        parentContainerOption: (value, entity, state, context) =>
            renderedParentContainerOption(value, entity, state, context),
        validItem: (value, entity, state, context) =>
            renderedValidItem(value, entity, state, context),
        validSizes: (value, entity, state, context) =>
            renderedValidSizes(value, entity, state, context),
    };

export type MenuItemContainerRuleRenderProps = {
    entityProp: keyof MenuItemContainerRule;
    instance: MenuItemContainerRule;
    state: RenderState;
    context: MenuItemContainerRuleRenderContext;
};

export function MenuItemContainerRuleRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: MenuItemContainerRuleRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={menuItemContainerRulePropertyRenderer}
        />
    );
}

const renderedId = (
    value: number,
    entity: MenuItemContainerRule,
    state: RenderState,
    context: MenuItemContainerRuleRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedParentContainerOption = (
    value: MenuItemContainerRule["parentContainerOption"],
    entity: MenuItemContainerRule,
    state: RenderState,
    context: MenuItemContainerRuleRenderContext
) => {
    return (
        <GenericValue
            value={value?.parentContainer?.itemName || "No container option"}
        />
    );
};

const renderedValidItem = (
    value: MenuItemContainerRule["validItem"],
    entity: MenuItemContainerRule,
    state: RenderState,
    context: MenuItemContainerRuleRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setValidItem(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Valid Item</option>
                {/* TODO: Populate with actual menu items */}
            </select>
        );
    }
    return <GenericValue value={value?.itemName || "No valid item"} />;
};

const renderedValidSizes = (
    value: MenuItemContainerRule["validSizes"],
    entity: MenuItemContainerRule,
    state: RenderState,
    context: MenuItemContainerRuleRenderContext
) => {
    if (state === "edited") {
        return (
            <select
                multiple
                value={value?.map((size) => size.id.toString()) || []}
                onChange={(e) => {
                    const selectedOptions = Array.from(
                        e.target.selectedOptions,
                        (option) => Number(option.value)
                    );
                    context.setValidSizes(selectedOptions);
                }}
                className="border rounded px-2 py-1"
            >
                {/* TODO: Populate with actual sizes */}
            </select>
        );
    }
    return <div>Valid Sizes ({value?.length || 0})</div>;
};
