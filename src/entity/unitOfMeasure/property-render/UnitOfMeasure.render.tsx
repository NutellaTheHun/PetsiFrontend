import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { UnitOfMeasure, UnitOfMeasureCategory } from "../../entityTypes";

export type UnitOfMeasureRenderContext = {
    setName: (name: string) => void;
    setAbbreviation: (abbreviation: string) => void;
    setCategory: (id: number | null) => void;
    setConversionFactorToBase: (factor: string) => void;
};

const renderedId = (
    value: number,
    _entity: UnitOfMeasure,
    _state: RenderState,
    _context: UnitOfMeasureRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedName = (
    value: string,
    _entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    if (state === "edited") {
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
    _entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    if (state === "edited") {
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
    _entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    // TODO implement, unit of measure category search dropdown?
    if (state === "edited") {
        return (
            <select
                value={value?.id || ""}
                onChange={(e) =>
                    context.setCategory(
                        e.target.value ? Number(e.target.value) : null
                    )
                }
                className="border rounded px-2 py-1"
            >
                <option value="">Select Category</option>
                {/* TODO: Populate with actual categories */}
            </select>
        );
    }
    return <GenericValueDisplay value={value?.categoryName ?? "No Category"} />;
};

const renderedConversionFactorToBase = (
    value: string,
    _entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    // validation?
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
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
    instance: UnitOfMeasure;
    state: RenderState;
    context: UnitOfMeasureRenderContext;
};

export function UnitOfMeasureRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: UnitOfMeasureRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={unitOfMeasurePropertyRenderer}
        />
    );
}
