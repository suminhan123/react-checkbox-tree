import { TreeNodeType } from "@Tree/Tree";

function getCheckedList<T>(
  data: TreeNodeType<T>[],
  childrenField: keyof T & string,
) {
  const selectItem: TreeNodeType<T>[] = [];
  function updateCheckedList(list: TreeNodeType<T>[]) {
    list.forEach((node: TreeNodeType<T>) => {
      if (node.checked && !node[childrenField]) {
        selectItem.push(node);
      }
      if (node[childrenField]) {
        updateCheckedList(node[childrenField] as TreeNodeType<T>[]);
      }
    });
  }
  updateCheckedList(data);
  return selectItem;
}

export { getCheckedList };
