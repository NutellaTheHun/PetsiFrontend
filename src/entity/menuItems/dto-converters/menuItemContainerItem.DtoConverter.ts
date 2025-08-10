import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateMenuItemContainerItemDto,
    MenuItemContainerItem,
    UpdateMenuItemContainerItemDto,
} from "../../entityTypes";

export const menuItemContainerItemDtoConverter = createNestedDtoConverter<
    MenuItemContainerItem,
    CreateMenuItemContainerItemDto,
    UpdateMenuItemContainerItemDto
>(MenuItemContainerItemToCreateDto, MenuItemContainerItemToUpdateDto);

function MenuItemContainerItemToCreateDto(
    entity: Partial<MenuItemContainerItem>
): CreateMenuItemContainerItemDto {
    return {
        parentContainerId: entity.parentContainer?.id || 0,
        parentContainerSizeId: entity.parentContainerSize?.id || 0,
        containedMenuItemId: entity.containedItem?.id || 0,
        containedMenuItemSizeId: entity.containedItemSize?.id || 0,
        quantity: entity.quantity || 0,
    };
}

function MenuItemContainerItemToUpdateDto(
    entity: Partial<MenuItemContainerItem>,
    editEntity: Partial<MenuItemContainerItem>
): UpdateMenuItemContainerItemDto {
    return {
        containedMenuItemId: diffCheck(
            entity.containedItem?.id,
            editEntity.containedItem?.id
        ),
        containedMenuItemSizeId: diffCheck(
            entity.containedItemSize?.id,
            editEntity.containedItemSize?.id
        ),
        quantity: diffCheck(entity.quantity, editEntity.quantity),
    };
}
