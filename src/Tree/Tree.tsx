import { useEffect } from "react";

import { useProps } from "@hooks";
import { UserTreeReturnType, useTree } from "./useTree";
import AutoSizer from "react-virtualized-auto-sizer";
import classes from "./Tree.module.css";
import { getContainerStyle } from "./tree.style";
import TreeNodeList from "./TreeNodeList";
import { parseInitialNode } from "./parse-initial-node/parseInitialNode";

export type TreeNodeType<T> = T & {
  checked: boolean;
  collapsed: boolean;
  depth: number;
  indeterminate: boolean;
  isLastChild: boolean;
  parents: TreeNodeType<T>[];
  itemsList: TreeNodeType<T>[];
};
export interface RenderTreeNodePayload<T> {
  /** Node depth in the tree */
  depth: number;

  /** `true` if the node is expanded, applicable only for nodes with `children` */
  collapsed: boolean;

  /** `true` if the node is fully checked */
  checked: boolean;

  /** `true` if the node is partially checked */
  indeterminate: boolean;

  /** `true` if the node is the last child among its siblings */
  isLastChild: boolean;

  /** `true` if the node is selected */
  selected: boolean;

  /** Node data from the `data` prop of `Tree` */
  node: TreeNodeType<T>;

  /** Tree controller instance, return value of `useTree` hook */
  tree: UserTreeReturnType<T>;

  /** Props to spread into the root node element */
  elementProps: {
    className: string;
    style: React.CSSProperties;
    onClick: (event: React.MouseEvent) => void;
    "data-selected": boolean | undefined;
    "data-value": string;
    "data-hovered": boolean | undefined;
  };
}

interface TreeProps<T> {
  height?: number;
  /** Data used to render nodes */
  data: T[];

  /** The key used to identify the node text */
  textField: string & keyof T;

  /** The key used to identify the node's children */
  childrenField: string & keyof T;

  /** The key used to identify the node's id, defaults to `id` */
  idField: string & keyof T;

  /** A function to render tree node label */
  renderNode?: (payload: RenderTreeNodePayload<T>) => React.ReactNode;

  /** Use-tree hook instance that can be used to manipulate component state */
  tree?: UserTreeReturnType<T>;

  /** If set, tree node with children is expanded on space key press @default `true` */
  expandOnClick?: boolean;
}

const TREE_NAME = "Tree";

function getDefaultProps<T>(): Partial<TreeProps<T>> {
  return { expandOnClick: true, height: 500 };
}

function Tree<T>(_props: TreeProps<T>) {
  const {
    data,
    idField,
    height,
    textField,
    childrenField,
    expandOnClick,
    tree,
    renderNode,
  } = useProps<TreeProps<T>, Partial<TreeProps<T>>>(
    TREE_NAME,
    getDefaultProps<T>(),
    _props,
  );

  const defaultController = useTree({ childrenField, idField });
  const controller: UserTreeReturnType<T> = tree || defaultController;

  useEffect(() => {
    controller.initialize(data);
  }, [data]);

  function parseData() {
    const itemsList: TreeNodeType<T>[] = [];
    for (const node of controller.data) {
      const db = node as TreeNodeType<T>;
      db.depth = 1;
      db.itemsList = itemsList;
      parseInitialNode(db, idField, childrenField);
    }
    return itemsList;
  }

  const renderingList = parseData();

  return (
    <div
      className={classes.treeContainer}
      style={{
        ...getContainerStyle(renderingList.length, height ?? 500),
      }}
    >
      <AutoSizer className={classes.autosizer}>
        {({ height, width }) => (
          <TreeNodeList
            style={{ height, width }}
            childrenField={childrenField}
            idField={idField}
            flatList={renderingList}
            controller={controller}
            renderNode={renderNode}
            textField={textField}
          />
        )}
      </AutoSizer>
    </div>
  );
}
export default Tree;
