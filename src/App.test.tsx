// app.test.tsx
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("app test", () => {
  test("jest title 테스트", () => {
    render(<App />);

    const titleText = screen.getByTestId("title-text");
    expect(titleText).not.toBeNull();
  });
});
