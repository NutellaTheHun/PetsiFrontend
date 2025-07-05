import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import {
    isEditState,
    type GenericStatefulEntity,
} from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { UnitOfMeasure, UnitOfMeasureCategory } from "../../entityTypes";
import { UnitOfMeasureCategoryDropdown } from "../components/unitOfMeasureCategory/UnitOfMeasureCategoryDropdown";

export type UnitOfMeasureRenderContext = {
    setName: (name: string) => void;
    setAbbreviation: (abbreviation: string) => void;
    setCategory: (category: UnitOfMeasureCategory | null) => void;
    setConversionFactorToBase: (factor: string) => void;
    unitOfMeasureCategories?: UnitOfMeasureCategory[];
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<UnitOfMeasure>,
    _context: UnitOfMeasureRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedName = (
    value: string,
    statefulInstance: GenericStatefulEntity<UnitOfMeasure>,
    context: UnitOfMeasureRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => context.setName(e)}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedAbbreviation = (
    value: string,
    statefulInstance: GenericStatefulEntity<UnitOfMeasure>,
    context: UnitOfMeasureRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => context.setAbbreviation(e)}
            />
        );
    }
    return <GenericValueDisplay value={value} />;
};

const renderedCategory = (
    value: UnitOfMeasureCategory,
    statefulInstance: GenericStatefulEntity<UnitOfMeasure>,
    context: UnitOfMeasureRenderContext
) => {
    if (isEditState(statefulInstance)) {
        return (
            <UnitOfMeasureCategoryDropdown
                selectedCategory={value ?? null}
                onUpdateCategory={context.setCategory}
                unitOfMeasureCategories={context.unitOfMeasureCategories ?? []}
            />
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? "No Category"} />;
};

const renderedConversionFactorToBase = (
    value: string, // ???
    statefulInstance: GenericStatefulEntity<UnitOfMeasure>,
    context: UnitOfMeasureRenderContext
) => {
    // validation?
    if (isEditState(statefulInstance)) {
        return (
            <GenericInput
                value={value}
                type="number" // ???
                onChange={(e) => context.setConversionFactorToBase(e)}
            />
        );
    }
    return <GenericValueDisplay value={value ?? "No conversion factor"} />;
};

export const unitOfMeasurePropertyRenderer: PropertyRendererRecord<UnitOfMeasure> =
    {
        id: renderedId,
        name: renderedName,
        abbreviation: renderedAbbreviation,
        category: renderedCategory,
        conversionFactorToBase: renderedConversionFactorToBase,
    };

export type UnitOfMeasureRenderProps = {
    entityProp: keyof UnitOfMeasure;
    statefulInstance: GenericStatefulEntity<UnitOfMeasure>;
    context: UnitOfMeasureRenderContext;
};

export function UnitOfMeasureRender({
    entityProp,
    statefulInstance,
    context,
}: UnitOfMeasureRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={unitOfMeasurePropertyRenderer}
        />
    );
}
