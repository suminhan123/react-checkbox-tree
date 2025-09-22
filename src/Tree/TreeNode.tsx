import { CSSProperties } from "react";

import { RenderTreeNodePayload, TreeNodeType } from "./Tree";
import { UserTreeReturnType } from "./useTree";
import classes from "./Tree.module.css";
import { getGuideLines, getStyle } from "./tree.style";

interface TreeNodeProps<T> {
  node: TreeNodeType<T>;
  style: CSSProperties;
  textField: keyof T;
  childrenField: keyof T;
  idField: keyof T;
  expandOnClick: boolean | undefined;
  renderNode?: (payload: RenderTreeNodePayload<T>) => React.ReactNode;
  depth?: number;
  controller: UserTreeReturnType<T>;
}

function TreeNode<T>({
  node,
  style,
  textField,
  childrenField,
  idField,
  expandOnClick,
  renderNode,
  controller,
}: TreeNodeProps<T>) {
  const { depth, collapsed, checked, indeterminate } = node;
  const selected = false;

  const handleNodeClick = () => {
    if (expandOnClick) {
      controller.toggleExpanded(node);
    }
  };
  const elementProps = {
    className: "",
    style,
    onClick: handleNodeClick,
    "data-selected": selected,
    "data-value": node[idField] as string,
    "data-hovered": false,
  };

  return (
    <div className={classes.treeNodeContainer} style={getStyle(depth, style)}>
      <div className={classes.treeNodeInner}>
        {typeof renderNode === "function" ? (
          renderNode({
            node,
            depth,
            collapsed,
            checked,
            indeterminate,
            isLastChild: !(node[childrenField] as TreeNodeType<T>[])?.length,
            tree: controller,
            elementProps,
            selected,
          })
        ) : (
          <div onClick={handleNodeClick}>
            <span>{node[textField] as string}</span>
          </div>
        )}
        {getGuideLines(
          depth,
          node,
          idField as keyof T & string,
          style.height as string,
        )}
      </div>
    </div>
  );
}
export default TreeNode;
