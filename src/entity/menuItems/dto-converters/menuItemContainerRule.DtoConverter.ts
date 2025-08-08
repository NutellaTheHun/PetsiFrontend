import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemContainerRuleDto,
    MenuItemContainerRule,
    NestedMenuItemContainerRuleDto,
    UpdateMenuItemContainerRuleDto,
} from "../../entityTypes";

export const MenuItemContainerRuleDtoConverter: DtoConverter<
    MenuItemContainerRule,
    CreateMenuItemContainerRuleDto,
    UpdateMenuItemContainerRuleDto
> = {
    toCreateDto: MenuItemContainerRuleToCreateDto,
    toUpdateDto: MenuItemContainerRuleToUpdateDto,
};

function MenuItemContainerRuleToCreateDto(
    entity: Partial<MenuItemContainerRule>
): CreateMenuItemContainerRuleDto {
    return {
        parentContainerOptionsId: entity.parentContainerOption?.id || 0,
        validMenuItemId: entity.validItem?.id || 0,
        validSizeIds: entity.validSizes?.map((size) => size.id) || [],
    };
}

function MenuItemContainerRuleToUpdateDto(
    entity: Partial<MenuItemContainerRule>,
    editEntity: Partial<MenuItemContainerRule> // TODO diff edit
): UpdateMenuItemContainerRuleDto {
    return {
        validMenuItemId: entity.validItem?.id || 0,
        validSizeIds: entity.validSizes?.map((size) => size.id) || [],
    };
}

export function ManyOrderMenuItemToNestedDto(
    originalEntities: Partial<MenuItemContainerRule>[],
    editEntities: Partial<MenuItemContainerRule>[]
): NestedMenuItemContainerRuleDto[] {
    const result: NestedMenuItemContainerRuleDto[] = [];
    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: MenuItemContainerRuleToCreateDto(editEntity),
            });
        } else {
            const originalEntity = originalEntities.find(
                (id) => id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: MenuItemContainerRuleToUpdateDto(
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
    entities: Partial<MenuItemContainerRule>[]
): CreateMenuItemContainerRuleDto[] {
    const result: CreateMenuItemContainerRuleDto[] = [];
    for (const entity of entities) {
        result.push(MenuItemContainerRuleToCreateDto(entity));
    }
    return result;
}
