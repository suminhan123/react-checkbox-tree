export interface CheckedNodeStatus {
  checked: boolean;
  indeterminate: boolean;
  hasChildren: boolean;
  value: string;
}

function getAllCheckedNodes<T>(
  data: T[],
  checkedState: string[],
  childrenField: keyof T & string,
  idField: keyof T & string,
  acc: CheckedNodeStatus[] = [],
) {
  const currentTreeChecked: CheckedNodeStatus[] = [];

  data.forEach((node) => {
    if (Array.isArray(node[childrenField]) && node[childrenField].length > 0) {
      const innerChecked = getAllCheckedNodes(
        node[childrenField],
        checkedState,
        childrenField,
        idField,
        acc,
      );
      if (
        innerChecked.currentTreeChecked.length === node[childrenField].length
      ) {
        const isChecked = innerChecked.currentTreeChecked.every(
          (item) => item.checked,
        );
        const item = {
          checked: isChecked,
          indeterminate: !isChecked,
          value: String(node[idField]),
          hasChildren: true,
        };
        currentTreeChecked.push(item);
        acc.push(item);
      } else if (innerChecked.currentTreeChecked.length > 0) {
        const item = {
          checked: false,
          indeterminate: true,
          value: String(node[idField]),
          hasChildren: true,
        };
        currentTreeChecked.push(item);
        acc.push(item);
      }
    } else if (checkedState.includes(String(node[idField]))) {
      const item: CheckedNodeStatus = {
        checked: true,
        indeterminate: false,
        hasChildren: false,
        value: String(node[idField]),
      };

      currentTreeChecked.push(item);
      acc.push(item);
    }
  });

  return { result: acc, currentTreeChecked };
}
export { getAllCheckedNodes };
