import type { components } from "../../../../api-types";
import { GenericDropdownInput } from "../../../../lib/generics/table/render-cell-content/GenericDropdownInput";
import { useOrderCategories } from "../../hooks/useOrderCategories";

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
