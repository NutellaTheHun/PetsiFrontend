import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckDtos,
} from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateOrderMenuItemDto,
    OrderMenuItem,
    UpdateOrderMenuItemDto,
} from "../../entityTypes";
import { orderContainerItemDtoConverter } from "./orderContainerItem.DtoConverter";

export const orderMenuItemDtoConverter = createNestedDtoConverter<
    OrderMenuItem,
    CreateOrderMenuItemDto,
    UpdateOrderMenuItemDto
>(OrderMenuItemToCreateDto, OrderMenuItemToUpdateDto);

function OrderMenuItemToCreateDto(
    entity: Partial<OrderMenuItem>
): CreateOrderMenuItemDto {
    let containerItems = null;
    if (entity.orderedContainerItems) {
        containerItems = orderContainerItemDtoConverter.toCreateMany(
            entity.orderedContainerItems
        );
    }
    return {
        orderId: entity.order?.id || 0,
        menuItemId: entity.menuItem?.id || 0,
        menuItemSizeId: entity.size?.id || 0,
        quantity: entity.quantity || 0,
        orderedItemContainerDtos: containerItems || undefined,
    };
}

function OrderMenuItemToUpdateDto(
    entity: Partial<OrderMenuItem>,
    editEntity: Partial<OrderMenuItem>
): UpdateOrderMenuItemDto {
    let containerItems = null;
    if (entity.orderedContainerItems && editEntity.orderedContainerItems) {
        containerItems = orderContainerItemDtoConverter.toNestedMany(
            entity.orderedContainerItems,
            editEntity.orderedContainerItems
        );
    }

    return {
        menuItemId: diffCheck(entity.menuItem?.id, editEntity.menuItem?.id),

        menuItemSizeId: diffCheck(entity.size?.id, editEntity.size?.id),

        quantity: diffCheck(entity.quantity, editEntity.quantity),

        orderedItemContainerDtos: diffCheckDtos(containerItems),
    };
}
