import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type { CreateLabelDto, Label, UpdateLabelDto } from "../../entityTypes";

export const labelDtoConverter = createDtoConverter<
    Label,
    CreateLabelDto,
    UpdateLabelDto
>(LabelToCreateDto, LabelToUpdateDto);

function LabelToCreateDto(entity: Partial<Label>): CreateLabelDto {
    return {
        menuItemId: entity.menuItem?.id || 0,
        imageUrl: entity.imageUrl || "",
        labelTypeId: entity.labelType?.id || 0,
    };
}

function LabelToUpdateDto(
    entity: Partial<Label>,
    editEntity: Partial<Label>
): UpdateLabelDto {
    return {
        menuItemId: diffCheck(entity.menuItem?.id, editEntity.menuItem?.id),
        imageUrl: diffCheck(entity.imageUrl, editEntity.imageUrl),
        labelTypeId: diffCheck(entity.labelType?.id, editEntity.labelType?.id),
    };
}
