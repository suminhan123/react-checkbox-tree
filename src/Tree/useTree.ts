import { useCallback, useState } from "react";

type UseTreeInput = {
  /** Initial expanded state of all nodes */
  initialExpandedState?: string[];

  /** Initial selected state of nodes */
  initialSelectedState?: string[];

  /** Initial checked state of nodes */
  initialCheckedState?: string[];
};

export type UserTreeReturnType<T> = {
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
  initialExpandedState,
  initialSelectedState,
  initialCheckedState,
}: UseTreeInput = {}): UserTreeReturnType<T> {
  const [data, setData] = useState<T[]>([]);
  const [expandedState, setExpandedState] = useState(initialExpandedState);
  const [selectedState, setSelectedState] = useState(initialSelectedState);
  const [checkedState, setCheckedState] = useState(initialCheckedState);

  const initialize = useCallback(
    (data: T[]) => {
      setData(data);
    },
    [selectedState, expandedState],
  );

  const checkNode = (node: string) => {};
  const uncheckNode = (node: string) => {};

  const unCheckAllNodes = () => {};
  const checkAllNodes = () => {};

  const toggleExpanded = (node: string) => {};

  const isNodeChecked = (node: string) => {
    return true;
  };
  const isNodeIndeterminate = (node: string) => {
    return true;
  };

  return {
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
