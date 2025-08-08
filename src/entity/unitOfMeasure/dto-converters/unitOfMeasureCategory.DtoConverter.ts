import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateUnitOfMeasureCategoryDto,
    UnitOfMeasureCategory,
    UpdateUnitOfMeasureCategoryDto,
} from "../../entityTypes";

export const UnitOfMeasureCategoryDtoConverter: DtoConverter<
    UnitOfMeasureCategory,
    CreateUnitOfMeasureCategoryDto,
    UpdateUnitOfMeasureCategoryDto
> = {
    toCreateDto: UnitOfMeasureCategoryToCreateDto,
    toUpdateDto: UnitOfMeasureCategoryToUpdateDto,
};

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
