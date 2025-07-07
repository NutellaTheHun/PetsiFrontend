import { EntityListGroupFactory } from "../../../../lib/generics/EntityListGroupFactory";
import type { InventoryArea } from "../../../entityTypes";
import {
    type InventoryAreaCreateContext,
    type InventoryAreaEditContext,
} from "../../hooks/useInventoryAreaMutations";
import { InventoryAreaRender } from "../../property-render/InventoryArea.render";

export const TestInventoryAreaListGroup = EntityListGroupFactory<
    InventoryArea,
    InventoryAreaEditContext,
    InventoryAreaCreateContext
>({
    renderItem: (item, context) => (
        <InventoryAreaRender
            entityProp="areaName"
            statefulInstance={item}
            context={
                item.state === "create"
                    ? context.createContext
                    : context.editContext
            }
        />
    ),
});
