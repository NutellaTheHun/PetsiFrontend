import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { UnitOfMeasure, UnitOfMeasureCategory } from "../../entityTypes";
import { UnitOfMeasureDropdown } from "../components/unitOfMeasure/UnitOfMeasureDropdown";

export type UnitOfMeasureCategoryRenderContext = {
    setCategoryName: (name: string) => void;
    setBaseConversionUnit: (unitOfMeasure: UnitOfMeasure | null) => void;
};

export interface UnitOfMeasureCategoryDataContext
    extends EntityDataContext<UnitOfMeasureCategory> {
    unitsOfMeasure?: UnitOfMeasure[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<UnitOfMeasureCategory>,
    _context: UnitOfMeasureCategoryRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<UnitOfMeasureCategory>,
    context: UnitOfMeasureCategoryRenderContext
) => {
    if (isEditState(statefulInstance)) {
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
    _statefulInstance: GenericStatefulEntity<UnitOfMeasureCategory>,
    _context: UnitOfMeasureCategoryRenderContext
) => {
    return <GenericValueDisplay value={`${value?.length || 0} units`} />;
};

const renderedBaseConversionUnit = (
    value: UnitOfMeasure,
    statefulInstance: GenericStatefulEntity<UnitOfMeasureCategory>,
    context: UnitOfMeasureCategoryRenderContext,
    dataContext?: UnitOfMeasureCategoryDataContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <UnitOfMeasureDropdown
                selectedUnitOfMeasure={value ?? null}
                onUpdateUnitOfMeasure={context.setBaseConversionUnit}
                unitsOfMeasure={dataContext?.unitsOfMeasure ?? []}
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
    statefulInstance: GenericStatefulEntity<UnitOfMeasureCategory>;
    context: UnitOfMeasureCategoryRenderContext;
    dataContext?: UnitOfMeasureCategoryDataContext;
};

export function UnitOfMeasureCategoryRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: UnitOfMeasureCategoryRenderProps) {
    return (
        <GenericEntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={unitOfMeasureCategoryPropertyRenderer}
            dataContext={dataContext}
        />
    );
}
