import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateTemplateDto,
    Template,
    UpdateTemplateDto,
} from "../../entityTypes";

export const TemplateDtoConverter: DtoConverter<
    Template,
    CreateTemplateDto,
    UpdateTemplateDto
> = {
    toCreateDto: TemplateToCreateDto,
    toUpdateDto: TemplateToUpdateDto,
};

function TemplateToCreateDto(entity: Partial<Template>): CreateTemplateDto {
    return {
        templateName: entity.templateName || "",
        isPie: entity.isPie,
        templateItemDtos: [], // TemplateMenuItemsToCreateDtos()
    };
}

function TemplateToUpdateDto(
    entity: Partial<Template>,
    editEntity: Partial<Template> // TODO diff edit
): UpdateTemplateDto {
    return {
        templateName: entity.templateName || "",
        isPie: entity.isPie,
        templateItemDtos: [], // TemplateMenuItemsToNestedDtos()
    };
}
