function findTreeNode<T>(
  value: string,
  data: T[],
  childrenField: keyof T & string,
  idField: keyof T & string,
): T | null {
  for (const node of data) {
    if (String(node[idField]) === value) {
      return node;
    }

    if (Array.isArray(node[childrenField])) {
      const childNode = findTreeNode(
        value,
        node[childrenField],
        childrenField,
        idField,
      );
      if (childNode) {
        return childNode;
      }
    }
  }

  return null;
}

function getChildrenNodes<T>(
  value: string,
  data: T[],
  childrenField: keyof T & string,
  idField: keyof T & string,
  acc: string[] = [],
): string[] {
  const node = findTreeNode<T>(value, data, childrenField, idField);
  if (!node) {
    return acc;
  }

  if (!Array.isArray(node[childrenField]) || node[childrenField].length === 0) {
    return [String(node[idField])];
  }
  node[childrenField].forEach((child) => {
    if (
      Array.isArray(child[childrenField]) &&
      child[childrenField].length > 0
    ) {
      getChildrenNodes(
        String(child[idField]),
        data,
        childrenField,
        idField,
        acc,
      );
    } else {
      acc.push(String(child[idField]));
    }
  });

  return acc;
}
export { findTreeNode, getChildrenNodes };
