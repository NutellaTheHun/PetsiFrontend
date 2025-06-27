import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";

type MenuItemContainerRule = components["schemas"]["MenuItemContainerRule"];

export type MenuItemContainerRuleRenderContext = {
    setValidItem: (id: number | null) => void;
    setValidSizes: (sizes: number[]) => void;
};

const renderedId = (
    value: number,
    _entity: MenuItemContainerRule,
    _state: RenderState,
    _context: MenuItemContainerRuleRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedParentContainerOption = (
    value: MenuItemContainerRule["parentContainerOption"],
    _entity: MenuItemContainerRule,
    _state: RenderState,
    _context: MenuItemContainerRuleRenderContext
) => {
    return (
        // TODO implement
        <GenericValueDisplay
            value={value?.parentContainer?.itemName || "No container option"}
        />
    );
};

const renderedValidItem = (
    value: MenuItemContainerRule["validItem"],
    _entity: MenuItemContainerRule,
    state: RenderState,
    context: MenuItemContainerRuleRenderContext
) => {
    if (state === "edited") {
        return (
            // TODO implement
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
    return <GenericValueDisplay value={value?.itemName || "No valid item"} />;
};

const renderedValidSizes = (
    value: MenuItemContainerRule["validSizes"],
    _entity: MenuItemContainerRule,
    state: RenderState,
    context: MenuItemContainerRuleRenderContext
) => {
    if (state === "edited") {
        return (
            // Checkbox dropdown? Or just columns of checkboxes
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

export const menuItemContainerRulePropertyRenderer: PropertyRendererRecord<MenuItemContainerRule> =
    {
        id: renderedId,
        parentContainerOption: renderedParentContainerOption,
        validItem: renderedValidItem,
        validSizes: renderedValidSizes,
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
