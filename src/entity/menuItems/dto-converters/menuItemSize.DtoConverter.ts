import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateMenuItemSizeDto,
    MenuItemSize,
    UpdateMenuItemSizeDto,
} from "../../entityTypes";

export const menuItemSizeDtoConverter = createDtoConverter<
    MenuItemSize,
    CreateMenuItemSizeDto,
    UpdateMenuItemSizeDto
>(MenuItemSizeToCreateDto, MenuItemSizeToUpdateDto);

function MenuItemSizeToCreateDto(
    entity: Partial<MenuItemSize>
): CreateMenuItemSizeDto {
    return {
        sizeName: entity.name || "",
    };
}

function MenuItemSizeToUpdateDto(
    entity: Partial<MenuItemSize>,
    editEntity: Partial<MenuItemSize>
): UpdateMenuItemSizeDto {
    return {
        sizeName: diffCheck(entity.name, editEntity.name),
    };
}
