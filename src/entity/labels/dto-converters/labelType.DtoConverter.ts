import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateLabelTypeDto,
    LabelType,
    UpdateLabelTypeDto,
} from "../../entityTypes";

export const labelTypeDtoConverter = createDtoConverter<
    LabelType,
    CreateLabelTypeDto,
    UpdateLabelTypeDto
>(LabelTypeToCreateDto, LabelTypeToUpdateDto);

function LabelTypeToCreateDto(entity: Partial<LabelType>): CreateLabelTypeDto {
    return {
        labelTypeName: entity.labelTypeName || "",
        labelTypeLength: entity.labelTypeLength || 0,
        labelTypeWidth: entity.labelTypeWidth || 0,
    };
}

function LabelTypeToUpdateDto(
    entity: Partial<LabelType>,
    editEntity: Partial<LabelType>
): UpdateLabelTypeDto {
    return {
        labelTypeName: diffCheck(
            entity.labelTypeName,
            editEntity.labelTypeName
        ),

        labelTypeLength: diffCheck(
            entity.labelTypeLength,
            editEntity.labelTypeLength
        ),

        labelTypeWidth: diffCheck(
            entity.labelTypeWidth,
            editEntity.labelTypeWidth
        ),
    };
}
