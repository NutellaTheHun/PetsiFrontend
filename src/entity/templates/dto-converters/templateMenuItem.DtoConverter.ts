import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateTemplateMenuItemDto,
    NestedTemplateMenuItemDto,
    TemplateMenuItem,
    UpdateTemplateMenuItemDto,
} from "../../entityTypes";

export const TemplateMenuItemDtoConverter: DtoConverter<
    TemplateMenuItem,
    CreateTemplateMenuItemDto,
    UpdateTemplateMenuItemDto
> = {
    toCreateDto: TemplateMenuItemToCreateDto,
    toUpdateDto: TemplateMenuItemToUpdateDto,
};

function TemplateMenuItemToCreateDto(
    entity: Partial<TemplateMenuItem>
): CreateTemplateMenuItemDto {
    return {
        displayName: entity.displayName || "",
        menuItemId: entity.menuItem?.id || 0,
        tablePosIndex: entity.tablePosIndex || 0,
        templateId: entity.parentTemplate?.id || 0,
    };
}

function TemplateMenuItemToUpdateDto(
    entity: Partial<TemplateMenuItem>,
    editEntity: Partial<TemplateMenuItem> // TODO diff edit
): UpdateTemplateMenuItemDto {
    return {
        displayName: entity.displayName || "",
        menuItemId: entity.menuItem?.id || 0,
        tablePosIndex: entity.tablePosIndex || 0,
        templateId: entity.parentTemplate?.id || 0,
    };
}

export function ManyTemplateMenuItemToNestedDto(
    originalEntities: Partial<TemplateMenuItem>[],
    editEntities: Partial<TemplateMenuItem>[]
): NestedTemplateMenuItemDto[] {
    const result: NestedTemplateMenuItemDto[] = [];
    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: TemplateMenuItemToCreateDto(editEntity),
            });
        } else {
            const originalEntity = originalEntities.find(
                (id) => id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: TemplateMenuItemToUpdateDto(
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

export function ManyTemplateMenuItemToCreateDto(
    entities: Partial<TemplateMenuItem>[]
): CreateTemplateMenuItemDto[] {
    const result: CreateTemplateMenuItemDto[] = [];
    for (const entity of entities) {
        result.push(TemplateMenuItemToCreateDto(entity));
    }
    return result;
}
