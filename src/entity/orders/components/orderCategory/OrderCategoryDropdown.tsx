import { GenericDropdownInput } from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { OrderCategory } from "../../../entityTypes";

type Props = {
    selectedCategoryId: number | null;
    onUpdateCategoryId: (id: number | null) => void;
    orderCategories: OrderCategory[];
};

export function OrderCategoryDropdown({
    selectedCategoryId: selectedId,
    onUpdateCategoryId: setCategoryId,
    orderCategories,
}: Props) {
    if (orderCategories.length === 0) {
        return <GenericValueDisplay value={"No order categories found"} />;
    }
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
