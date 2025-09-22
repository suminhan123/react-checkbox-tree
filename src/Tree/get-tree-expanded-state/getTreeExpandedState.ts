import { getTreeParentMap } from "@Tree/get-tree-parent/getTreeParentMap";

function getTreeParentExpandedState(
  childId: string,
  parentMap: Map<string, string>,
  acc: Set<string>,
) {
  const parentId = parentMap.get(childId);
  if (parentId) {
    acc.add(parentId);
    getTreeParentExpandedState(parentId, parentMap, acc);
  }
}
function getTreeExpandedState<T>(
  data: T[],
  expandedIds: string[],
  childrenField: keyof T,
  idField: keyof T,
) {
  const parentMap = getTreeParentMap<T>(data, childrenField, idField, null);
  const acc = new Set<string>(expandedIds.map((item) => item));

  expandedIds.forEach((id) => {
    getTreeParentExpandedState(id, parentMap, acc);
  });

  return Array.from(acc);
}

export { getTreeExpandedState };
