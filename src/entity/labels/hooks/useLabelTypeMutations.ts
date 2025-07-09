import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateLabelTypeDto,
    LabelType,
    UpdateLabelTypeDto,
} from "../../entityTypes";

export type LabelTypeEditContext = {
    setLabelTypeName: (name: string) => void;
    setLabelTypeLength: (length: number) => void;
    setLabelTypeWidth: (width: number) => void;
};

export type LabelTypeCreateContext = {
    setLabelTypeName: (name: string) => void;
    setLabelTypeLength: (length: number) => void;
    setLabelTypeWidth: (width: number) => void;
};

// DTO converter for LabelType
const labelTypeDtoConverter = {
    toCreateDto: (entity: Partial<LabelType>): CreateLabelTypeDto => ({
        labelTypeName: entity.labelTypeName || "",
        labelTypeLength: entity.labelTypeLength || 0,
        labelTypeWidth: entity.labelTypeWidth || 0,
    }),
    toUpdateDto: (entity: Partial<LabelType>): UpdateLabelTypeDto => ({
        labelTypeName: entity.labelTypeName || "",
        labelTypeLength: entity.labelTypeLength || 0,
        labelTypeWidth: entity.labelTypeWidth || 0,
    }),
};

// Context factory functions
const createLabelTypeEditContext = (
    editInstance: Partial<LabelType> | null,
    setEditInstance: (instance: Partial<LabelType> | null) => void
): LabelTypeEditContext => ({
    setLabelTypeName: (name: string) => {
        setEditInstance({ ...editInstance, labelTypeName: name });
    },
    setLabelTypeLength: (length: number) => {
        setEditInstance({ ...editInstance, labelTypeLength: length });
    },
    setLabelTypeWidth: (width: number) => {
        setEditInstance({ ...editInstance, labelTypeWidth: width });
    },
});

const createLabelTypeCreateContext = (
    createInstance: Partial<LabelType>,
    setCreateInstance: (instance: Partial<LabelType>) => void
): LabelTypeCreateContext => ({
    setLabelTypeName: (name: string) => {
        setCreateInstance({ ...createInstance, labelTypeName: name });
    },
    setLabelTypeLength: (length: number) => {
        setCreateInstance({ ...createInstance, labelTypeLength: length });
    },
    setLabelTypeWidth: (width: number) => {
        setCreateInstance({ ...createInstance, labelTypeWidth: width });
    },
});

// Entity-specific mutations hook
export function useLabelTypeMutations() {
    return useEntityMutations<
        LabelType,
        CreateLabelTypeDto,
        UpdateLabelTypeDto,
        LabelTypeEditContext,
        LabelTypeCreateContext
    >({
        endpoint: "/label-types",
        dtoConverter: labelTypeDtoConverter,
        createEditContext: createLabelTypeEditContext,
        createCreateContext: createLabelTypeCreateContext,
    });
}
