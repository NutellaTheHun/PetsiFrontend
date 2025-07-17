import { NumberInput, Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type EntityDataContext,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
import { DropdownSelection } from "../../../lib/uiComponents/input/DropdownSelection";
import type { UnitOfMeasure, UnitOfMeasureCategory } from "../../entityTypes";

export type UnitOfMeasureRenderContext = {
    setName: (name: string) => void;
    setAbbreviation: (abbreviation: string) => void;
    setCategory: (category: UnitOfMeasureCategory) => void;
    setConversionFactorToBase: (factor: string) => void;
};

export interface UnitOfMeasureDataContext
    extends EntityDataContext<UnitOfMeasure> {
    unitOfMeasureCategories?: UnitOfMeasureCategory[];
}

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<UnitOfMeasure>,
    _context: UnitOfMeasureRenderContext
) => {
    return <Text>{value}</Text>;
};

const renderedName = (
    value: string,
    statefulInstance: GenericStatefulEntity<UnitOfMeasure>,
    context: UnitOfMeasureRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setName(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedAbbreviation = (
    value: string,
    statefulInstance: GenericStatefulEntity<UnitOfMeasure>,
    context: UnitOfMeasureRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => context.setAbbreviation(e.target.value)}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedCategory = (
    value: UnitOfMeasureCategory,
    statefulInstance: GenericStatefulEntity<UnitOfMeasure>,
    context: UnitOfMeasureRenderContext,
    dataContext?: UnitOfMeasureDataContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <DropdownSelection<UnitOfMeasureCategory>
                selectedOption={value ?? null}
                onOptionChange={(option) => context.setCategory(option)}
                totalOptions={dataContext?.unitOfMeasureCategories ?? []}
                labelKey={"categoryName"}
            />
        );
    }
    return <Text>{value?.categoryName ?? "No Category"}</Text>;
};

const renderedConversionFactorToBase = (
    value: string, // ???
    statefulInstance: GenericStatefulEntity<UnitOfMeasure>,
    context: UnitOfMeasureRenderContext
) => {
    // validation?
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value}
                onChange={(e) =>
                    context.setConversionFactorToBase(e.toString())
                }
            />
        );
    }
    return <Text>{value ?? "No conversion factor"}</Text>;
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
    dataContext?: UnitOfMeasureDataContext;
};

export function UnitOfMeasureRender({
    entityProp,
    statefulInstance,
    context,
    dataContext,
}: UnitOfMeasureRenderProps) {
    return (
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={unitOfMeasurePropertyRenderer}
            dataContext={dataContext}
        />
    );
}
