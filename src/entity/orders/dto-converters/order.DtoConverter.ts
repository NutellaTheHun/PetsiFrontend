import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import {
    diffCheck,
    diffCheckDtos,
} from "../../../lib/dtoConverters/updatePropertyDiff";
import type { CreateOrderDto, Order, UpdateOrderDto } from "../../entityTypes";
import { orderMenuItemDtoConverter } from "./orderMenuItem.DtoConverter";

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
        orderedMenuItemDtos: orderMenuItemDtoConverter.toCreateMany(
            entity.orderedItems || []
        ),
    };
}

function OrderToUpdateDto(
    entity: Partial<Order>,
    editEntity: Partial<Order>
): UpdateOrderDto {
    let orderedMenuItemDtos = null;
    orderedMenuItemDtos = orderMenuItemDtoConverter.toNestedMany(
        entity.orderedItems || [],
        editEntity.orderedItems || []
    );

    return {
        orderCategoryId: diffCheck(
            entity.orderCategory?.id,
            editEntity.orderCategory?.id
        ),

        recipient: diffCheck(entity.recipient, editEntity.recipient),

        fulfillmentDate: diffCheck(
            entity.fulfillmentDate,
            editEntity.fulfillmentDate
        ),

        fulfillmentType: diffCheck(
            entity.fulfillmentType,
            editEntity.fulfillmentType
        ),

        fulfillmentContactName: diffCheck(
            entity.fulfillmentContactName,
            editEntity.fulfillmentContactName
        ),

        deliveryAddress: diffCheck(
            entity.deliveryAddress,
            editEntity.deliveryAddress
        ),

        phoneNumber: diffCheck(entity.phoneNumber, editEntity.phoneNumber),

        email: diffCheck(entity.email, editEntity.email),

        isFrozen: diffCheck(entity.isFrozen, editEntity.isFrozen),

        isWeekly: diffCheck(entity.isWeekly, editEntity.isWeekly),

        weeklyFulfillment: diffCheck(
            entity.weeklyFulfillment,
            editEntity.weeklyFulfillment
        ),

        orderedMenuItemDtos: diffCheckDtos(orderedMenuItemDtos),
    };
}
