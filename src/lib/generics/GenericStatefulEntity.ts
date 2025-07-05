import { type RenderState } from "./GenericEntityRenderer";

export type GenericStatefulEntity<T> = {
    entity: T;
    state: RenderState;
};

export function isEditState<T>(statefulInstance: GenericStatefulEntity<T>) {
    return statefulInstance.state === "edit";
}

export function isSelectedState<T>(statefulInstance: GenericStatefulEntity<T>) {
    return statefulInstance.state === "select";
}

export function isReadState<T>(statefulInstance: GenericStatefulEntity<T>) {
    return statefulInstance.state === "read";
}

export function setStatefulData<T extends { id: number }>(
    data: T[],
    editInstance?: Partial<T> | null,
    selectedId?: number | null,
    editingId?: number | null
): GenericStatefulEntity<T>[] {
    return data.map((item) => {
        const state = determineState(item.id, selectedId, editingId);
        if (state === "edit" && editInstance) {
            return { entity: { ...item, ...editInstance }, state };
        }
        return {
            entity: item,
            state: state,
        };
    });
}

export function determineState(
    itemId: number,
    selectId?: number | null,
    editingId?: number | null
): RenderState {
    if (editingId === itemId) {
        return "edit";
    }
    if (selectId === itemId) {
        return "select";
    }
    return "read";
}
