import type { ReactNode } from "react";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { UnitOfMeasure, UnitOfMeasureCategory } from "../../entityTypes";
import { UnitOfMeasureDropdown } from "../components/unitOfMeasure/UnitOfMeasureDropdown";

export type UnitOfMeasureCategoryRenderContext = {
    setCategoryName: (name: string) => void;
    setBaseConversionUnit: (id: number | null) => void;
    unitsOfMeasure?: UnitOfMeasure[];
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
    return <GenericValueDisplay value={value} />;
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
    return <GenericValueDisplay value={value} />;
};

const renderedUnitsOfMeasure = (
    value: UnitOfMeasure[],
    _entity: UnitOfMeasureCategory,
    _state: RenderState,
    _context: UnitOfMeasureCategoryRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} units`} />;
};

const renderedBaseConversionUnit = (
    value: UnitOfMeasure,
    _entity: UnitOfMeasureCategory,
    state: RenderState,
    context: UnitOfMeasureCategoryRenderContext
) => {
    if (state === "edited") {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasureId={value?.id ?? null}
                onUpdateUnitOfMeasureId={context.setBaseConversionUnit}
                unitsOfMeasure={context.unitsOfMeasure ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.name || "No Base Unit"} />;
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
