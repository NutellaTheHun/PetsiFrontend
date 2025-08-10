import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckArray,
    diffCheckDtos,
} from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateMenuItemDto,
    MenuItem,
    UpdateMenuItemDto,
} from "../../entityTypes";
import { menuItemContainerItemDtoConverter } from "./menuItemContainerItem.DtoConverter";
import { menuItemContainerOptionsDtoConverter } from "./menuItemContainerOptions.DtoConverter";

export const menuItemDtoConverter = createDtoConverter<
    MenuItem,
    CreateMenuItemDto,
    UpdateMenuItemDto
>(MenuItemToCreateDto, MenuItemToUpdateDto);

function MenuItemToCreateDto(entity: Partial<MenuItem>): CreateMenuItemDto {
    let containerOptions = null;
    if (entity.containerOptions) {
        containerOptions = menuItemContainerOptionsDtoConverter.toCreate(
            entity.containerOptions
        );
    }

    let definedContainerItems = null;
    if (
        entity.definedContainerItems &&
        entity.definedContainerItems?.length > 0
    ) {
        definedContainerItems = menuItemContainerItemDtoConverter.toCreateMany(
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
    editEntity: Partial<MenuItem>
): UpdateMenuItemDto {
    let containerOptions = null;
    if (entity.containerOptions && editEntity.containerOptions) {
        containerOptions = menuItemContainerOptionsDtoConverter.toNested(
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
        definedContainerItems = menuItemContainerItemDtoConverter.toNestedMany(
            entity.definedContainerItems || [],
            editEntity.definedContainerItems || []
        );
    }

    return {
        categoryId: diffCheck(entity.category?.id, editEntity.category?.id),

        itemName: diffCheck(entity.itemName, editEntity.itemName),

        veganOptionMenuId: diffCheck(
            entity.veganOption?.id,
            editEntity.veganOption?.id
        ),

        takeNBakeOptionMenuId: diffCheck(
            entity.takeNBakeOption?.id,
            editEntity.takeNBakeOption?.id
        ),

        veganTakeNBakeOptionMenuId: diffCheck(
            entity.veganTakeNBakeOption?.id,
            editEntity.veganTakeNBakeOption?.id
        ),

        validSizeIds: diffCheckArray(
            entity.validSizes?.map((size) => size.id) || [],
            editEntity.validSizes?.map((size) => size.id) || []
        ),

        isPOTM: diffCheck(entity.isPOTM, editEntity.isPOTM),

        isParbake: diffCheck(entity.isParbake, editEntity.isParbake),

        definedContainerItemDtos: diffCheckDtos(definedContainerItems),

        containerOptionDto: containerOptions ? containerOptions : undefined,
    };
}
