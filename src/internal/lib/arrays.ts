export function transformToMap<T, K extends PropertyKey = string, V = T>(
    source: T[],
    keyMapper: (item: T) => K,
    valMapper: (item: T) => V = ((it: T) => it) as any,
) {
    if (!Array.isArray(source)) {
        throw new Error('Param #1 is not an array');
    }

    const result: Record<K, V> = Object.create(null);

    for (const item of source) {
        const key = keyMapper(item);
        if (key != null) {
            result[key] = valMapper(item);
        }
    }

    return result;
}
