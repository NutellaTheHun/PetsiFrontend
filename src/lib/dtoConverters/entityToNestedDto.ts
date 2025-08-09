export function EntityToNestedDto<
    T extends { id: number },
    TCreateDto,
    TUpdateDto,
    NestedDto
>(
    entity: Partial<T>,
    editEntity: Partial<T>,
    ToCreateDto: (entity: Partial<T>) => TCreateDto,
    ToUpdateDto: (entity: Partial<T>, editEntity: Partial<T>) => TUpdateDto
): NestedDto {
    if (entity.id && editEntity) {
        return {
            mode: "update",
            id: entity.id,
            updateDto: ToUpdateDto(entity, editEntity),
        } as NestedDto;
    } else {
        return {
            mode: "create",
            createDto: ToCreateDto(entity),
        } as NestedDto;
    }
}
