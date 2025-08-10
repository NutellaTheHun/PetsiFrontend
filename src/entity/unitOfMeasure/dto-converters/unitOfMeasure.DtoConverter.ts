import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateUnitOfMeasureDto,
    UnitOfMeasure,
    UpdateUnitOfMeasureDto,
} from "../../entityTypes";

export const unitOfMeasureDtoConverter = createDtoConverter<
    UnitOfMeasure,
    CreateUnitOfMeasureDto,
    UpdateUnitOfMeasureDto
>(UnitOfMeasureToCreateDto, UnitOfMeasureToUpdateDto);

function UnitOfMeasureToCreateDto(
    entity: Partial<UnitOfMeasure>
): CreateUnitOfMeasureDto {
    return {
        unitName: entity.name || "",
        abbreviation: entity.abbreviation || "",
        categoryId: entity.category?.id || 0,
        conversionFactorToBase: entity.conversionFactorToBase || "",
    };
}

function UnitOfMeasureToUpdateDto(
    entity: Partial<UnitOfMeasure>,
    editEntity: Partial<UnitOfMeasure>
): UpdateUnitOfMeasureDto {
    return {
        unitName: diffCheck(entity.name, editEntity.name),

        abbreviation: diffCheck(entity.abbreviation, editEntity.abbreviation),

        categoryId: diffCheck(entity.category?.id, editEntity.category?.id),

        conversionFactorToBase: diffCheck(
            entity.conversionFactorToBase,
            editEntity.conversionFactorToBase
        ),
    };
}
