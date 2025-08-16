import { Checkbox } from "@Checkbox/Checkbox";
import Tree from "@Tree/Tree";
import { data, TreeData } from "@dummy";
import { useTree } from "@Tree/useTree";
import { getTreeExpandedState } from "@Tree/get-tree-expanded-state/getTreeExpandedState";

import classes from "./App.module.css";

function ArrowIcon({ expanded }: { expanded: boolean }) {
  return (
    <>
      {expanded ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <span style={{ marginRight: 5 }}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </>
  );
}

function App() {
  const tree = useTree<TreeData>({
    idField: "id",
    childrenField: "subnode",
    initialExpandedState: getTreeExpandedState(data, [], "subnode", "id"),
    initialCheckedState: [],
  });
  return (
    <main>
      <br /> <br /> <br /> <br />
      <div style={{ display: "flex", gap: 10 }}>
        <Tree<TreeData>
          data={data}
          textField="name"
          childrenField="subnode"
          idField="id"
          tree={tree}
          renderNode={({ node, expanded, hasChildren, elementProps }) => {
            return (
              <div {...elementProps} className={classes.container}>
                {hasChildren && <ArrowIcon expanded={expanded} />}

                <Checkbox
                  size="sm"
                  checked={
                    tree.isNodeIndeterminate(String(node.id))
                      ? "indeterminate"
                      : tree.isNodeChecked(String(node.id))
                  }
                  onCheckedChange={(checked) => {
                    if (checked) {
                      tree.checkNode(String(node.id));
                    } else {
                      tree.uncheckNode(String(node.id));
                    }
                  }}
                  onClick={(e) => e.stopPropagation()}
                />
                {node.name}
              </div>
            );
          }}
        />
      </div>
      <br /> <br /> <br /> <br />
    </main>
  );
}

export default App;
