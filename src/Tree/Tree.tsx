export interface RenderTreeNodePayload {
  /** Node depth in the tree */
  depth: number;

  /** `true` if the node is expanded, applicable only for nodes with `children` */
  expanded: boolean;

  /** `true` if the node has non-empty `children` array */
  hasChildren: boolean;

  /** `true` if the node is selected */
  selected: boolean;

  /** Node data from the `data` prop of `Tree` */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  node: any;

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
  textField: string;

  /** The key used to identify the node's children */
  childrenField: string;

  /** A function to render tree node label */
  renderNode?: (payload: RenderTreeNodePayload) => React.ReactNode;

  /** Use-tree hook instance that can be used to manipulate component state */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tree?: any;
}

function Tree<T>({ _props }: TreeProps<T>) {
  return (
    <div>
      <h1>Tree</h1>
      <p>This is a placeholder for the Tree component.</p>
    </div>
  );
}
export default Tree;
