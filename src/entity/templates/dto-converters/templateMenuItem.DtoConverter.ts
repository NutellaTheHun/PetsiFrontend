import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateTemplateMenuItemDto,
    TemplateMenuItem,
    UpdateTemplateMenuItemDto,
} from "../../entityTypes";

export const templateMenuItemDtoConverter = createNestedDtoConverter<
    TemplateMenuItem,
    CreateTemplateMenuItemDto,
    UpdateTemplateMenuItemDto
>(TemplateMenuItemToCreateDto, TemplateMenuItemToUpdateDto);

function TemplateMenuItemToCreateDto(
    entity: Partial<TemplateMenuItem>
): CreateTemplateMenuItemDto {
    return {
        displayName: entity.displayName || "",
        menuItemId: entity.menuItem?.id || 0,
        tablePosIndex: entity.tablePosIndex || 0,
        templateId: entity.parentTemplate?.id || 0,
    };
}

function TemplateMenuItemToUpdateDto(
    entity: Partial<TemplateMenuItem>,
    editEntity: Partial<TemplateMenuItem> // TODO diff edit
): UpdateTemplateMenuItemDto {
    return {
        displayName: diffCheck(entity.displayName, editEntity.displayName),

        menuItemId: diffCheck(entity.menuItem?.id, editEntity.menuItem?.id),

        tablePosIndex: diffCheck(
            entity.tablePosIndex,
            editEntity.tablePosIndex
        ),

        templateId: diffCheck(
            entity.parentTemplate?.id,
            editEntity.parentTemplate?.id
        ),
    };
}
