import { useState } from "react";
import type { components } from "../../../../../api-types";
import { useMenuItemSizes } from "../../../../../entity/hooks/MenuItems/useMenuItemSizes";
import { GenericListGroup } from "../../../../shared-components/list-group/GenericListGroup";

type MenuItemSize = components["schemas"]["MenuItemSize"];

export function MenuItemSizeSettings() {
    const {
        menuItemSizes,
        isLoading,
        error,
        createSize,
        updateSize,
        deleteSize,
    } = useMenuItemSizes();

    const [selectedId, setSelectedId] = useState<number | null>(null);

    if (isLoading) return <p>Loading sizes...</p>;
    if (error) return <p>Error loading sizes: {String(error)}</p>;

    return (
        <GenericListGroup<MenuItemSize, "name">
            title="Sizes"
            items={menuItemSizes}
            targetProp="name"
            selectedId={selectedId}
            setSelectedId={setSelectedId}
            onAdd={(name) => createSize.mutate({ body: { sizeName: name } })}
            onDelete={(id) => deleteSize.mutate({ params: { path: { id } } })}
            onUpdate={(id, name) =>
                updateSize.mutate({
                    params: { path: { id } },
                    body: { sizeName: name },
                })
            }
        />
    );
}
