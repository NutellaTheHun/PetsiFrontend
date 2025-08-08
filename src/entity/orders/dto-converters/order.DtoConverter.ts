import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type { CreateOrderDto, Order, UpdateOrderDto } from "../../entityTypes";

export const orderDtoConverter: DtoConverter<
    Order,
    CreateOrderDto,
    UpdateOrderDto
> = {
    toCreateDto: OrderToCreateDto,
    toUpdateDto: OrderToUpdateDto,
};

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
        orderedMenuItemDtos: [], // TODO call NESTED OrderMenuItemsToCreateDto
    };
}

function OrderToUpdateDto(
    originalEntity: Partial<Order>,
    editEntity: Partial<Order> // TODO diff edit
): UpdateOrderDto {
    return {
        orderCategoryId: originalEntity.orderCategory?.id,
        recipient: originalEntity.recipient,
        fulfillmentDate: originalEntity.fulfillmentDate,
        fulfillmentType: originalEntity.fulfillmentType,
        fulfillmentContactName: originalEntity.fulfillmentContactName,
        deliveryAddress: originalEntity.deliveryAddress,
        phoneNumber: originalEntity.phoneNumber,
        email: originalEntity.email,
        note: originalEntity.note,
        isFrozen: originalEntity.isFrozen,
        isWeekly: originalEntity.isWeekly,
        weeklyFulfillment: originalEntity.weeklyFulfillment,
        //orderedMenuItemDtos: TODO call NESTED OrderMenuItemsToUpdateDto
    };
}
