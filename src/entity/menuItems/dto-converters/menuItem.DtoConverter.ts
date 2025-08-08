import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type { MenuItem, CreateMenuItemDto, UpdateMenuItemDto } from "../../entityTypes";

export const MenuItemDtoConverter: DtoConverter<
    MenuItem,
    CreateMenuItemDto,
    UpdateMenuItemDto
> = {
    toCreateDto: MenuItemToCreateDto,
    toUpdateDto: MenuItemToUpdateDto,
};

function MenuItemToCreateDto(
    entity: Partial<MenuItem>
): CreateMenuItemDto {
    return {
        categoryId: entity.category?.id || 0,
        itemName: entity.itemName || "",
        veganOptionMenuId: entity.veganOption?.id || 0,
        takeNBakeOptionMenuId: entity.takeNBakeOption?.id || 0,
        veganTakeNBakeOptionMenuId: entity.veganTakeNBakeOption?.id || 0,
        validSizeIds: entity.validSizes?.map((size) => size.id) || [],
        isPOTM: entity.isPOTM,
        isParbake: entity.isParbake,
        definedContainerItemDtos: [] //ManyMenuItemContainerItemToNestedDtos(),
        containerOptionDto: , // MenuItemContainerOptionToNestedDto
    };
}

function MenuItemToUpdateDto(
    entity: Partial<MenuItem>,
    editEntity: Partial<MenuItem> // TODO diff edit
): UpdateMenuItemDto {
    return {
        categoryId: entity.category?.id || 0,
        itemName: entity.itemName || "",
        veganOptionMenuId: entity.veganOption?.id || 0,
        takeNBakeOptionMenuId: entity.takeNBakeOption?.id || 0,
        veganTakeNBakeOptionMenuId: entity.veganTakeNBakeOption?.id || 0,
        validSizeIds: entity.validSizes?.map((size) => size.id) || [],
        isPOTM: entity.isPOTM,
        isParbake: entity.isParbake,
        definedContainerItemDtos: [] //ManyMenuItemContainerItemToNestedDtos(),
        //containerOptionDto: , // MenuItemContainerOptionToNestedDto
    };
}