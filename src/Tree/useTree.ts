type UseTreeInput = {
  /** Initial expanded state of all nodes */
  initialExpandedState?: string[];

  /** Initial selected state of nodes */
  initialSelectedState?: string[];

  /** Initial checked state of nodes */
  initialCheckedState?: string[];
};

type UserTreeReturnType = {
  checkNode: (node: string) => void;
  uncheckNode: (node: string) => void;

  unCheckAllNodes: (node: string) => void;
  checkAllNodes: (node: string) => void;

  toggleExpanded: (node: string) => void;

  isNodeChecked: (node: string) => boolean;
  isNodeIndeterminate: (node: string) => boolean;
};

function useTree({
  initialExpandedState,
  initialSelectedState,
  initialCheckedState,
}: UseTreeInput = {}): UserTreeReturnType {
  return {};
}

export { useTree };
