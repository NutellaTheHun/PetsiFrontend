import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderContainerItemDto,
    OrderContainerItem,
    UpdateOrderContainerItemDto,
} from "../../entityTypes";

export const OrderContainerItemDtoConverter: DtoConverter<
    OrderContainerItem,
    CreateOrderContainerItemDto,
    UpdateOrderContainerItemDto
> = {
    toCreateDto: OrderContainerItemToCreateDto,
    toUpdateDto: OrderContainerItemToUpdateDto,
};

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
    editEntity: Partial<OrderContainerItem> // TODO diff edit
): UpdateOrderContainerItemDto {
    return {
        parentContainerMenuItemId: originalEntity.parentOrderItem?.menuItem?.id,
        containedMenuItemId: originalEntity.containedItem?.id,
        containedMenuItemSizeId: originalEntity.containedItemSize?.id,
        quantity: originalEntity.quantity,
    };
}
