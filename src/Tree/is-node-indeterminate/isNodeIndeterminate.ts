import { getAllCheckedNodes } from "@Tree/get-all-checked-nodes/getAllCheckedNodes";

function getNodeIndeterminate<T>(
  value: string,
  data: T[],
  checkedState: string[],
): boolean {
  if (!checkedState.length) return false;

  return getAllCheckedNodes<T>(data, checkedState).some(
    (node) => node.indeterminate && node.value === value,
  );
}

export { getNodeIndeterminate };
