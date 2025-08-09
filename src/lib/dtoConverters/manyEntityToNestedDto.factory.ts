export function createManyEntityToNestedDto<T extends { id: number }, C, U, N>(
    toCreateDto: (entity: Partial<T>) => C,
    toUpdateDto: (entity: Partial<T>, editEntity: Partial<T>) => U
): (originalEntities: Partial<T>[], editEntities: Partial<T>[]) => N[] {
    return (originalEntities, editEntities) => {
        const result: N[] = [];
        const originalMap = new Map(originalEntities.map((e) => [e.id, e]));

        for (const editEntity of editEntities) {
            if (editEntity.id === undefined) {
                result.push({
                    mode: "create",
                    createDto: toCreateDto(editEntity),
                } as N);
            } else {
                const originalEntity = originalMap.get(editEntity.id);
                if (originalEntity) {
                    result.push({
                        mode: "update",
                        id: editEntity.id,
                        toUpdateDto: toUpdateDto(originalEntity, editEntity),
                    } as N);
                } else {
                    throw new Error(
                        "id of edited instance not found in original array"
                    );
                }
            }
        }
        return result;
    };
}
