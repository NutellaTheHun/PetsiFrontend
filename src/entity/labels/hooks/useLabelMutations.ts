import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type { CreateLabelDto, Label, UpdateLabelDto } from "../../entityTypes";
import type { LabelRenderContext } from "../property-render/Label.render";

export type LabelEditContext = Pick<
    LabelRenderContext,
    "setMenuItem" | "setImageUrl" | "setLabelType"
>;

export type LabelCreateContext = Pick<
    LabelRenderContext,
    "setMenuItem" | "setImageUrl" | "setLabelType"
>;

// DTO converter for Label
const labelDtoConverter = {
    toCreateDto: (entity: Partial<Label>): CreateLabelDto => ({
        menuItemId: entity.menuItem?.id || 0,
        imageUrl: entity.imageUrl || "",
        labelTypeId: entity.labelType?.id || 0,
    }),
    toUpdateDto: (entity: Partial<Label>): UpdateLabelDto => ({
        menuItemId: entity.menuItem?.id || 0,
        imageUrl: entity.imageUrl || "",
        labelTypeId: entity.labelType?.id || 0,
    }),
};

// Context factory functions
const createLabelEditContext = (
    editInstance: Partial<Label> | null,
    setEditInstance: (instance: Partial<Label> | null) => void
): LabelEditContext => ({
    setMenuItem: (id: number | null) => {
        setEditInstance({ ...editInstance, menuItem: { id: id || 0 } as any });
    },
    setImageUrl: (url: string) => {
        setEditInstance({ ...editInstance, imageUrl: url });
    },
    setLabelType: (id: number | null) => {
        setEditInstance({ ...editInstance, labelType: { id: id || 0 } as any });
    },
});

const createLabelCreateContext = (
    createInstance: Partial<Label>,
    setCreateInstance: (instance: Partial<Label>) => void
): LabelCreateContext => ({
    setMenuItem: (id: number | null) => {
        setCreateInstance({
            ...createInstance,
            menuItem: { id: id || 0 } as any,
        });
    },
    setImageUrl: (url: string) => {
        setCreateInstance({ ...createInstance, imageUrl: url });
    },
    setLabelType: (id: number | null) => {
        setCreateInstance({
            ...createInstance,
            labelType: { id: id || 0 } as any,
        });
    },
});

// Entity-specific mutations hook
export function useLabelMutations() {
    return useEntityMutations<
        Label,
        CreateLabelDto,
        UpdateLabelDto,
        LabelEditContext,
        LabelCreateContext
    >({
        endpoint: "/labels",
        dtoConverter: labelDtoConverter,
        createEditContext: createLabelEditContext,
        createCreateContext: createLabelCreateContext,
    });
}
