import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
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
    editEntity: Partial<UnitOfMeasure> // TODO diff edit
): UpdateUnitOfMeasureDto {
    return {
        unitName: entity.name || "",
        abbreviation: entity.abbreviation || "",
        categoryId: entity.category?.id || 0,
        conversionFactorToBase: entity.conversionFactorToBase || "",
    };
}
