import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import type { CreateOrderDto, Order, UpdateOrderDto } from "../../entityTypes";
import { orderMenuItemDtoConverter } from "./orderMenuItem.DtoConverter";

/*export const orderDtoConverter: DtoConverter<
    Order,
    CreateOrderDto,
    UpdateOrderDto
> = {
    toCreateDto: OrderToCreateDto,
    toUpdateDto: OrderToUpdateDto,
};*/

export const orderConverter = createDtoConverter<
    Order,
    CreateOrderDto,
    UpdateOrderDto
>(OrderToCreateDto, OrderToUpdateDto);

function OrderToCreateDto(entity: Partial<Order>): CreateOrderDto {
    return {
        orderCategoryId: entity.orderCategory?.id || 0,
        recipient: entity.recipient || "",
        fulfillmentDate: entity.fulfillmentDate || new Date().toISOString(),
        fulfillmentType: entity.fulfillmentType || "pickup",
        fulfillmentContactName: entity.fulfillmentContactName,
        deliveryAddress: entity.deliveryAddress,
        phoneNumber: entity.phoneNumber,
        email: entity.email,
        note: entity.note,
        isFrozen: entity.isFrozen || false,
        isWeekly: entity.isWeekly || false,
        weeklyFulfillment: entity.weeklyFulfillment,
        orderedMenuItemDtos: orderMenuItemDtoConverter.toManyCreateDto(
            entity.orderedItems || []
        ),
    };
}

function OrderToUpdateDto(
    entity: Partial<Order>,
    editEntity: Partial<Order> // TODO diff edit
): UpdateOrderDto {
    let orderedMenuItemDtos = null;
    orderedMenuItemDtos = orderMenuItemDtoConverter.toManyNestedDto(
        entity.orderedItems || [],
        editEntity.orderedItems || []
    );
    return {
        orderCategoryId: entity.orderCategory?.id,
        recipient: entity.recipient,
        fulfillmentDate: entity.fulfillmentDate,
        fulfillmentType: entity.fulfillmentType,
        fulfillmentContactName: entity.fulfillmentContactName,
        deliveryAddress: entity.deliveryAddress,
        phoneNumber: entity.phoneNumber,
        email: entity.email,
        note: entity.note,
        isFrozen: entity.isFrozen,
        isWeekly: entity.isWeekly,
        weeklyFulfillment: entity.weeklyFulfillment,
        orderedMenuItemDtos:
            orderedMenuItemDtos && orderedMenuItemDtos.length > 0
                ? orderedMenuItemDtos
                : undefined,
    };
}
