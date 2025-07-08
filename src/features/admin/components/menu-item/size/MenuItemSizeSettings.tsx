import { useState } from "react";
import type { MenuItemSize } from "../../../../../entity/entityTypes";
import { useMenuItemSizes } from "../../../../../entity/menuItems/hooks/useMenuItemSizes";
import { MenuItemSizeRender } from "../../../../../entity/menuItems/property-render/MenuItemSize.render";
import { GenericListGroup } from "../../../../../lib/generics/listGroup/GenericListGroup";

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
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editValues, setEditValues] = useState<MenuItemSize | null>();

    if (isLoading) return <p>Loading sizes...</p>;
    if (error) return <p>Error loading sizes: {String(error)}</p>;

    return (
        <GenericListGroup<MenuItemSize>
            items={menuItemSizes}
            selectedIdState={[selectedId, setSelectedId]}
            editingIdState={[editingId, setEditingId]}
            onCreate={(name) => createSize.mutate({ body: { sizeName: name } })}
            onDelete={(id) => deleteSize.mutate({ params: { path: { id } } })}
            onUpdate={(id) =>
                updateSize.mutate({
                    params: { path: { id } },
                    body: {},
                })
            }
            renderProperty={(size) => (
                <MenuItemSizeRender
                    entityProp="name"
                    currentInstance={size}
                    editInstance={editValues}
                    targetId={selectedId}
                    editingId={editingId}
                    context={{
                        setName: (name) => {
                            editValues
                                ? setEditValues({ ...editValues, name })
                                : setEditValues({ id: size.id, name });
                        },
                    }}
                />
            )}
        />
    );
}
