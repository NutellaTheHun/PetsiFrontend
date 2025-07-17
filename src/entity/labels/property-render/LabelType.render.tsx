import { NumberInput, Text, TextInput } from "@mantine/core";
import {
    EntityPropertyRenderer,
    type PropertyRendererRecord,
} from "../../../lib/entityUIDefinitions/EntityPropertyRenderer";
import {
    isEditOrCreate,
    type GenericStatefulEntity,
} from "../../../lib/GenericStatefulEntity";
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
    return <Text>{value}</Text>;
};

const renderedLabelTypeName = (
    value: string,
    statefulInstance: GenericStatefulEntity<LabelType>,
    context: LabelTypeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => {
                    context.setLabelTypeName(e.target.value);
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedLabelTypeLength = (
    value: number,
    statefulInstance: GenericStatefulEntity<LabelType>,
    context: LabelTypeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <TextInput
                value={value}
                onChange={(e) => {
                    context.setLabelTypeLength(Number(e));
                }}
            />
        );
    }
    return <Text>{value}</Text>;
};

const renderedLabelTypeWidth = (
    value: number,
    statefulInstance: GenericStatefulEntity<LabelType>,
    context: LabelTypeRenderContext
) => {
    if (isEditOrCreate(statefulInstance)) {
        return (
            <NumberInput
                value={value}
                onChange={(e) => {
                    context.setLabelTypeWidth(Number(e));
                }}
            />
        );
    }
    return <Text>{value}</Text>;
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
        <EntityPropertyRenderer
            entityProp={entityProp}
            statefulInstance={statefulInstance}
            context={context}
            propertyRenderer={labelTypePropertyRenderer}
        />
    );
}
