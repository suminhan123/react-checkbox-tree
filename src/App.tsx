import { useState } from "react";

import { Checkbox, CheckedState } from "@Checkbox/Checkbox";
import Tree from "@Tree/Tree";

function App() {
  const [checked, setChecked] = useState<CheckedState>("indeterminate");

  type TreeData = {
    label: string;
    id: number;
    children?: TreeData[];
  };
  const data = [
    {
      label: "root1",
      id: 1,
      children: [
        {
          label: "child 1",
          id: 2,
          children: [
            {
              label: "child 1.1",
              id: 4,
              children: [
                { label: "child 1.1.1", id: 5 },
                { label: "child 1.1.2", id: 6 },
              ],
            },
          ],
        },
        {
          label: "child 2",
          id: 3,
        },
      ],
    },
    {
      label: "root2",
      id: 7,
      children: [
        {
          label: "child 3",
          id: 8,
          children: [
            {
              label: "child 1.1",
              id: 9,
              children: [
                { label: "child 1.1.1", id: 10 },
                { label: "child 1.1.2", id: 11 },
              ],
            },
          ],
        },
        {
          label: "child 4",
          id: 12,
        },
      ],
    },
  ];
  return (
    <main>
      <div style={{ display: "flex", gap: 10 }}>
        <Tree<TreeData>
          data={data}
          textField="label"
          childrenField="children"
          idField="id"
        />
      </div>
      <br /> <br /> <br /> <br />
      <div style={{ display: "flex", gap: 10 }}>
        <Tree<TreeData>
          data={data}
          textField="label"
          childrenField="children"
          idField="id"
          renderNode={({ node, hasChildren }) => {
            return (
              <div>
                {hasChildren && <span style={{ marginRight: 5 }}>▶</span>}
                {node.label}
              </div>
            );
          }}
        />
      </div>
      <br /> <br /> <br /> <br />
      <h5>uncontrolled checkbox</h5>
      <div style={{ display: "flex", gap: 10 }}>
        <Checkbox defaultChecked={false} onCheckedChange={() => {}} />
        <Checkbox defaultChecked={"indeterminate"} onCheckedChange={() => {}} />
        <Checkbox defaultChecked={true} disabled onCheckedChange={() => {}} />
      </div>
      <br />
      <br />
      <h5>controlled checkbox</h5>
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <button
        onClick={() => {
          setChecked((prev) => {
            if (prev === "indeterminate") return true;
            if (prev === true) return false;
            return "indeterminate";
          });
        }}
      >
        toggle
      </button>
    </main>
  );
}

export default App;
