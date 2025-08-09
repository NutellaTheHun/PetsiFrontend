import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderContainerItemDto,
    NestedOrderContainerItemDto,
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

export function ManyOrderContainerItemToNestedDto(
    entities: Partial<OrderContainerItem>[],
    editEntities: Partial<OrderContainerItem>[]
): NestedOrderContainerItemDto[] {
    const result: NestedOrderContainerItemDto[] = [];
    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: OrderContainerItemToCreateDto(editEntity),
            });
        } else {
            const originalEntity = entities.find((id) => id === editEntity.id);
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: OrderContainerItemToUpdateDto(
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

export function ManyOrderContainerItemToCreateDto(
    entities: Partial<OrderContainerItem>[]
): CreateOrderContainerItemDto[] {
    const result: CreateOrderContainerItemDto[] = [];
    for (const entity of entities) {
        result.push(OrderContainerItemToCreateDto(entity));
    }
    return result;
}
