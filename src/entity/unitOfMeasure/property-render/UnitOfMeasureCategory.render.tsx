import { Text, TextInput } from "@mantine/core";
import {
    GenericEntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { MantineComboBox } from "../../../lib/uiComponents/input/MantineComboBox";
import type { UnitOfMeasure, UnitOfMeasureCategory } from "../../entityTypes";

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
    return <Text>{value}</Text>;
};

const renderedCategoryName = (
    value: string,
    statefulInstance: GenericStatefulEntity<UnitOfMeasureCategory>,
    context: UnitOfMeasureCategoryRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setCategoryName(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedUnitsOfMeasure = (
    value: UnitOfMeasure[],
    _statefulInstance: GenericStatefulEntity<UnitOfMeasureCategory>,
    _context: UnitOfMeasureCategoryRenderContext
) => {
    return <Text>{`${value?.length || 0} units`}</Text>;
};

const renderedBaseConversionUnit = (
    value: UnitOfMeasure,
    statefulInstance: GenericStatefulEntity<UnitOfMeasureCategory>,
    context: UnitOfMeasureCategoryRenderContext,
    dataContext?: UnitOfMeasureCategoryDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <MantineComboBox<UnitOfMeasure>
                selectedOption={value ?? null}
                onOptionChange={(option) =>
                    context.setBaseConversionUnit(option)
                }
                totalOptions={dataContext?.unitsOfMeasure ?? []}
                labelKey={"name"}
            />
        );
    }
    return <Text>{value?.name || "No Base Unit"}</Text>;
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
