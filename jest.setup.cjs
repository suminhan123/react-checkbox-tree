require("@testing-library/jest-dom");

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

jest.mock("react-virtualized-auto-sizer", () => {
  return function AutoSizer({ children }) {
    return children({ height: 800, width: 800 });
  };
});
