import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type { CreateLabelDto, Label, UpdateLabelDto } from "../../entityTypes";

export const LabelDtoConverter: DtoConverter<
    Label,
    CreateLabelDto,
    UpdateLabelDto
> = {
    toCreateDto: LabelToCreateDto,
    toUpdateDto: LabelToUpdateDto,
};

function LabelToCreateDto(entity: Partial<Label>): CreateLabelDto {
    return {
        menuItemId: entity.menuItem?.id || 0,
        imageUrl: entity.imageUrl || "",
        labelTypeId: entity.labelType?.id || 0,
    };
}

function LabelToUpdateDto(
    entity: Partial<Label>,
    editEntity: Partial<Label> // TODO diff edit
): UpdateLabelDto {
    return {
        menuItemId: entity.menuItem?.id || 0,
        imageUrl: entity.imageUrl || "",
        labelTypeId: entity.labelType?.id || 0,
    };
}
