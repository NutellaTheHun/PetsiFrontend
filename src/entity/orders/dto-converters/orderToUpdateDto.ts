import type { Order, UpdateOrderDto } from "../../entityTypes";

export function OrderToUpdateDto(entity: Order): UpdateOrderDto {
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
        //orderedMenuItemDtos: TODO call OrderMenuItemsToUpdateDto
    };
}
