import { useEntityMutations } from "../../../lib/entityHookTemplates/UseEntityMutations";
import type {
    CreateOrderCategoryDto,
    OrderCategory,
    UpdateOrderCategoryDto,
} from "../../entityTypes";
import { OrderCategoryToCreateDto } from "../dto-converters/orderCategoryToCreateDto";
import { OrderCategoryToUpdateDto } from "../dto-converters/orderCategoryToUpdateDto";
import type { OrderCategoryRenderContext } from "../property-render/OrderCategory.render";

export type OrderCategoryEditContext = Pick<
    OrderCategoryRenderContext,
    "setCategoryName"
>;

export type OrderCategoryCreateContext = Pick<
    OrderCategoryRenderContext,
    "setCategoryName"
>;

// DTO converter for OrderCategory
const orderCategoryDtoConverter = {
    toCreateDto: OrderCategoryToCreateDto,
    toUpdateDto: OrderCategoryToUpdateDto,
};

// Context factory functions
const createOrderCategoryEditContext = (
    editInstance: Partial<OrderCategory> | null,
    setEditInstance: (instance: Partial<OrderCategory> | null) => void
): OrderCategoryEditContext => ({
    setCategoryName: (name: string) => {
        setEditInstance({ ...editInstance, categoryName: name });
    },
});

const createOrderCategoryCreateContext = (
    createInstance: Partial<OrderCategory>,
    setCreateInstance: (instance: Partial<OrderCategory>) => void
): OrderCategoryCreateContext => ({
    setCategoryName: (name: string) => {
        setCreateInstance({ ...createInstance, categoryName: name });
    },
});

// Entity-specific mutations hook
export function useOrderCategoryMutations() {
    return useEntityMutations<
        OrderCategory,
        CreateOrderCategoryDto,
        UpdateOrderCategoryDto,
        OrderCategoryEditContext,
        OrderCategoryCreateContext
    >({
        endpoint: "/order-categories",
        dtoConverter: orderCategoryDtoConverter,
        createEditContext: createOrderCategoryEditContext,
        createCreateContext: createOrderCategoryCreateContext,
    });
}
