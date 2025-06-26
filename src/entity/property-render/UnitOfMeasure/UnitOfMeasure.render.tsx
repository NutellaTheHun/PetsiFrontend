import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type UnitOfMeasure = components["schemas"]["UnitOfMeasure"];

export type UnitOfMeasureRenderContext = {
    setName: (name: string) => void;
    setAbbreviation: (abbreviation: string) => void;
    setCategory: (id: number | null) => void;
    setConversionFactorToBase: (factor: string) => void;
};

const renderedId = (
    value: number,
    entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedName = (
    value: string,
    entity: UnitOfMeasure,
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
    return <GenericValue value={value} />;
};

const renderedAbbreviation = (
    value: string,
    entity: UnitOfMeasure,
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
    return <GenericValue value={value} />;
};

const renderedCategory = (
    value: UnitOfMeasure["category"],
    entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    // Placeholder for entity reference
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
    return <GenericValue value={value?.categoryName ?? "No Category"} />;
};

const renderedConversionFactorToBase = (
    value: string,
    entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => context.setConversionFactorToBase(e)}
            />
        );
    }
    return <GenericValue value={value ?? "No conversion factor"} />;
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
