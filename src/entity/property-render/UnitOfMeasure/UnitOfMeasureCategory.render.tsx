import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import type { RenderState } from "../render-types";

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
    entity: UnitOfMeasureCategory,
    state: RenderState,
    context: UnitOfMeasureCategoryRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedCategoryName = (
    value: string,
    entity: UnitOfMeasureCategory,
    state: RenderState,
    context: UnitOfMeasureCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setCategoryName(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedUnitsOfMeasure = (
    value: UnitOfMeasureCategory["unitsOfMeasure"],
    entity: UnitOfMeasureCategory,
    state: RenderState,
    context: UnitOfMeasureCategoryRenderContext
) => {
    return <GenericValue value={`${value?.length || 0} units`} />;
};

const renderedBaseConversionUnit = (
    value: UnitOfMeasureCategory["baseConversionUnit"],
    entity: UnitOfMeasureCategory,
    state: RenderState,
    context: UnitOfMeasureCategoryRenderContext
) => {
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

export const unitOfMeasureCategoryPropertyRenderer: Record<
    keyof UnitOfMeasureCategory,
    UnitOfMeasureCategoryPropertyRenderer
> = {
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
    const renderer = unitOfMeasureCategoryPropertyRenderer[entityProp];
    return renderer(entityInstance[entityProp], entityInstance, state, context);
}
