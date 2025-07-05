import { type RenderState } from "./GenericEntityRenderer";

export type GenericStatefulEntity<T> = {
    entity: T;
    state: RenderState;
};

export function isEditState<T>(statefulInstance: GenericStatefulEntity<T>) {
    return (
        statefulInstance.state === "edited" ||
        statefulInstance.state === "selected"
    );
}

export function isSelectedState<T>(statefulInstance: GenericStatefulEntity<T>) {
    return statefulInstance.state === "selected";
}

export function setStatefulData<T extends { id: number }>(
    data: T[],
    selectedId: number | null,
    editingId: number | null,
    editInstance?: T | null
): GenericStatefulEntity<T>[] {
    return data.map((item) => {
        const state = determineState(selectedId, editingId, item.id);
        if (state === "edited" && editInstance) {
            return { entity: editInstance, state };
        }
        return {
            entity: item,
            state: state,
        };
    });
}

export function determineState(
    targetId: number | null,
    editingId: number | null,
    itemId: number
): RenderState {
    if (targetId === itemId && editingId === itemId) {
        return "edited";
    }
    if (targetId === itemId) {
        return "selected";
    }
    return "normal";
}
