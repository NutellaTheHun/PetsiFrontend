export function diffCheck<
    T extends string | null | number | boolean | undefined
>(origVal: T, editVal: T): T | undefined {
    if (origVal !== editVal) {
        return editVal;
    }
    return undefined;
}

export function diffCheckArray<
    T extends string | null | number | boolean | undefined
>(origArr: T[], editArr: T[]): T[] | undefined {
    if (!origArr && !editArr) return undefined;

    if (origArr.length !== editArr.length) {
        return editArr;
    }
    const sortedOrig = [...origArr].sort();
    const sortedEdit = [...editArr].sort();
    for (let i = 0; i < origArr.length; i++) {
        if (sortedOrig[i] !== sortedEdit[i]) {
            return editArr;
        }
    }
    return undefined;
}

export function diffCheckDtos<T>(dtos: T[] | null): T[] | undefined {
    if (dtos && dtos.length > 0) {
        return dtos;
    }
    return undefined;
}
