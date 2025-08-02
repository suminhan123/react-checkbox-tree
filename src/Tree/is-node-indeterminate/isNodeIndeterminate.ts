import { getAllCheckedNodes } from "@Tree/get-all-checked-nodes/getAllCheckedNodes";

function getNodeIndeterminate<T>(
  value: string,
  data: T[],
  checkedState: string[],
  childrenField: keyof T & string,
  idField: keyof T & string,
): boolean {
  if (!checkedState.length) return false;

  return getAllCheckedNodes<T>(
    data,
    checkedState,
    childrenField,
    idField,
  ).result.some((node) => node.indeterminate && node.value === value);
}

export { getNodeIndeterminate };
