import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckDtos,
} from "../../../lib/dtoConverters/updatePropertyDiff";
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
    editEntity: Partial<MenuItemContainerOptions>
): UpdateMenuItemContainerOptionsDto {
    let containerRuleDtos = null;
    containerRuleDtos = menuItemContainerRuleDtoConverter.toNestedMany(
        entity.containerRules || [],
        editEntity.containerRules || []
    );

    return {
        containerRuleDtos: diffCheckDtos(containerRuleDtos),

        validQuantity: diffCheck(
            entity.validQuantity,
            editEntity.validQuantity
        ),
    };
}
