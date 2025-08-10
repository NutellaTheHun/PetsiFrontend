import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import type {
    CreateUnitOfMeasureCategoryDto,
    UnitOfMeasureCategory,
    UpdateUnitOfMeasureCategoryDto,
} from "../../entityTypes";

export const unitOfMeasureCategoryDtoConverter = createDtoConverter<
    UnitOfMeasureCategory,
    CreateUnitOfMeasureCategoryDto,
    UpdateUnitOfMeasureCategoryDto
>(UnitOfMeasureCategoryToCreateDto, UnitOfMeasureCategoryToUpdateDto);

function UnitOfMeasureCategoryToCreateDto(
    entity: Partial<UnitOfMeasureCategory>
): CreateUnitOfMeasureCategoryDto {
    return {
        categoryName: entity.categoryName || "",
        baseUnitId: entity.baseConversionUnit?.id || 0,
    };
}

function UnitOfMeasureCategoryToUpdateDto(
    entity: Partial<UnitOfMeasureCategory>,
    editEntity: Partial<UnitOfMeasureCategory> // TODO diff edit
): UpdateUnitOfMeasureCategoryDto {
    return {
        categoryName: entity.categoryName || "",
        baseUnitId: entity.baseConversionUnit?.id || 0,
    };
}
