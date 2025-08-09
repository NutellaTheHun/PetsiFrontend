import { createNestedDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { createManyEntityToNestedDto } from "../../../lib/dtoConverters/manyEntityToNestedDto.factory";
import type {
    CreateOrderMenuItemDto,
    NestedOrderMenuItemDto,
    OrderMenuItem,
    UpdateOrderMenuItemDto,
} from "../../entityTypes";
import {
    ManyOrderContainerItemToCreateDto,
    ManyOrderContainerItemToNestedDto,
} from "./orderContainerItem.DtoConverter";

/*export const OrderMenuItemDtoConverter: DtoConverter<
    OrderMenuItem,
    CreateOrderMenuItemDto,
    UpdateOrderMenuItemDto
> = {
    toCreateDto: OrderMenuItemToCreateDto,
    toUpdateDto: OrderMenuItemToUpdateDto,
};*/

export const orderMenuItemDtoConverter = createNestedDtoConverter(
    OrderMenuItemToCreateDto,
    OrderMenuItemToUpdateDto
);

export const manyOrderMenuItemDtoConverter = createManyEntityToNestedDto<
    OrderMenuItem,
    CreateOrderMenuItemDto,
    UpdateOrderMenuItemDto,
    NestedOrderMenuItemDto
>(OrderMenuItemToCreateDto, OrderMenuItemToUpdateDto);

function OrderMenuItemToCreateDto(
    entity: Partial<OrderMenuItem>
): CreateOrderMenuItemDto {
    let containerItems = null;
    if (entity.orderedContainerItems) {
        containerItems = ManyOrderContainerItemToCreateDto(
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
    editEntity: Partial<OrderMenuItem> // TODO diff edit
): UpdateOrderMenuItemDto {
    let containerItems = null;
    if (entity.orderedContainerItems && editEntity.orderedContainerItems) {
        containerItems = ManyOrderContainerItemToNestedDto(
            entity.orderedContainerItems,
            editEntity.orderedContainerItems
        );
    }
    return {
        menuItemId: entity.menuItem?.id,
        menuItemSizeId: entity.size?.id,
        quantity: entity.quantity,
        orderedItemContainerDtos: containerItems || undefined,
    };
}
/*export function ManyOrderMenuItemToNestedDto(
    originalEntities: Partial<OrderMenuItem>[],
    editEntities: Partial<OrderMenuItem>[]
): NestedOrderMenuItemDto[] {
    const result: NestedOrderMenuItemDto[] = [];
    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: OrderMenuItemToCreateDto(editEntity),
            });
        } else {
            const originalEntity = originalEntities.find(
                (id) => id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: OrderMenuItemToUpdateDto(
                        originalEntity,
                        editEntity
                    ),
                });
            } else {
                throw Error(
                    "id of edited instance not found in original array"
                );
            }
        }
    }
    return result;
}

export function ManyOrderMenuItemToCreateDto(
    entities: Partial<OrderMenuItem>[]
): CreateOrderMenuItemDto[] {
    const result: CreateOrderMenuItemDto[] = [];
    for (const entity of entities) {
        result.push(OrderMenuItemToCreateDto(entity));
    }
    return result;
}*/
