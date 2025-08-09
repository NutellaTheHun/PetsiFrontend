import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemContainerOptionsDto,
    MenuItemContainerOptions,
    NestedMenuItemContainerOptionsDto,
    UpdateMenuItemContainerOptionsDto,
} from "../../entityTypes";
import {
    ManyMenuItemContainerRuleToCreateDto,
    ManyMenuItemContainerRuleToNestedDto,
} from "./menuItemContainerRule.DtoConverter";

export const MenuItemContainerOptionsDtoConverter: DtoConverter<
    MenuItemContainerOptions,
    CreateMenuItemContainerOptionsDto,
    UpdateMenuItemContainerOptionsDto
> = {
    toCreateDto: MenuItemContainerOptionsToCreateDto,
    toUpdateDto: MenuItemContainerOptionsToUpdateDto,
};

export function MenuItemContainerOptionsToCreateDto(
    entity: Partial<MenuItemContainerOptions>
): CreateMenuItemContainerOptionsDto {
    return {
        parentContainerMenuItemId: entity.parentContainer?.id || 0,
        containerRuleDtos: ManyMenuItemContainerRuleToCreateDto(
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
    containerRuleDtos = ManyMenuItemContainerRuleToNestedDto(
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

export function MenuItemContainerOptionsToNestedDto(
    entity: Partial<MenuItemContainerOptions>,
    editEntity?: Partial<MenuItemContainerOptions>
): NestedMenuItemContainerOptionsDto {
    if (editEntity && entity.id) {
        return {
            mode: "update",
            id: entity.id,
            updateDto: MenuItemContainerOptionsToUpdateDto(entity, editEntity),
        };
    }
    return {
        mode: "create",
        createDto: MenuItemContainerOptionsToCreateDto(entity),
    };
}
