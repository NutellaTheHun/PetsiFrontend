import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateInventoryItemSizeDto,
    InventoryItemSize,
    NestedInventoryItemSizeDto,
    UpdateInventoryItemSizeDto,
} from "../../entityTypes";

export const InventoryItemSizeDtoConverter: DtoConverter<
    InventoryItemSize,
    CreateInventoryItemSizeDto,
    UpdateInventoryItemSizeDto
> = {
    toCreateDto: InventoryItemSizeToCreateDto,
    toUpdateDto: InventoryItemSizeToUpdateDto,
};

export function InventoryItemSizeToCreateDto(
    entity: Partial<InventoryItemSize>
): CreateInventoryItemSizeDto {
    return {
        inventoryItemId: entity.inventoryItem?.id || 0,
        measureUnitId: entity.measureUnit?.id || 0,
        measureAmount: entity.measureAmount || 0,
        inventoryPackageId: entity.packageType?.id || 0,
        cost: Number(entity?.cost) || 0,
    };
}

export function InventoryItemSizeToUpdateDto(
    entity: Partial<InventoryItemSize>,
    editEntity: Partial<InventoryItemSize> // TODO diff edit
): UpdateInventoryItemSizeDto {
    return {
        measureUnitId: entity.measureUnit?.id || 0,
        measureAmount: entity.measureAmount || 0,
        inventoryPackageId: entity.packageType?.id || 0,
        cost: Number(entity?.cost) || 0,
    };
}

export function InventoryItemSizeToNestedDto(
    entity: Partial<InventoryItemSize>,
    editEntity?: Partial<InventoryItemSize>
): NestedInventoryItemSizeDto {
    if (entity.id && editEntity) {
        return {
            mode: "update", // DIFF?
            id: entity.id,
            updateDto: InventoryItemSizeToUpdateDto(entity, editEntity),
        };
    } else {
        return {
            mode: "create",
            createDto: InventoryItemSizeToCreateDto(entity),
        };
    }
}

export function ManyInventoryItemSizeToCreateDto(
    entities: Partial<InventoryItemSize>[]
): CreateInventoryItemSizeDto[] {
    const result: CreateInventoryItemSizeDto[] = [];
    for (const entity of entities) {
        result.push(InventoryItemSizeToCreateDto(entity));
    }
    return result;
}

export function ManyInventoryItemSizeToNestedDto(
    originalEntities: Partial<InventoryItemSize>[],
    editEntities: Partial<InventoryItemSize>[]
): NestedInventoryItemSizeDto[] {
    const result: NestedInventoryItemSizeDto[] = [];
    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: InventoryItemSizeToCreateDto(editEntity),
            });
        } else {
            const originalEntity = originalEntities.find(
                (id) => id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: InventoryItemSizeToUpdateDto(
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
