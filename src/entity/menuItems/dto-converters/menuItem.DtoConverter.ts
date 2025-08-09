import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemDto,
    MenuItem,
    UpdateMenuItemDto,
} from "../../entityTypes";
import {
    ManyMenuItemContainerItemToCreateDto,
    ManyMenuItemContainerItemToNestedDto,
} from "./menuItemContainerItem.DtoConverter";
import {
    MenuItemContainerOptionsToCreateDto,
    MenuItemContainerOptionsToNestedDto,
} from "./menuItemContainerOptions.DtoConverter";

export const MenuItemDtoConverter: DtoConverter<
    MenuItem,
    CreateMenuItemDto,
    UpdateMenuItemDto
> = {
    toCreateDto: MenuItemToCreateDto,
    toUpdateDto: MenuItemToUpdateDto,
};

function MenuItemToCreateDto(entity: Partial<MenuItem>): CreateMenuItemDto {
    let containerOptions = null;
    if (entity.containerOptions) {
        containerOptions = MenuItemContainerOptionsToCreateDto(
            entity.containerOptions
        );
    }

    let definedContainerItems = null;
    if (
        entity.definedContainerItems &&
        entity.definedContainerItems?.length > 0
    ) {
        definedContainerItems = ManyMenuItemContainerItemToCreateDto(
            entity.definedContainerItems || []
        );
    }

    return {
        categoryId: entity.category?.id || 0,
        itemName: entity.itemName || "",
        veganOptionMenuId: entity.veganOption?.id || undefined,
        takeNBakeOptionMenuId: entity.takeNBakeOption?.id || undefined,
        veganTakeNBakeOptionMenuId:
            entity.veganTakeNBakeOption?.id || undefined,
        validSizeIds: entity.validSizes?.map((size) => size.id) || [],
        isPOTM: entity.isPOTM,
        isParbake: entity.isParbake,
        definedContainerItemDtos:
            definedContainerItems && definedContainerItems.length > 0
                ? definedContainerItems
                : undefined,
        containerOptionDto: containerOptions || undefined,
    };
}

function MenuItemToUpdateDto(
    entity: Partial<MenuItem>,
    editEntity: Partial<MenuItem> // TODO diff edit
): UpdateMenuItemDto {
    let containerOptions = null;
    if (entity.containerOptions && editEntity.containerOptions) {
        containerOptions = MenuItemContainerOptionsToNestedDto(
            entity.containerOptions,
            editEntity.containerOptions
        );
    }

    let definedContainerItems = null;
    if (
        entity.definedContainerItems &&
        editEntity.definedContainerItems &&
        (entity.definedContainerItems?.length > 0 ||
            editEntity.definedContainerItems?.length > 0)
    ) {
        definedContainerItems = ManyMenuItemContainerItemToNestedDto(
            entity.definedContainerItems || [],
            editEntity.definedContainerItems || []
        );
    }

    return {
        categoryId: entity.category?.id || 0,
        itemName: entity.itemName || "",
        veganOptionMenuId: entity.veganOption?.id || undefined,
        takeNBakeOptionMenuId: entity.takeNBakeOption?.id || undefined,
        veganTakeNBakeOptionMenuId:
            entity.veganTakeNBakeOption?.id || undefined,
        validSizeIds: entity.validSizes?.map((size) => size.id) || [],
        isPOTM: entity.isPOTM,
        isParbake: entity.isParbake,
        definedContainerItemDtos:
            definedContainerItems && definedContainerItems.length > 0
                ? definedContainerItems
                : undefined,
        containerOptionDto: containerOptions || undefined,
    };
}
