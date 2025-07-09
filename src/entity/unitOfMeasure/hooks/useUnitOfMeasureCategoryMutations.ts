import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateUnitOfMeasureCategoryDto,
    UnitOfMeasureCategory,
    UpdateUnitOfMeasureCategoryDto,
} from "../../entityTypes";

export type UnitOfMeasureCategoryEditContext = {
    setCategoryName: (name: string) => void;
};

export type UnitOfMeasureCategoryCreateContext = {
    setCategoryName: (name: string) => void;
};

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
});

const createUnitOfMeasureCategoryCreateContext = (
    createInstance: Partial<UnitOfMeasureCategory>,
    setCreateInstance: (instance: Partial<UnitOfMeasureCategory>) => void
): UnitOfMeasureCategoryCreateContext => ({
    setCategoryName: (name: string) => {
        setCreateInstance({ ...createInstance, categoryName: name });
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
