import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateUnitOfMeasureCategoryDto,
    UnitOfMeasureCategory,
    UpdateUnitOfMeasureCategoryDto,
} from "../../entityTypes";
import type { UnitOfMeasureCategoryRenderContext } from "../property-render/UnitOfMeasureCategory.render";

export type UnitOfMeasureCategoryEditContext = Pick<
    UnitOfMeasureCategoryRenderContext,
    "setCategoryName" | "setBaseConversionUnit"
>;

export type UnitOfMeasureCategoryCreateContext = Pick<
    UnitOfMeasureCategoryRenderContext,
    "setCategoryName" | "setBaseConversionUnit"
>;

// DTO converter for UnitOfMeasureCategory
const unitOfMeasureCategoryDtoConverter = {
    toCreateDto: (
        entity: Partial<UnitOfMeasureCategory>
    ): CreateUnitOfMeasureCategoryDto => ({
        categoryName: entity.categoryName || "",
    }),
    toUpdateDto: (
        entity: Partial<UnitOfMeasureCategory>
    ): UpdateUnitOfMeasureCategoryDto => ({
        categoryName: entity.categoryName || "",
    }),
};

// Context factory functions
const createUnitOfMeasureCategoryEditContext = (
    editInstance: Partial<UnitOfMeasureCategory> | null,
    setEditInstance: (instance: Partial<UnitOfMeasureCategory> | null) => void
): UnitOfMeasureCategoryEditContext => ({
    setCategoryName: (name: string) => {
        setEditInstance({ ...editInstance, categoryName: name });
    },
    setBaseConversionUnit: (unitOfMeasure: any | null) => {
        setEditInstance({ ...editInstance, baseConversionUnit: unitOfMeasure });
    },
});

const createUnitOfMeasureCategoryCreateContext = (
    createInstance: Partial<UnitOfMeasureCategory>,
    setCreateInstance: (instance: Partial<UnitOfMeasureCategory>) => void
): UnitOfMeasureCategoryCreateContext => ({
    setCategoryName: (name: string) => {
        setCreateInstance({ ...createInstance, categoryName: name });
    },
    setBaseConversionUnit: (unitOfMeasure: any | null) => {
        setCreateInstance({
            ...createInstance,
            baseConversionUnit: unitOfMeasure,
        });
    },
});

// Entity-specific mutations hook
export function useUnitOfMeasureCategoryMutations() {
    return useEntityMutations<
        UnitOfMeasureCategory,
        CreateUnitOfMeasureCategoryDto,
        UpdateUnitOfMeasureCategoryDto,
        UnitOfMeasureCategoryEditContext,
        UnitOfMeasureCategoryCreateContext
    >({
        endpoint: "/unit-of-measure-categories",
        dtoConverter: unitOfMeasureCategoryDtoConverter,
        createEditContext: createUnitOfMeasureCategoryEditContext,
        createCreateContext: createUnitOfMeasureCategoryCreateContext,
    });
}
