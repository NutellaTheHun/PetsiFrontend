import type { components } from "../../../../../api-types";

type MenuItemSize = components["schemas"]["MenuItemSize"];

type Props = {
    size: MenuItemSize;
    setSelectedSizeId: (id: number) => void;
};
export function SizeListItem({ size, setSelectedSizeId }: Props) {
    return (
        <li
            key={size.id}
            onClick={() => setSelectedSizeId(size.id)}
            className="list-group-item d-flex justify-content-between align-items-center"
            style={{ cursor: "pointer" }}
        >
            {size.name}
        </li>
    );
}
