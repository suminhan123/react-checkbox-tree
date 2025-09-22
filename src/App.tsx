import { Checkbox } from "@Checkbox/Checkbox";
import Tree from "@Tree/Tree";
import { data, TreeData } from "@dummy";
import { useTree } from "@Tree/useTree";
import classes from "./App.module.css";
import { getTreeExpandedState } from "@Tree/get-tree-expanded-state/getTreeExpandedState";

export function ArrowIcon({ expanded }: { expanded: boolean }) {
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
    initialCheckedState: ["node-01556", "node-01772", "node-01778"],
    initialExpandedState: getTreeExpandedState<TreeData>(
      data,
      ["node-01556", "node-01778", "node-01772"],
      "subnode",
      "id",
    ),
  });

  return (
    <div>
      <div style={{ display: "flex", gap: 10, paddingTop: "20px" }}>
        <Tree<TreeData>
          data={data}
          textField="name"
          childrenField="subnode"
          idField="id"
          tree={tree}
          height={800}
          renderNode={({ node, indeterminate, checked, collapsed }) => {
            return (
              <div className={classes.container}>
                {node.subnode.length > 0 && (
                  <div onClick={() => tree.toggleExpanded(node)}>
                    <ArrowIcon expanded={!collapsed} />
                  </div>
                )}

                <Checkbox
                  size="sm"
                  checked={indeterminate ? "indeterminate" : checked}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      tree.checkNode(node);
                    } else {
                      tree.uncheckNode(node);
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
    </div>
  );
}

export default App;
