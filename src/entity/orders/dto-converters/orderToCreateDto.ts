import type { CreateOrderDto, Order } from "../../entityTypes";

export function OrderToCreateDto(entity: Order): CreateOrderDto {
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
        orderedMenuItemDtos: [], // TODO call OrderMenuItemsToCreateDto
    };
}
