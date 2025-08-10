import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import type {
    CreateMenuItemContainerOptionsDto,
    MenuItemContainerOptions,
    UpdateMenuItemContainerOptionsDto,
} from "../../entityTypes";
import { menuItemContainerRuleDtoConverter } from "./menuItemContainerRule.DtoConverter";

export const menuItemContainerOptionsDtoConverter = createNestedDtoConverter<
    MenuItemContainerOptions,
    CreateMenuItemContainerOptionsDto,
    UpdateMenuItemContainerOptionsDto
>(MenuItemContainerOptionsToCreateDto, MenuItemContainerOptionsToUpdateDto);

function MenuItemContainerOptionsToCreateDto(
    entity: Partial<MenuItemContainerOptions>
): CreateMenuItemContainerOptionsDto {
    return {
        parentContainerMenuItemId: entity.parentContainer?.id || 0,
        containerRuleDtos: menuItemContainerRuleDtoConverter.toCreateMany(
            entity.containerRules || []
        ),
        validQuantity: entity.validQuantity || 0,
    };
}

function MenuItemContainerOptionsToUpdateDto(
    entity: Partial<MenuItemContainerOptions>,
    editEntity: Partial<MenuItemContainerOptions> // TODO diff edit
): UpdateMenuItemContainerOptionsDto {
    let containerRuleDtos = null;
    containerRuleDtos = menuItemContainerRuleDtoConverter.toNestedMany(
        entity.containerRules || [],
        editEntity.containerRules || []
    );
    return {
        containerRuleDtos:
            containerRuleDtos && containerRuleDtos.length > 0
                ? containerRuleDtos
                : undefined,
        validQuantity: entity.validQuantity || 0,
    };
}
