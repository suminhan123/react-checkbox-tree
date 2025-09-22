import { JSX } from "react";
import { TreeNodeType } from "./Tree";

import styles from "./TreeGuides.module.css";

const TREE_ITEM_HEIGHT = 30;
const DEFAULT_PADDING = 24;
function getContainerStyle(renderCount: number, height: number) {
  const containerHeight = renderCount * TREE_ITEM_HEIGHT;
  if (containerHeight < 400) {
    return { height: containerHeight };
  }
  return { height };
}

function getStyle(
  depth: number,
  style: React.CSSProperties,
): React.CSSProperties {
  const itemPadding = depth === 1 ? DEFAULT_PADDING : DEFAULT_PADDING * depth;
  return {
    ...style,
    paddingLeft: `${itemPadding}px`,
    width: `calc(100% - ${itemPadding}px)`,
  };
}

function getGuideLines<T>(
  depth: number,
  data: TreeNodeType<T>,
  idField: keyof T & string,
  height: string,
) {
  const itemPadding = depth === 1 ? DEFAULT_PADDING : DEFAULT_PADDING * depth;
  const verticalGuideLinesLeft =
    depth === 1 ? DEFAULT_PADDING : itemPadding - DEFAULT_PADDING;
  // First level nodes won't have guide lines
  if (depth !== 1) {
    // This array will contain all of the guidelines
    // generated for the current item.
    const guideLines: JSX.Element[] = [];

    const horizontalGuideLineStyles = {
      left: `-${DEFAULT_PADDING}px`,
    };

    // Each Item shall have one horizontal guide
    guideLines.push(
      <div
        key={`${data[idField]}-tree-item__guide-x-key`}
        className={styles.guideX}
        style={horizontalGuideLineStyles}
      />,
    );

    const verticalGuideLines: JSX.Element[] = [];

    const verticalGuideLineStyles = {
      height,
    };

    data.parents?.forEach((parentNode: TreeNodeType<T>, index: number) => {
      // For each parent node of the current node, there's a validation to check
      // if that parent node is the last child of its group and its depth.
      if (parentNode && !parentNode.isLastChild && parentNode.depth !== 1) {
        const guideLineStyle = {
          ...verticalGuideLineStyles,
          right: DEFAULT_PADDING * (data.depth - parentNode.depth),
        };

        verticalGuideLines.push(
          <div
            key={`${data[idField]}-tree-item__guide-y-key-${index}`}
            className={styles.vertGuide}
            style={guideLineStyle}
          />,
        );
      }
    });

    // Each Item shall have one vertical guide besides
    // the ones from its parents' validation.
    verticalGuideLines.push(
      <div
        key={`${data[idField]}-tree-item__guide-y-key`}
        className={styles.vertGuide}
        style={{ ...verticalGuideLineStyles, right: 0 }}
      />,
    );

    const verticalGuidesWrapperStyle: React.CSSProperties = {
      left: `-${verticalGuideLinesLeft}px`,
      width: verticalGuideLinesLeft - DEFAULT_PADDING,
      height: `${TREE_ITEM_HEIGHT}px`,
    };

    guideLines.push(
      <div
        key={`${data[idField]}-tree-item__y-guides-key`}
        className={styles.vertGuidesContainer}
        style={verticalGuidesWrapperStyle}
      >
        {verticalGuideLines}
      </div>,
    );

    return guideLines;
  }
}

export { TREE_ITEM_HEIGHT, getContainerStyle, getStyle, getGuideLines };
