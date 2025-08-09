type TCreateDto<T, C> = (entity: Partial<T>) => C;

type TUpdateDto<T, U> = (entity: Partial<T>, editEntity: Partial<T>) => U;

type NestedDtoResult<C, U> =
    | { mode: "create"; toCreateDto: C }
    | { mode: "update"; id: number; toUpdateDto: U };

interface BaseDtoConverter<T, C, U> {
    toCreateDto: (entity: Partial<T>) => C;
    toManyCreateDto: (entities: Partial<T>[]) => C[];
    toUpdateDto: (entity: Partial<T>, editEntity: Partial<T>) => U;
}

interface DtoConverter<T, C, U> extends BaseDtoConverter<T, C, U> {}

export interface NestedDtoConverter<T, C, U> extends BaseDtoConverter<T, C, U> {
    toNestedDto: (
        entity: Partial<T>,
        editEntity: Partial<T>
    ) => NestedDtoResult<C, U>;
    toManyNestedDto: (
        originalEntities: Partial<T>[],
        editEntities: Partial<T>[]
    ) => NestedDtoResult<C, U>[];
}

export function createDtoConverter<T extends { id: number }, C, U>(
    toCreateDtoFn: TCreateDto<T, C>,
    toUpdateDtoFn: TUpdateDto<T, U>
): DtoConverter<T, C, U> {
    return {
        toCreateDto: toCreateDtoFn,
        toManyCreateDto: (entities: Partial<T>[]) => {
            const results: C[] = [];
            for (const entity of entities) {
                results.push(toCreateDtoFn(entity));
            }
            return results;
        },
        toUpdateDto: toUpdateDtoFn,
    };
}

export function createNestedDtoConverter<T extends { id: number }, C, U>(
    toCreateDtoFn: TCreateDto<T, C>,
    toUpdateDtoFn: TUpdateDto<T, U>
): NestedDtoConverter<T, C, U> {
    return {
        toCreateDto: toCreateDtoFn,

        toManyCreateDto: (entities: Partial<T>[]) => {
            const results: C[] = [];
            for (const entity of entities) {
                results.push(toCreateDtoFn(entity));
            }
            return results;
        },

        toUpdateDto: toUpdateDtoFn,

        toNestedDto: (entity, editEntity) => {
            if (entity.id && editEntity) {
                return {
                    mode: "update",
                    id: entity.id,
                    toUpdateDto: toUpdateDtoFn(entity, editEntity),
                };
            } else {
                return {
                    mode: "create",
                    toCreateDto: toCreateDtoFn(entity),
                };
            }
        },

        toManyNestedDto: (originalEntities, editEntities) => {
            const results: NestedDtoResult<C, U>[] = [];
            const originalMap = new Map(originalEntities.map((e) => [e.id, e]));

            for (const editEntity of editEntities) {
                if (editEntity.id === undefined) {
                    results.push({
                        mode: "create",
                        toCreateDto: toCreateDtoFn(editEntity),
                    });
                } else {
                    const originalEntity = originalMap.get(editEntity.id);
                    if (!originalEntity) {
                        throw new Error(
                            "id of edited instance not found in original array"
                        );
                    }
                    results.push({
                        mode: "update",
                        id: editEntity.id,
                        toUpdateDto: toUpdateDtoFn(originalEntity, editEntity),
                    });
                }
            }
            return results;
        },
    };
}
