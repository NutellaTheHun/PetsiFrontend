import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckArray,
} from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateMenuItemContainerRuleDto,
    MenuItemContainerRule,
    UpdateMenuItemContainerRuleDto,
} from "../../entityTypes";

export const menuItemContainerRuleDtoConverter = createNestedDtoConverter<
    MenuItemContainerRule,
    CreateMenuItemContainerRuleDto,
    UpdateMenuItemContainerRuleDto
>(MenuItemContainerRuleToCreateDto, MenuItemContainerRuleToUpdateDto);

function MenuItemContainerRuleToCreateDto(
    entity: Partial<MenuItemContainerRule>
): CreateMenuItemContainerRuleDto {
    return {
        parentContainerOptionsId: entity.parentContainerOption?.id || 0,
        validMenuItemId: entity.validItem?.id || 0,
        validSizeIds: entity.validSizes?.map((size) => size.id) || [],
    };
}

function MenuItemContainerRuleToUpdateDto(
    entity: Partial<MenuItemContainerRule>,
    editEntity: Partial<MenuItemContainerRule> // TODO diff edit
): UpdateMenuItemContainerRuleDto {
    return {
        validMenuItemId: diffCheck(
            entity.validItem?.id,
            editEntity.validItem?.id
        ),
        validSizeIds: diffCheckArray(
            entity.validSizes?.map((size) => size.id) || [],
            editEntity.validSizes?.map((size) => size.id) || []
        ),
    };
}
