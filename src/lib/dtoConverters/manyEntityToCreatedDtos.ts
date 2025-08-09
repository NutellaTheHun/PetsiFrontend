export function ManyRecipeIngredientToCreateDto<
    T extends { id: number },
    TResultDto
>(
    entities: Partial<T>[],
    ToCreateDto: (entity: Partial<T>) => TResultDto
): TResultDto[] {
    const result: TResultDto[] = [];
    for (const entity of entities) {
        result.push(ToCreateDto(entity));
    }
    return result;
}
