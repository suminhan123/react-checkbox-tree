import { TreeNodeType } from "@Tree/Tree";
import { searchParent } from "@Tree/search-parent/searchParent";

function getInitializeTreeData<T>(
  data: T[],
  initialCheckedNodes: string[],
  initialExpandedNodes: string[],
  idField: keyof T & string,
  childrenField: keyof T & string,
): TreeNodeType<T>[] {
  const checkNodeSet = new Set<string>(initialCheckedNodes.map((item) => item));
  const expandedNodeSet = new Set<string>(
    initialExpandedNodes.map((item) => item),
  );
  function recursiveDefaultSet(
    items: TreeNodeType<T>[],
    depth: number,
    parent?: TreeNodeType<T>,
  ) {
    items.forEach((item) => {
      const db = item as TreeNodeType<T>;
      db.depth = depth;
      const check = checkNodeSet.has(db[idField] as string);
      const expanded = expandedNodeSet.has(db[idField] as string);
      if (parent) {
        db.parents = [parent];
      }
      db.checked = check;
      db.collapsed = !expanded;
      if (check) {
        searchParent(db, childrenField);
      }

      if (db[childrenField]) {
        recursiveDefaultSet(
          db[childrenField] as TreeNodeType<T>[],
          depth + 1,
          db,
        );
      }
    });
  }

  recursiveDefaultSet(data as TreeNodeType<T>[], 1);

  return data as TreeNodeType<T>[];
}

export { getInitializeTreeData };
