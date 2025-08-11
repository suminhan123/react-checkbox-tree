import { useCallback, useState } from "react";

import { getNodeChecked } from "./is-node-checked/isNodeChecked";
import { getNodeIndeterminate } from "./is-node-indeterminate/isNodeIndeterminate";
import { getChildrenNodes } from "./get-children-nodes/getChildrenNodes";
import { getInitialTreeExpandedState } from "./get-tree-expanded-state/getTreeExpandedState";

export type TreeExpandedState = Record<string, boolean>;

type UseTreeInput<T> = {
  /** Initial expanded state of all nodes */
  initialExpandedState?: TreeExpandedState;

  /** Initial checked state of nodes */
  initialCheckedState?: string[];

  childrenField: keyof T & string;

  idField: keyof T & string;
};

export type UserTreeReturnType<T> = {
  expandedState: TreeExpandedState;

  initialize: (data: T[]) => void;
  checkNode: (node: string) => void;
  uncheckNode: (node: string) => void;

  unCheckAllNodes: () => void;
  checkAllNodes: () => void;

  toggleExpanded: (node: string) => void;

  isNodeChecked: (node: string) => boolean;
  isNodeIndeterminate: (node: string) => boolean;
};

function useTree<T>({
  initialExpandedState = {},
  initialCheckedState = [],
  childrenField,
  idField,
}: UseTreeInput<T>): UserTreeReturnType<T> {
  const [data, setData] = useState<T[]>([]);
  const [expandedState, setExpandedState] = useState(initialExpandedState);
  const [checkedState, setCheckedState] = useState(initialCheckedState);

  const initialize = useCallback(
    (_data: T[]) => {
      setData(_data);
      setExpandedState((current) =>
        getInitialTreeExpandedState<T>(current, _data, childrenField, idField),
      );
    },
    [expandedState],
  );

  const checkNode = (node: string) => {
    const checkedNodes = getChildrenNodes<T>(
      String(node),
      data,
      childrenField,
      idField,
    );

    setCheckedState((state) =>
      Array.from(new Set([...state, ...checkedNodes])),
    );
  };

  const uncheckNode = (node: string) => {
    const checkedNodes = getChildrenNodes<T>(
      String(node),
      data,
      childrenField,
      idField,
    );

    setCheckedState((state) =>
      state.filter((item) => !checkedNodes.includes(item)),
    );
  };

  const unCheckAllNodes = () => {
    setCheckedState([]);
  };
  const checkAllNodes = () => {
    setCheckedState([]);
  };

  const toggleExpanded = (node: string) => {
    setExpandedState((current) => ({ ...current, [node]: !current[node] }));
  };

  const isNodeChecked = (node: string) =>
    getNodeChecked<T>(node, data, checkedState, childrenField, idField);

  const isNodeIndeterminate = (node: string) =>
    getNodeIndeterminate<T>(node, data, checkedState, childrenField, idField);

  return {
    expandedState,
    initialize,
    checkNode,
    uncheckNode,

    unCheckAllNodes,
    checkAllNodes,

    toggleExpanded,

    isNodeChecked,
    isNodeIndeterminate,
  };
}

export { useTree };
