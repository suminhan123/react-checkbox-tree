import { useEffect } from "react";

import TreeNode from "./TreeNode";
import { UserTreeReturnType, useTree } from "./useTree";
import classes from "./Tree.module.css";

export interface RenderTreeNodePayload<T> {
  /** Node depth in the tree */
  depth: number;

  /** `true` if the node is expanded, applicable only for nodes with `children` */
  expanded: boolean;

  /** `true` if the node has non-empty `children` array */
  hasChildren: boolean;

  /** `true` if the node is selected */
  selected: boolean;

  /** Node data from the `data` prop of `Tree` */
  node: T;

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
}

function Tree<T>({
  data,
  idField,
  textField,
  childrenField,
  tree,
  renderNode,
}: TreeProps<T>) {
  const defaultController = useTree({ childrenField, idField });
  const controller: UserTreeReturnType<T> = tree || defaultController;

  useEffect(() => {
    controller.initialize(data);
  }, [data]);

  const nodes = data.map((node) => (
    <TreeNode<T>
      key={node[idField] as string}
      node={node}
      textField={textField}
      childrenField={childrenField}
      idField={idField}
      controller={controller}
      renderNode={renderNode}
    />
  ));
  return <ul className={classes.listContainer}>{nodes}</ul>;
}
export default Tree;
