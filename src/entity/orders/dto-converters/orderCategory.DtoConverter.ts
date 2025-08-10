import { createDtoConverter } from "../../../lib/dtoConverters/dtoConverter.factory";
import { diffCheck } from "../../../lib/dtoConverters/updatePropertyDiff";
import type {
    CreateOrderCategoryDto,
    OrderCategory,
    UpdateOrderCategoryDto,
} from "../../entityTypes";

export const orderCategoryDtoConverter = createDtoConverter<
    OrderCategory,
    CreateOrderCategoryDto,
    UpdateOrderCategoryDto
>(OrderCategoryToCreateDto, OrderCategoryToUpdateDto);

function OrderCategoryToCreateDto(
    entity: Partial<OrderCategory>
): CreateOrderCategoryDto {
    return {
        categoryName: entity.categoryName || "",
    };
}

function OrderCategoryToUpdateDto(
    originalEntity: Partial<OrderCategory>,
    editEntity: Partial<OrderCategory> // TODO diff edit
): UpdateOrderCategoryDto {
    return {
        categoryName: diffCheck(
            originalEntity.categoryName,
            editEntity.categoryName
        ),
    };
}
