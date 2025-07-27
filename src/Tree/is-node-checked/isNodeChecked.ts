import { getAllCheckedNodes } from "@Tree/get-all-checked-nodes/getAllCheckedNodes";

function getNodeChecked<T>(
  value: string,
  data: T[],
  checkedState: string[],
): boolean {
  if (!checkedState.length) return false;
  if (checkedState.includes(value)) return true;

  return getAllCheckedNodes<T>(data, checkedState).some(
    (node) => node.checked && node.value === value,
  );
}
export { getNodeChecked };
