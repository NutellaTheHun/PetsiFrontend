import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemContainerOptionsDto,
    MenuItemContainerOptions,
    NestedMenuItemContainerOptionsDto,
    UpdateMenuItemContainerOptionsDto,
} from "../../entityTypes";

export const MenuItemContainerOptionsDtoConverter: DtoConverter<
    MenuItemContainerOptions,
    CreateMenuItemContainerOptionsDto,
    UpdateMenuItemContainerOptionsDto
> = {
    toCreateDto: MenuItemContainerOptionsToCreateDto,
    toUpdateDto: MenuItemContainerOptionsToUpdateDto,
};

function MenuItemContainerOptionsToCreateDto(
    entity: Partial<MenuItemContainerOptions>
): CreateMenuItemContainerOptionsDto {
    return {
        parentContainerMenuItemId: entity.parentContainer?.id || 0,
        containerRuleDtos: [], // MenuItemContainerRulesToNestedDtos()
        validQuantity: entity.validQuantity || 0,
    };
}

function MenuItemContainerOptionsToUpdateDto(
    entity: Partial<MenuItemContainerOptions>,
    editEntity: Partial<MenuItemContainerOptions> // TODO diff edit
): UpdateMenuItemContainerOptionsDto {
    return {
        containerRuleDtos: [], // MenuItemContainerRulesToNestedDtos()
        validQuantity: entity.validQuantity || 0,
    };
}

export function ManyOrderMenuItemToNestedDto(
    originalEntities: Partial<MenuItemContainerOptions>[],
    editEntities: Partial<MenuItemContainerOptions>[]
): NestedMenuItemContainerOptionsDto[] {
    const result: NestedMenuItemContainerOptionsDto[] = [];
    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: MenuItemContainerOptionsToCreateDto(editEntity),
            });
        } else {
            const originalEntity = originalEntities.find(
                (id) => id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: MenuItemContainerOptionsToUpdateDto(
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
    entities: Partial<MenuItemContainerOptions>[]
): CreateMenuItemContainerOptionsDto[] {
    const result: CreateMenuItemContainerOptionsDto[] = [];
    for (const entity of entities) {
        result.push(MenuItemContainerOptionsToCreateDto(entity));
    }
    return result;
}
