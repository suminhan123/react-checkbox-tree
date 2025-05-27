import TreeNode from "./TreeNode";

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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tree: any;

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
  textField: keyof T;

  /** The key used to identify the node's children */
  childrenField: keyof T;

  /** The key used to identify the node's id, defaults to `id` */
  idField: keyof T;

  /** A function to render tree node label */
  renderNode?: (payload: RenderTreeNodePayload<T>) => React.ReactNode;

  /** Use-tree hook instance that can be used to manipulate component state */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tree?: any;
}

function Tree<T>({
  data,
  idField,
  textField,
  childrenField,
  tree,
  renderNode,
}: TreeProps<T>) {
  const nodes = data.map((node) => (
    <TreeNode<T>
      key={node[idField] as string}
      node={node}
      textField={textField}
      childrenField={childrenField}
      idField={idField}
      controller={tree}
      renderNode={renderNode}
    />
  ));
  return <ul>{nodes}</ul>;
}
export default Tree;
