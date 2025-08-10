import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckDtos,
} from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateTemplateDto,
    Template,
    UpdateTemplateDto,
} from "../../entityTypes";
import { templateMenuItemDtoConverter } from "./templateMenuItem.DtoConverter";

export const templateDtoConverter = createDtoConverter<
    Template,
    CreateTemplateDto,
    UpdateTemplateDto
>(TemplateToCreateDto, TemplateToUpdateDto);

function TemplateToCreateDto(entity: Partial<Template>): CreateTemplateDto {
    return {
        templateName: entity.templateName || "",
        isPie: entity.isPie,
        templateItemDtos: templateMenuItemDtoConverter.toCreateMany(
            entity.templateItems || []
        ),
    };
}

function TemplateToUpdateDto(
    entity: Partial<Template>,
    editEntity: Partial<Template> // TODO diff edit
): UpdateTemplateDto {
    let templateItemDtos = null;
    templateItemDtos = templateMenuItemDtoConverter.toNestedMany(
        entity.templateItems || [],
        editEntity.templateItems || []
    );
    return {
        templateName: diffCheck(entity.templateName, editEntity.templateName),
        isPie: diffCheck(entity.isPie, editEntity.isPie),
        templateItemDtos: diffCheckDtos(templateItemDtos),
    };
}
