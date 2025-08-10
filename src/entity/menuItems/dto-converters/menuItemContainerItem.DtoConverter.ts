import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
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
    editEntity: Partial<MenuItemContainerItem> // TODO diff edit
): UpdateMenuItemContainerItemDto {
    return {
        containedMenuItemId: entity.containedItem?.id || 0,
        containedMenuItemSizeId: entity.containedItemSize?.id || 0,
        quantity: entity.quantity || 0,
    };
}
