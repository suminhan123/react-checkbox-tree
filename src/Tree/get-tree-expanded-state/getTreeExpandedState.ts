import { getTreeParentMap } from "@Tree/get-tree-parent/getTreeParentMap";
import { TreeExpandedState } from "@Tree/useTree";

function getInitialTreeExpandedState<T>(
  initialState: TreeExpandedState,
  data: T[],
  childrenField: keyof T,
  idField: keyof T,
  acc: TreeExpandedState = {},
) {
  data.forEach((node) => {
    acc[node[idField] as string] =
      (node[idField] as string) in initialState
        ? initialState[node[idField] as string]
        : false;
    if (Array.isArray(node[childrenField] as T[])) {
      getInitialTreeExpandedState<T>(
        initialState,
        node[childrenField] as T[],
        childrenField,
        idField,
        acc,
      );
    }
  });

  return acc;
}

function updateExpandState<T>(
  parentMap: Map<string, string>,
  id: string,
  state: TreeExpandedState,
) {
  if (parentMap.has(id) && parentMap.get(id)) {
    state[parentMap.get(id) as string] = true;
    updateExpandState<T>(parentMap, parentMap.get(id) as string, state);
  }
}

function getTreeExpandedState<T>(
  data: T[],
  expandedIds: string[] | "*",
  childrenField: keyof T,
  idField: keyof T,
) {
  const state = getInitialTreeExpandedState<T>(
    {},
    data,
    childrenField,
    idField,
  );
  if (expandedIds === "*") {
    return Object.keys(state).reduce(
      (acc, cur) => ({ ...acc, [cur]: true }),
      {},
    );
  }
  const parentMap = getTreeParentMap<T>(data, childrenField, idField, null);
  expandedIds.forEach((id) => {
    updateExpandState<T>(parentMap, id, state);
  });
  return state;
}

export { getInitialTreeExpandedState, getTreeExpandedState };
