import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemContainerItemDto,
    MenuItemContainerItem,
    NestedMenuItemContainerItemDto,
    UpdateMenuItemContainerItemDto,
} from "../../entityTypes";

export const MenuItemContainerItemDtoConverter: DtoConverter<
    MenuItemContainerItem,
    CreateMenuItemContainerItemDto,
    UpdateMenuItemContainerItemDto
> = {
    toCreateDto: MenuItemContainerItemToCreateDto,
    toUpdateDto: MenuItemContainerItemToUpdateDto,
};

function MenuItemContainerItemToCreateDto(
    entity: Partial<MenuItemContainerItem>
): CreateMenuItemContainerItemDto {
    return {
        parentContainerId: entity.parentContainer?.id || 0,
        parentContainerSizeId: entity.parentContainerSize?.id || 0,
        containedMenuItemId: entity.containedItem?.id || 0,
        containedMenuItemSizeId: entity.containedItemSize?.id || 0,
        quantity: entity.quantity || 0,
    };
}

function MenuItemContainerItemToUpdateDto(
    entity: Partial<MenuItemContainerItem>,
    editEntity: Partial<MenuItemContainerItem> // TODO diff edit
): UpdateMenuItemContainerItemDto {
    return {
        containedMenuItemId: entity.containedItem?.id || 0,
        containedMenuItemSizeId: entity.containedItemSize?.id || 0,
        quantity: entity.quantity || 0,
    };
}

export function ManyMenuItemContainerItemToNestedDto(
    originalEntities: Partial<MenuItemContainerItem>[],
    editEntities: Partial<MenuItemContainerItem>[]
): NestedMenuItemContainerItemDto[] {
    const result: NestedMenuItemContainerItemDto[] = [];
    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: MenuItemContainerItemToCreateDto(editEntity),
            });
        } else {
            const originalEntity = originalEntities.find(
                (id) => id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: MenuItemContainerItemToUpdateDto(
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

export function ManyMenuItemContainerItemToCreateDto(
    entities: Partial<MenuItemContainerItem>[]
): CreateMenuItemContainerItemDto[] {
    const result: CreateMenuItemContainerItemDto[] = [];
    for (const entity of entities) {
        result.push(MenuItemContainerItemToCreateDto(entity));
    }
    return result;
}
