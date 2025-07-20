import { Checkbox } from "@Checkbox/Checkbox";
import Tree from "@Tree/Tree";
import { data, TreeData } from "@dummy";

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
  return (
    <main>
      <br /> <br /> <br /> <br />
      {/* <div style={{ display: "flex", gap: 10 }}>
        <Tree<TreeData>
          data={data}
          textField="label"
          childrenField="children"
          idField="id"
        />
      </div>
      <br /> <br /> <br /> <br /> */}
      <div style={{ display: "flex", gap: 10 }}>
        <Tree<TreeData>
          data={data}
          textField="label"
          childrenField="children"
          idField="id"
          renderNode={({
            node,
            expanded,
            hasChildren,
            selected,
            elementProps,
            depth,
          }) => {
            return (
              <div {...elementProps} className={classes.container}>
                {hasChildren && <ArrowIcon expanded={expanded} />}

                <h5>{depth}</h5>
                <Checkbox size="sm" defaultChecked={false} />
                {node.label}
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
