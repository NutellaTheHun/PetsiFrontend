import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateMenuItemSizeDto,
    MenuItemSize,
    UpdateMenuItemSizeDto,
} from "../../entityTypes";

export const MenuItemSizeDtoConverter: DtoConverter<
    MenuItemSize,
    CreateMenuItemSizeDto,
    UpdateMenuItemSizeDto
> = {
    toCreateDto: MenuItemSizeToCreateDto,
    toUpdateDto: MenuItemSizeToUpdateDto,
};

function MenuItemSizeToCreateDto(
    entity: Partial<MenuItemSize>
): CreateMenuItemSizeDto {
    return {
        sizeName: entity.name || "",
    };
}

function MenuItemSizeToUpdateDto(
    entity: Partial<MenuItemSize>,
    editEntity: Partial<MenuItemSize> // TODO diff edit
): UpdateMenuItemSizeDto {
    return {
        sizeName: entity.name || "",
    };
}
