import type { OrderCategory, UpdateOrderCategoryDto } from "../../entityTypes";

export function OrderCategoryToUpdateDto(
    entity: OrderCategory
): UpdateOrderCategoryDto {
    return {
        categoryName: entity.categoryName,
    };
}
