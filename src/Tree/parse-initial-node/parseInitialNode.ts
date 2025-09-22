import { TreeNodeType } from "@Tree/Tree";

function parseInitialNode<T>(
  item: TreeNodeType<T>,
  idField: keyof T & string,
  childrenField: keyof T & string,
) {
  const {
    depth,
    itemsList,
    parents = [],
    isLastChild = false,
    checked = false,
    collapsed = true,
    indeterminate = false,
  } = item;
  item.depth = depth;
  item.checked = checked;
  item.collapsed = collapsed;
  item.indeterminate = indeterminate;
  item.isLastChild = isLastChild;
  item.itemsList = itemsList;
  item.parents = parents;
  itemsList.push(item);
  if (!collapsed && item?.[childrenField]) {
    const lastChild = (item?.[childrenField] as TreeNodeType<T>[])
      ?.slice(-1)
      ?.pop();

    for (const child of item?.[childrenField] as TreeNodeType<T>[]) {
      const childNode = child as TreeNodeType<T>;
      childNode.depth = depth + 1;
      childNode.itemsList = itemsList;
      childNode.parents = [...parents, item];
      childNode.isLastChild = lastChild?.[idField] === child?.[idField];
      parseInitialNode(childNode, idField, childrenField);
    }
  }
}

export { parseInitialNode };
