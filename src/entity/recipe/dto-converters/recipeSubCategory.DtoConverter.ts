import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeSubCategoryDto,
    NestedRecipeSubCategoryDto,
    RecipeSubCategory,
    UpdateRecipeSubCategoryDto,
} from "../../entityTypes";

export const RecipeSubCategoryDtoConverter: DtoConverter<
    RecipeSubCategory,
    CreateRecipeSubCategoryDto,
    UpdateRecipeSubCategoryDto
> = {
    toCreateDto: RecipeSubCategoryToCreateDto,
    toUpdateDto: RecipeSubCategoryToUpdateDto,
};

function RecipeSubCategoryToCreateDto(
    entity: Partial<RecipeSubCategory>
): CreateRecipeSubCategoryDto {
    return {
        subCategoryName: entity.subCategoryName || "",
        parentCategoryId: entity.parentCategory?.id || 0,
    };
}

function RecipeSubCategoryToUpdateDto(
    entity: Partial<RecipeSubCategory>,
    editEntity: Partial<RecipeSubCategory> // TODO diff edit
): UpdateRecipeSubCategoryDto {
    return {
        subCategoryName: entity.subCategoryName || "",
    };
}

export function ManyRecipeSubCategoryToNestedDto(
    originalEntities: Partial<RecipeSubCategory>[],
    editEntities: Partial<RecipeSubCategory>[]
): NestedRecipeSubCategoryDto[] {
    const result: NestedRecipeSubCategoryDto[] = [];
    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: RecipeSubCategoryToCreateDto(editEntity),
            });
        } else {
            const originalEntity = originalEntities.find(
                (id) => id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: RecipeSubCategoryToUpdateDto(
                        originalEntity,
                        editEntity
                    ),
                });
            } else {
                throw Error(
                    "id of edited instance not found in original array"
                );
            }
        }
    }
    return result;
}

export function ManyRecipeSubCategoryToCreateDto(
    entities: Partial<RecipeSubCategory>[]
): CreateRecipeSubCategoryDto[] {
    const result: CreateRecipeSubCategoryDto[] = [];
    for (const entity of entities) {
        result.push(RecipeSubCategoryToCreateDto(entity));
    }
    return result;
}
