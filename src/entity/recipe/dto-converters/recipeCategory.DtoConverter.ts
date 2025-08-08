import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateRecipeCategoryDto,
    RecipeCategory,
    UpdateRecipeCategoryDto,
} from "../../entityTypes";

export const RecipeCategoryDtoConverter: DtoConverter<
    RecipeCategory,
    CreateRecipeCategoryDto,
    UpdateRecipeCategoryDto
> = {
    toCreateDto: RecipeCategoryToCreateDto,
    toUpdateDto: RecipeCategoryToUpdateDto,
};

function RecipeCategoryToCreateDto(
    entity: Partial<RecipeCategory>
): CreateRecipeCategoryDto {
    return {
        categoryName: entity.categoryName || "",
        subCategoryDtos: [], // RecipeSubCategoryToCreateDtos()
    };
}

function RecipeCategoryToUpdateDto(
    entity: Partial<RecipeCategory>,
    editEntity: Partial<RecipeCategory> // TODO diff edit
): UpdateRecipeCategoryDto {
    return {
        categoryName: entity.categoryName || "",
        subCategoryDtos: [], // RecipeSubCategoryToNestedDtos()
    };
}
