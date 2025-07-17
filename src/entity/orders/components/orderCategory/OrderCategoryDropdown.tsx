import { Text } from "@mantine/core";
import { DropdownSelection } from "../../../../lib/uiComponents/input/DropdownSelection";
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
        return <Text>No order categories found</Text>;
    }
    return (
        <DropdownSelection<OrderCategory>
            totalOptions={orderCategories}
            selectedOption={selectedCategory}
            onOptionChange={onUpdateCategory}
            labelKey={"categoryName"}
        />
    );
}
