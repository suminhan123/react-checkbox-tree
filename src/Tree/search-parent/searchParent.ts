import { TreeNodeType } from "@Tree/Tree";

function searchParent<T>(
  node: TreeNodeType<T>,
  childrenField: keyof T & string,
  autoCollapse: boolean = false,
) {
  if (!node?.parents?.length) return;
  const parentNode = node.parents.slice(-1).pop();
  if (parentNode?.[childrenField]) {
    const check = (parentNode[childrenField] as TreeNodeType<T>[]).filter(
      (current: TreeNodeType<T>) => current?.checked,
    );
    const none = (parentNode?.[childrenField] as TreeNodeType<T>[]).filter(
      (current: TreeNodeType<T>) =>
        !current?.checked && !current?.indeterminate,
    );
    const siblingCnt = (parentNode?.[childrenField] as TreeNodeType<T>[])
      .length;

    if (check.length === siblingCnt) {
      parentNode!.checked = true;
      parentNode!.indeterminate = false;
      if (autoCollapse) {
        parentNode!.collapsed = false;
      }
    } else if (none.length === siblingCnt) {
      parentNode!.checked = false;
      parentNode!.indeterminate = false;
    } else {
      parentNode!.checked = false;
      parentNode!.indeterminate = true;
      if (autoCollapse) {
        parentNode!.collapsed = false;
      }
    }

    searchParent<T>(parentNode, childrenField);
  }
}

export { searchParent };
