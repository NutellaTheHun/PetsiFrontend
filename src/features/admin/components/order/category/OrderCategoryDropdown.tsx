import type { components } from "../../../../../api-types";
import { useOrderCategories } from "../../../../../entity/hooks/Orders/useOrderCategories";
import { GenericDropdownInput } from "../../../../shared-components/table/render-cell-content/GenericDropdownInput";

type OrderCategory = components["schemas"]["OrderCategory"];

type Props = {
    selectedCategoryId: number | null;
    onUpdateCategoryId: (id: number | null) => void;
};

export function OrderCategoryDropdown({
    selectedCategoryId: selectedId,
    onUpdateCategoryId: setCategoryId,
}: Props) {
    const { orderCategories = [] } = useOrderCategories();

    return (
        <GenericDropdownInput
            options={orderCategories.map((category: OrderCategory) => ({
                id: category.id,
                label: category.categoryName,
            }))}
            value={selectedId}
            onChange={(categoryId: number | string) =>
                setCategoryId(Number(categoryId))
            }
        />
    );
}
