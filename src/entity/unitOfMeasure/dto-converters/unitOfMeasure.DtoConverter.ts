import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateUnitOfMeasureDto,
    UnitOfMeasure,
    UpdateUnitOfMeasureDto,
} from "../../entityTypes";

export const UnitOfMeasureDtoConverter: DtoConverter<
    UnitOfMeasure,
    CreateUnitOfMeasureDto,
    UpdateUnitOfMeasureDto
> = {
    toCreateDto: UnitOfMeasureToCreateDto,
    toUpdateDto: UnitOfMeasureToUpdateDto,
};

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
