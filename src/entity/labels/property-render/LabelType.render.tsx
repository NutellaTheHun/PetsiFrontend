import {
    GenericEntityRenderer,
    type PropertyRendererRecord,
} from "../../../lib/generics/GenericEntityRenderer";
import type { GenericStatefulEntity } from "../../../lib/generics/GenericStatefulEntity";
import { GenericInput } from "../../../lib/generics/propertyRenderers/GenericInput";
import { GenericValueDisplay } from "../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { LabelType } from "../../entityTypes";

export type LabelTypeRenderContext = {
    setLabelTypeName: (name: string) => void;
    setLabelTypeLength: (length: number) => void;
    setLabelTypeWidth: (width: number) => void;
};

const renderedId = (
    value: number,
    _statefulInstance: GenericStatefulEntity<LabelType>,
    _context: LabelTypeRenderContext
) => {
    return <GenericValueDisplay value={value} />;
};

const renderedLabelTypeName = (
    value: string,
    statefulInstance: GenericStatefulEntity<LabelType>,
    context: LabelTypeRenderContext
) => {
    if (statefulInstance.state === "edited") {
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
    statefulInstance: GenericStatefulEntity<LabelType>,
    context: LabelTypeRenderContext
) => {
    if (statefulInstance.state === "edited") {
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
    statefulInstance: GenericStatefulEntity<LabelType>,
    context: LabelTypeRenderContext
) => {
    if (statefulInstance.state === "edited") {
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
    statefulInstance: GenericStatefulEntity<LabelType>;
    context: LabelTypeRenderContext;
};

export function LabelTypeRender({
    entityProp,
    statefulInstance,
    context,
}: LabelTypeRenderProps) {
    return (
        <GenericEntityRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={labelTypePropertyRenderer}
        />
    );
}
