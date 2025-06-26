import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type UnitOfMeasureCategory = components["schemas"]["UnitOfMeasureCategory"];

export type UnitOfMeasureCategoryRenderContext = {
    setCategoryName: (name: string) => void;
    setBaseConversionUnit: (id: number | null) => void;
};

export type UnitOfMeasureCategoryPropertyRenderer = (
    value: any,
    entity: UnitOfMeasureCategory,
    state: RenderState,
    context: UnitOfMeasureCategoryRenderContext
) => ReactNode;

const renderedId = (
    value: number,
    _entity: UnitOfMeasureCategory,
    _state: RenderState,
    _context: UnitOfMeasureCategoryRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCategoryName = (
    value: string,
    _entity: UnitOfMeasureCategory,
    state: RenderState,
    context: UnitOfMeasureCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                type="text"
                value={value}
                onChange={(e) => context.setCategoryName(e)}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedUnitsOfMeasure = (
    value: UnitOfMeasureCategory["unitsOfMeasure"],
    _entity: UnitOfMeasureCategory,
    _state: RenderState,
    _context: UnitOfMeasureCategoryRenderContext
) => {
    // TODO implement, unit of measure list?
    return <GenericValue value={`${value?.length || 0} units`} />;
};

const renderedBaseConversionUnit = (
    value: UnitOfMeasureCategory["baseConversionUnit"],
    _entity: UnitOfMeasureCategory,
    state: RenderState,
    context: UnitOfMeasureCategoryRenderContext
) => {
    // TODO implement, unit of measure search dropdown?
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setBaseConversionUnit(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Base Unit</option>
                {/* TODO: Populate with actual units of measure */}
            </select>
        );
    }
    return <GenericValue value={value?.name || "No Base Unit"} />;
};

export const unitOfMeasureCategoryPropertyRenderer: PropertyRendererRecord<UnitOfMeasureCategory> =
    {
        id: renderedId,
        categoryName: renderedCategoryName,
        unitsOfMeasure: renderedUnitsOfMeasure,
        baseConversionUnit: renderedBaseConversionUnit,
    };

export type UnitOfMeasureCategoryRenderProps = {
    entityProp: keyof UnitOfMeasureCategory;
    instance: UnitOfMeasureCategory;
    state: RenderState;
    context: UnitOfMeasureCategoryRenderContext;
};

export function UnitOfMeasureCategoryRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: UnitOfMeasureCategoryRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={unitOfMeasureCategoryPropertyRenderer}
        />
    );
}
