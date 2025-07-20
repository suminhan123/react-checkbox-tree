import { RenderTreeNodePayload } from "./Tree";
import { UserTreeReturnType } from "./useTree";
import classes from "./Tree.module.css";

interface TreeNodeProps<T> {
  node: T;
  textField: keyof T;
  childrenField: keyof T;
  idField: keyof T;
  renderNode?: (payload: RenderTreeNodePayload<T>) => React.ReactNode;
  depth?: number;
  controller: UserTreeReturnType<T>;
}

function TreeNode<T>({
  node,
  textField,
  childrenField,
  idField,
  renderNode,
  depth = 1,
  controller,
}: TreeNodeProps<T>) {
  const nested = ((node[childrenField] as T[]) || []).map((child: T) => (
    <TreeNode<T>
      key={child[idField] as string}
      node={child}
      textField={textField}
      childrenField={childrenField}
      idField={idField}
      depth={depth + 1}
      controller={controller}
      renderNode={renderNode}
    />
  ));

  const handleNodeClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    if (controller.isNodeChecked(node[idField] as string)) {
      controller.checkNode(node[idField] as string);
    } else {
      controller.uncheckNode(node[idField] as string);
    }
    controller.toggleExpanded(node[idField] as string);
  };

  const expanded = false;
  const selected = false;
  const elementProps = {
    className: "",
    style: {},
    onClick: handleNodeClick,
    "data-selected": selected,
    "data-value": node[idField] as string,
    "data-hovered": false,
  };
  return (
    <>
      <li className={classes.container}>
        {typeof renderNode === "function" ? (
          renderNode({
            depth,
            expanded,
            hasChildren: nested.length > 0,
            selected,
            node,
            tree: controller,
            elementProps,
          })
        ) : (
          <div {...elementProps}>{node[textField] as string}</div>
        )}
      </li>
      {expanded && nested.length > 0 && <ul>{nested}</ul>}
    </>
  );
}
export default TreeNode;
