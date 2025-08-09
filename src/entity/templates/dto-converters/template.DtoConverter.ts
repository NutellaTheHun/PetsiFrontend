import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateTemplateDto,
    Template,
    UpdateTemplateDto,
} from "../../entityTypes";
import {
    ManyTemplateMenuItemToCreateDto,
    ManyTemplateMenuItemToNestedDto,
} from "./templateMenuItem.DtoConverter";

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
        templateItemDtos: ManyTemplateMenuItemToCreateDto(
            entity.templateItems || []
        ),
    };
}

function TemplateToUpdateDto(
    entity: Partial<Template>,
    editEntity: Partial<Template> // TODO diff edit
): UpdateTemplateDto {
    let templateItemDtos = null;
    templateItemDtos = ManyTemplateMenuItemToNestedDto(
        entity.templateItems || [],
        editEntity.templateItems || []
    );
    return {
        templateName: entity.templateName || "",
        isPie: entity.isPie,
        templateItemDtos:
            templateItemDtos && templateItemDtos.length > 0
                ? templateItemDtos
                : undefined,
    };
}
