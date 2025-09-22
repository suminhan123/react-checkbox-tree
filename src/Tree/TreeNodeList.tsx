import { List, type RowComponentProps } from "react-window";
import type { CSSProperties, ReactNode } from "react";

import { RenderTreeNodePayload, TreeNodeType } from "./Tree";
import { UserTreeReturnType } from "./useTree";
import TreeNode from "./TreeNode";

import { TREE_ITEM_HEIGHT } from "./tree.style";
import classes from "./Tree.module.css";

type TreeNodeListProps<T> = {
  flatList: TreeNodeType<T>[];
  controller: UserTreeReturnType<T>;
  renderNode?: (payload: RenderTreeNodePayload<T>) => ReactNode;
  childrenField: keyof T & string;
  idField: keyof T & string;
  textField: keyof T & string;
  style: CSSProperties;
};

type RowProps<T> = {
  flatList: TreeNodeType<T>[];
  controller: UserTreeReturnType<T>;
  renderNode?: (payload: RenderTreeNodePayload<T>) => ReactNode;
  childrenField: keyof T & string;
  idField: keyof T & string;
  textField: keyof T & string;
};
function RenderItem<T>({
  index,
  style,
  flatList,
  controller,
  renderNode,
  childrenField,
  idField,
  textField,
}: RowComponentProps<RowProps<T>>) {
  return (
    <TreeNode<T>
      style={style}
      node={flatList[index]}
      expandOnClick={true}
      controller={controller}
      renderNode={renderNode}
      childrenField={childrenField}
      idField={idField}
      textField={textField}
    />
  );
}
function TreeNodeList<T>({
  flatList,
  controller,
  renderNode,
  childrenField,
  idField,
  textField,
  style,
}: TreeNodeListProps<T>) {
  return (
    <List
      style={style}
      className={classes.treeNodeListContainer}
      rowComponent={RenderItem}
      rowCount={flatList.length}
      rowHeight={TREE_ITEM_HEIGHT}
      rowProps={{
        flatList,
        controller,
        renderNode,
        childrenField,
        idField,
        textField,
      }}
    />
  );
}

export default TreeNodeList;
