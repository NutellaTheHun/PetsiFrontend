import type { DtoConverter } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderCategoryDto,
    OrderCategory,
    UpdateOrderCategoryDto,
} from "../../entityTypes";

export const orderCategoryDtoConverter: DtoConverter<
    OrderCategory,
    CreateOrderCategoryDto,
    UpdateOrderCategoryDto
> = {
    toCreateDto: OrderCategoryToCreateDto,
    toUpdateDto: OrderCategoryToUpdateDto,
};

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
        categoryName: originalEntity.categoryName || "",
    };
}
