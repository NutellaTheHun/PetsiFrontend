import type { CreateOrderCategoryDto, OrderCategory } from "../../entityTypes";

export function OrderCategoryToCreateDto(
    entity: OrderCategory
): CreateOrderCategoryDto {
    return {
        categoryName: entity.categoryName,
    };
}
