export function ManyEntityToNestedDto<
    T extends { id: number },
    TCreateDto,
    TUpdateDto,
    NestedDto
>(
    originalEntities: Partial<T>[],
    editEntities: Partial<T>[],
    ToCreateDto: (entity: Partial<T>) => TCreateDto,
    ToUpdateDto: (entity: Partial<T>, editEntity: Partial<T>) => TUpdateDto
): NestedDto[] {
    const result: NestedDto[] = [];
    for (const editEntity of editEntities) {
        if (editEntity.id === undefined) {
            result.push({
                mode: "create",
                createDto: ToCreateDto(editEntity),
            } as NestedDto);
        } else {
            const originalEntity = originalEntities.find(
                (orig) => orig.id === editEntity.id
            );
            if (originalEntity) {
                result.push({
                    mode: "update",
                    id: editEntity.id,
                    updateDto: ToUpdateDto(originalEntity, editEntity),
                } as NestedDto);
            } else {
                throw Error(
                    "id of edited instance not found in original array"
                );
            }
        }
    }
    return result;
}
