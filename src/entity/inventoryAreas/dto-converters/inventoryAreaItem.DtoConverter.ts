import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryAreaItemDto,
    InventoryAreaItem,
    NestedInventoryAreaItemDto,
    UpdateInventoryAreaItemDto,
} from "../../entityTypes";

export const InventoryAreaItemDtoConverter: DtoConverter<
    InventoryAreaItem,
    CreateInventoryAreaItemDto,
    UpdateInventoryAreaItemDto
> = {
    toCreateDto: InventoryAreaItemToCreateDto,
    toUpdateDto: InventoryAreaItemToUpdateDto,
};

function InventoryAreaItemToCreateDto(
    entity: Partial<InventoryAreaItem>
): CreateInventoryAreaItemDto {
    return {
        parentInventoryCountId: entity.parentInventoryCount?.id || 0,
        countedInventoryItemId: entity.countedItem?.id || 0,
        countedAmount: entity.amount || 0,
        countedItemSizeId: entity.countedItemSize?.id || 0,
        //countedItemSizeDto: , countedItemSizeToCreateDto()
    };
}

function InventoryAreaItemToUpdateDto(
    entity: Partial<InventoryAreaItem>,
    editEntity: Partial<InventoryAreaItem> // TODO diff update
): UpdateInventoryAreaItemDto {
    return {
        countedInventoryItemId: entity.countedItem?.id,
        countedAmount: entity.amount,
        countedItemSizeId: entity.countedItemSize?.id,
        //countedItemSizeDto: , countedItemSizeToCreateDto()
    };
}

export function ManyInventoryAreaItemToNestedDto(
    originalEntities: Partial<InventoryAreaItem>[],
    editEntities: Partial<InventoryAreaItem>[]
): NestedInventoryAreaItemDto[] {
    const result: NestedInventoryAreaItemDto[] = [];

    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: InventoryAreaItemToCreateDto(editEntity),
            });
        } else {
            const originalEntity = originalEntities.find(
                (id) => id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: InventoryAreaItemToUpdateDto(
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

export function ManyInventoryAreaItemToCreateDto(
    entities?: Partial<NestedInventoryAreaItemDto>[]
): CreateInventoryAreaItemDto[] | undefined {
    if (!entities) {
        return undefined;
    }
    const result: CreateInventoryAreaItemDto[] = [];
    for (const entity of entities) {
        result.push(InventoryAreaItemToCreateDto(entity));
    }
    return result;
}
