import { Checkbox, CheckedState } from "@Checkbox/Checkbox";
import { useState } from "react";

function App() {
  const [checked, setChecked] = useState<CheckedState>("indeterminate");
  const handleTestChecked = () => {
    setChecked((prev) => {
      if (prev === "indeterminate") return true;
      if (prev === true) return false;
      return "indeterminate";
    });
  };
  return (
    <main>
      <h5>uncontrolled checkbox</h5>
      <div style={{ display: "flex", gap: 10 }}>
        <Checkbox defaultChecked={false} onCheckedChange={() => {}} />
        <Checkbox defaultChecked={"indeterminate"} onCheckedChange={() => {}} />
        <Checkbox defaultChecked={true} disabled onCheckedChange={() => {}} />
      </div>
      <br />
      <h5>styled checkbox</h5>
      <div style={{ display: "flex", gap: 10 }}>
        <Checkbox size="lg" defaultChecked={false} />
        <Checkbox size="sm" defaultChecked={"indeterminate"} />
        <Checkbox size="md" radius="md" defaultChecked={"indeterminate"} />
        <Checkbox size="md" radius="sm" defaultChecked={"indeterminate"} />
        <Checkbox
          size="lg"
          radius="lg"
          color="red"
          defaultChecked={"indeterminate"}
        />
        <Checkbox defaultChecked={true} disabled />
      </div>
      <br />
      <h5>controlled checkbox</h5>
      <Checkbox checked={checked} onCheckedChange={setChecked} />
      <button onClick={handleTestChecked}>toggle</button>
    </main>
  );
}

export default App;
