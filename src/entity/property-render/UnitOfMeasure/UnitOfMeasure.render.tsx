import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import type { RenderState } from "../render-types";

type UnitOfMeasure = components["schemas"]["UnitOfMeasure"];

export type UnitOfMeasureRenderContext = {
    setName: (name: string) => void;
    setAbbreviation: (abbreviation: string) => void;
    setCategory: (id: number | null) => void;
    setConversionFactorToBase: (factor: string) => void;
};

export type UnitOfMeasurePropertyRenderer = (
    value: any,
    entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => ReactNode;

export type UnitOfMeasureRenderProps = {
    entityProp: keyof UnitOfMeasure;
    instance: UnitOfMeasure;
    state: RenderState;
    context: UnitOfMeasureRenderContext;
};

const renderedId = (
    value: number,
    entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    return <span>{value}</span>;
};

const renderedName = (
    value: string,
    entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setName(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <span>{value}</span>;
};

const renderedAbbreviation = (
    value: string,
    entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) => context.setAbbreviation(e.target.value)}
                className="border rounded px-2 py-1"
            />
        );
    }
    return <span>{value}</span>;
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
    return <span>{value?.categoryName || "No Category"}</span>;
};

const renderedConversionFactorToBase = (
    value: string,
    entity: UnitOfMeasure,
    state: RenderState,
    context: UnitOfMeasureRenderContext
) => {
    if (state === "edited") {
        return (
            <input
                type="text"
                value={value || ""}
                onChange={(e) =>
                    context.setConversionFactorToBase(e.target.value)
                }
                className="border rounded px-2 py-1"
            />
        );
    }
    return <span>{value || "No conversion factor"}</span>;
};

const renderers: Record<keyof UnitOfMeasure, UnitOfMeasurePropertyRenderer> = {
    id: renderedId,
    name: renderedName,
    abbreviation: renderedAbbreviation,
    category: renderedCategory,
    conversionFactorToBase: renderedConversionFactorToBase,
};

export function UnitOfMeasureRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: UnitOfMeasureRenderProps) {
    const value = entityInstance[entityProp];
    const renderer = renderers[entityProp];

    if (!renderer) {
        return <span>Unknown property: {entityProp}</span>;
    }

    return renderer(value, entityInstance, state, context);
}
