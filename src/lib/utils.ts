export function copyAndMutate<T>(definition: T, mutator: (definition: T) => void): T {
    var def = structuredClone(definition);
    mutator(def);
    return def;
}
