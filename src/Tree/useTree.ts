import { useCallback, useState } from "react";

import { TreeNodeType } from "./Tree";
import { searchParent } from "./search-parent/searchParent";
import { getInitializeTreeData } from "./get-initial-tree-data/getInitialTreeData";

export type TreeExpandedState = Record<string, boolean>;

type UseTreeInput<T> = {
  /** Initial expanded state of all nodes */
  initialExpandedState?: string[];

  /** Initial checked state of nodes */
  initialCheckedState?: string[];

  childrenField: keyof T & string;

  idField: keyof T & string;
};

export type UserTreeReturnType<T> = {
  data: TreeNodeType<T>[];
  expandedState: string[];

  initialize: (data: T[]) => void;
  checkNode: (node: TreeNodeType<T>) => void;
  uncheckNode: (node: TreeNodeType<T>) => void;

  unCheckAllNodes: () => void;
  checkAllNodes: () => void;

  toggleExpanded: (node: TreeNodeType<T>) => void;
};

function useTree<T>({
  initialExpandedState = [],
  initialCheckedState = [],
  childrenField,
  idField,
}: UseTreeInput<T>): UserTreeReturnType<T> {
  const [, setId] = useState<number>(Math.random());
  const [data, setData] = useState<TreeNodeType<T>[]>([]);
  const [expandedState, setExpandedState] = useState(initialExpandedState);
  const [checkedState, setCheckedState] = useState(initialCheckedState);

  const initialize = useCallback(
    (_data: T[]) => {
      setData(
        getInitializeTreeData<T>(
          _data,
          initialCheckedState ?? [],
          initialExpandedState ?? [],
          idField,
          childrenField,
        ),
      );
    },
    [initialCheckedState],
  );

  const reload = () => {
    setId(Math.random());
  };
  const checkNode = (node: TreeNodeType<T>) => {
    function recursiveChecked(item: TreeNodeType<T>) {
      item.checked = true;
      item.indeterminate = false;
      if (item[childrenField]) {
        (item[childrenField] as TreeNodeType<T>[]).forEach(
          (child: TreeNodeType<T>) => recursiveChecked(child),
        );
      }
    }
    recursiveChecked(node);
    searchParent(node, childrenField);
    reload();
  };

  const uncheckNode = (node: TreeNodeType<T>) => {
    function recursiveUnChecked(item: TreeNodeType<T>) {
      item.checked = false;
      item.indeterminate = false;
      if (item[childrenField]) {
        (item[childrenField] as TreeNodeType<T>[]).forEach(
          (child: TreeNodeType<T>) => recursiveUnChecked(child),
        );
      }
    }
    recursiveUnChecked(node);
    searchParent(node, childrenField);
    reload();
  };

  const unCheckAllNodes = () => {
    setCheckedState([]);
    onClear(data);
    reload();
  };

  const onClear = (data: TreeNodeType<T>[]) => {
    data.forEach((node: TreeNodeType<T>) => {
      node.checked = false;
      node.indeterminate = false;
      if (node[childrenField]) {
        onClear(node[childrenField] as TreeNodeType<T>[]);
      }
    });
  };
  const checkAllNodes = () => {};

  const toggleExpanded = (node: TreeNodeType<T>) => {
    node.collapsed = !node.collapsed;
    reload();
  };

  return {
    data,
    expandedState,
    initialize,
    checkNode,
    uncheckNode,

    unCheckAllNodes,
    checkAllNodes,

    toggleExpanded,
  };
}

export { useTree };
