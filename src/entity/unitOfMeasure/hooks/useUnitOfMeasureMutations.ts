import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateUnitOfMeasureDto,
    UnitOfMeasure,
    UnitOfMeasureCategory,
    UpdateUnitOfMeasureDto,
} from "../../entityTypes";
import type { UnitOfMeasureRenderContext } from "../property-render/UnitOfMeasure.render";

export type UnitOfMeasureEditContext = Pick<
    UnitOfMeasureRenderContext,
    "setName" | "setAbbreviation" | "setCategory" | "setConversionFactorToBase"
>;

export type UnitOfMeasureCreateContext = Pick<
    UnitOfMeasureRenderContext,
    "setName" | "setAbbreviation" | "setCategory" | "setConversionFactorToBase"
>;

// DTO converter for UnitOfMeasure
const unitOfMeasureDtoConverter = {
    toCreateDto: (entity: Partial<UnitOfMeasure>): CreateUnitOfMeasureDto => ({
        unitName: entity.name || "",
        abbreviation: entity.abbreviation || "",
        categoryId: entity.category?.id || 0,
        conversionFactorToBase: entity.conversionFactorToBase,
    }),
    toUpdateDto: (entity: Partial<UnitOfMeasure>): UpdateUnitOfMeasureDto => ({
        unitName: entity.name,
        abbreviation: entity.abbreviation,
        categoryId: entity.category?.id ? {} : undefined,
        conversionFactorToBase: entity.conversionFactorToBase,
    }),
};

// Context factory functions
const createUnitOfMeasureEditContext = (
    editInstance: Partial<UnitOfMeasure> | null,
    setEditInstance: (instance: Partial<UnitOfMeasure> | null) => void
): UnitOfMeasureEditContext => ({
    setName: (name: string) => {
        setEditInstance({ ...editInstance, name });
    },
    setAbbreviation: (abbreviation: string) => {
        setEditInstance({ ...editInstance, abbreviation });
    },
    setCategory: (category: UnitOfMeasureCategory) => {
        setEditInstance({ ...editInstance, category });
    },
    setConversionFactorToBase: (conversionFactorToBase: string) => {
        setEditInstance({ ...editInstance, conversionFactorToBase });
    },
});

const createUnitOfMeasureCreateContext = (
    createInstance: Partial<UnitOfMeasure>,
    setCreateInstance: (instance: Partial<UnitOfMeasure>) => void
): UnitOfMeasureCreateContext => ({
    setName: (name: string) => {
        setCreateInstance({ ...createInstance, name });
    },
    setAbbreviation: (abbreviation: string) => {
        setCreateInstance({ ...createInstance, abbreviation });
    },
    setCategory: (category: UnitOfMeasureCategory) => {
        setCreateInstance({ ...createInstance, category });
    },
    setConversionFactorToBase: (conversionFactorToBase: string) => {
        setCreateInstance({ ...createInstance, conversionFactorToBase });
    },
});

// Entity-specific mutations hook
export function useUnitOfMeasureMutations() {
    return useEntityMutations<
        UnitOfMeasure,
        CreateUnitOfMeasureDto,
        UpdateUnitOfMeasureDto,
        UnitOfMeasureEditContext,
        UnitOfMeasureCreateContext
    >({
        endpoint: "/unit-of-measures",
        dtoConverter: unitOfMeasureDtoConverter,
        createEditContext: createUnitOfMeasureEditContext,
        createCreateContext: createUnitOfMeasureCreateContext,
    });
}
