import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderMenuItemDto,
    NestedOrderMenuItemDto,
    OrderMenuItem,
    UpdateOrderMenuItemDto,
} from "../../entityTypes";

export const OrderMenuItemDtoConverter: DtoConverter<
    OrderMenuItem,
    CreateOrderMenuItemDto,
    UpdateOrderMenuItemDto
> = {
    toCreateDto: OrderMenuItemToCreateDto,
    toUpdateDto: OrderMenuItemToUpdateDto,
};

function OrderMenuItemToCreateDto(
    entity: Partial<OrderMenuItem>
): CreateOrderMenuItemDto {
    return {
        orderId: entity.order?.id || 0,
        menuItemId: entity.menuItem?.id || 0,
        menuItemSizeId: entity.size?.id || 0,
        quantity: entity.quantity || 0,
        orderedItemContainerDtos: [], // TODO call NESTED OrderContainerItemsToUpdateDto
    };
}

function OrderMenuItemToUpdateDto(
    originalEntity: Partial<OrderMenuItem>,
    editEntity: Partial<OrderMenuItem> // TODO diff edit
): UpdateOrderMenuItemDto {
    return {
        menuItemId: originalEntity.menuItem?.id,
        menuItemSizeId: originalEntity.size?.id,
        quantity: originalEntity.quantity,
        orderedItemContainerDtos: [], // TODO call NESTED OrderContainerItemsToUpdateDto
    };
}

export function ManyOrderMenuItemToNestedDto(
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
}
