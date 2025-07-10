import {
    createDropdownOptions,
    GenericDropdownInput,
} from "../../../../lib/generics/propertyRenderers/GenericDropdownInput";
import { GenericValueDisplay } from "../../../../lib/generics/propertyRenderers/GenericValueDisplay";
import type { OrderCategory } from "../../../entityTypes";

type Props = {
    selectedCategory: OrderCategory | null;
    onUpdateCategory: (category: OrderCategory) => void;
    orderCategories: OrderCategory[];
};

export function OrderCategoryDropdown({
    selectedCategory,
    onUpdateCategory,
    orderCategories,
}: Props) {
    if (orderCategories.length === 0) {
        return <GenericValueDisplay value={"No order categories found"} />;
    }
    return (
        <GenericDropdownInput
            options={createDropdownOptions(orderCategories, "categoryName")}
            value={selectedCategory}
            onChange={onUpdateCategory}
        />
    );
}
