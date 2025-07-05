import type { InventoryArea } from "../../../../entity/entityTypes";
import { InventoryAreaListGroup } from "../../../../entity/inventoryAreas/components/inventoryArea/InventoryAreaListGroup";

type Props = {
    inventoryAreas: InventoryArea[];
    targetId: number | null;
    setTargetId: (id: number | null) => void;
};

export function InventoryAreaSettings({
    inventoryAreas,
    targetId,
    setTargetId,
}: Props) {
    //const [editValues, setEditValues] = useState<UpdateInventoryAreaDto>();
    //const [isEditingTarget, setIsEditingTarget] = useState(false);

    /*const handleToggleEdit = (id: number | null) => {
        if (id === targetId) return;
        setIsEditingTarget(id !== null);
        setEditValues(undefined);
    };

    const handleSetSelectId = (id: number) => {
        if (id === targetId) return;
        setTargetId(id);
        handleToggleEdit(null);
    };*/

    return (
        <InventoryAreaListGroup
            inventoryAreas={inventoryAreas}
            selectedAreaIdState={[targetId, setTargetId]}
        />
    );
}
