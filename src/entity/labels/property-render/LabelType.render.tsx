import type { components } from "../../../api-types";
import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
    type RenderState,
} from "../../../lib/generics/GenericEntityRenderer";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";

type LabelType = components["schemas"]["LabelType"];

export type LabelTypeRenderContext = {
    setLabelTypeName: (name: string) => void;
    setLabelTypeLength: (length: number) => void;
    setLabelTypeWidth: (width: number) => void;
};

const renderedId = (
    value: number,
    _entity: LabelType,
    _state: RenderState,
    _context: LabelTypeRenderContext
) => {
    return <GenericValueDisplay value={value} />;
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
    return <GenericValueDisplay value={value} />;
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
    return <GenericValueDisplay value={value} />;
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
    return <GenericValueDisplay value={value} />;
};

export const labelTypePropertyRenderer: PropertyRendererRecord<LabelType> = {
    id: renderedId,
    labelTypeName: renderedLabelTypeName,
    labelTypeLength: renderedLabelTypeLength,
    labelTypeWidth: renderedLabelTypeWidth,
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
