import type { ReactNode } from "react";
import type { components } from "../../../api-types";
import { GenericInput } from "../../../features/shared-components/table/render-cell-content/GenericInput";
import { GenericValue } from "../../../features/shared-components/table/render-cell-content/GenericValue";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../GenericEntityRenderer";

type LabelType = components["schemas"]["LabelType"];

export type LabelTypeRenderContext = {
    setLabelTypeName: (name: string) => void;
    setLabelTypeLength: (length: number) => void;
    setLabelTypeWidth: (width: number) => void;
};

export type LabelTypePropertyRenderer = (
    value: any,
    entity: LabelType,
    state: RenderState,
    context: LabelTypeRenderContext
) => ReactNode;

export const labelTypePropertyRenderer: PropertyRendererRecord<LabelType> = {
    id: (value, entity, state, context) =>
        renderedId(value, entity, state, context),
    labelTypeName: (value, entity, state, context) =>
        renderedLabelTypeName(value, entity, state, context),
    labelTypeLength: (value, entity, state, context) =>
        renderedLabelTypeLength(value, entity, state, context),
    labelTypeWidth: (value, entity, state, context) =>
        renderedLabelTypeWidth(value, entity, state, context),
};

export type LabelTypeRenderProps = {
    entityProp: keyof LabelType;
    instance: LabelType;
    state: RenderState;
    context: LabelTypeRenderContext;
};

export function LabelTypeRender({
    entityProp,
    instance: entityInstance,
    state,
    context,
}: LabelTypeRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            instance={entityInstance}
            state={state}
            context={context}
            propertyRenderer={labelTypePropertyRenderer}
        />
    );
}

const renderedId = (
    value: number,
    _entity: LabelType,
    _state: RenderState,
    _context: LabelTypeRenderContext
) => {
    return <GenericValue value={value} />;
};

const renderedLabelTypeName = (
    value: string,
    _entity: LabelType,
    state: RenderState,
    context: LabelTypeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="text"
                onChange={(e) => {
                    context.setLabelTypeName(e);
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedLabelTypeLength = (
    value: number,
    _entity: LabelType,
    state: RenderState,
    context: LabelTypeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="number"
                onChange={(e) => {
                    context.setLabelTypeLength(Number(e));
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};

const renderedLabelTypeWidth = (
    value: number,
    _entity: LabelType,
    state: RenderState,
    context: LabelTypeRenderContext
) => {
    if (state === "edited") {
        return (
            <GenericInput
                value={value}
                type="number"
                onChange={(e) => {
                    context.setLabelTypeWidth(Number(e));
                }}
            />
        );
    }
    return <GenericValue value={value} />;
};
