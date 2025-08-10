import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateOrderContainerItemDto,
    OrderContainerItem,
    UpdateOrderContainerItemDto,
} from "../../entityTypes";

export const orderContainerItemDtoConverter = createNestedDtoConverter<
    OrderContainerItem,
    CreateOrderContainerItemDto,
    UpdateOrderContainerItemDto
>(OrderContainerItemToCreateDto, OrderContainerItemToUpdateDto);

function OrderContainerItemToCreateDto(
    entity: Partial<OrderContainerItem>
): CreateOrderContainerItemDto {
    return {
        parentOrderMenuItemId: entity.parentOrderItem?.id || 0,
        parentContainerMenuItemId: entity.parentOrderItem?.menuItem?.id || 0,
        containedMenuItemId: entity.containedItem?.id || 0,
        containedMenuItemSizeId: entity.containedItemSize?.id || 0,
        quantity: entity.quantity || 0,
    };
}

function OrderContainerItemToUpdateDto(
    originalEntity: Partial<OrderContainerItem>,
    editEntity: Partial<OrderContainerItem>
): UpdateOrderContainerItemDto {
    return {
        parentContainerMenuItemId: diffCheck(
            originalEntity.parentOrderItem?.menuItem?.id,
            editEntity.parentOrderItem?.menuItem.id
        ),

        containedMenuItemId: diffCheck(
            originalEntity.containedItem?.id,
            editEntity.containedItem?.id
        ),

        containedMenuItemSizeId: diffCheck(
            originalEntity.containedItemSize?.id,
            editEntity.containedItemSize?.id
        ),

        quantity: diffCheck(originalEntity.quantity, editEntity.quantity),
    };
}
