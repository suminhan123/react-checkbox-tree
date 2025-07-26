function getTreeParentMap<T>(
  data: T[],
  childrenField: keyof T,
  idField: keyof T,
  parent: keyof T | null,
  acc: Map<string, string> = new Map(),
) {
  data.forEach((node) => {
    if (parent) {
      acc.set(String(node[idField]), String(parent));
    }
    if (Array.isArray(node[childrenField])) {
      getTreeParentMap<T>(
        node[childrenField],
        childrenField,
        idField,
        node[idField] as keyof T,
        acc,
      );
    }
  });
  return acc;
}

export { getTreeParentMap };
