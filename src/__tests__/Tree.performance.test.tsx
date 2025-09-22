import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { act, useEffect } from "react";
import "@testing-library/jest-dom";
import Tree from "../Tree/Tree";
import { useTree } from "../Tree/useTree";
import { data, TreeData } from "../dummy";
import { Checkbox } from "@Checkbox/Checkbox";
import { getTreeExpandedState } from "@Tree/get-tree-expanded-state/getTreeExpandedState";

// 성능 측정을 위한 유틸리티 함수
const measureTime = (fn: () => void): number => {
  const start = performance.now();
  fn();
  const end = performance.now();
  return end - start;
};

// 비동기 상태 변경을 기다리는 함수
const waitForStateUpdate = async (): Promise<void> => {
  await waitFor(() => {});
};

describe("Tree Component Performance Tests", () => {
  let TestTreeComponent: React.FC;
  let treeController: ReturnType<typeof useTree<TreeData>>;

  beforeEach(() => {
    // 테스트용 Tree 컴포넌트 생성
    TestTreeComponent = () => {
      treeController = useTree<TreeData>({
        idField: "id",
        childrenField: "subnode",
        initialExpandedState: [],
        initialCheckedState: [],
      });

      return (
        <div style={{ display: "flex", gap: 10, paddingTop: "20px" }}>
          <Tree<TreeData>
            data={data}
            textField="name"
            childrenField="subnode"
            idField="id"
            tree={treeController}
            height={800}
            renderNode={({
              node,
              collapsed,
              checked,
              indeterminate,
              tree,
              elementProps,
            }) => {
              const id = String(node.id);
              return (
                <div
                  {...elementProps}
                  role="treeitem"
                  aria-expanded={
                    node.subnode.length > 0 ? collapsed : undefined
                  }
                  data-testid={`node-${id}`}
                >
                  {node.subnode.length > 0 && (
                    <span
                      data-testid={`arrow-${id}`}
                      data-expanded={collapsed ? "false" : "true"}
                    >
                      {collapsed ? "▶" : "▼"}
                    </span>
                  )}
                  <span data-testid={`checkbox-${id}`}>
                    <Checkbox
                      size="sm"
                      aria-label={`check ${node.name}`}
                      checked={indeterminate ? "indeterminate" : checked}
                      onCheckedChange={(checked) => {
                        if (checked) tree.checkNode(node);
                        else tree.uncheckNode(node);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </span>
                  <span data-testid={`text-${id}`}>{node.name}</span>
                </div>
              );
            }}
          />
        </div>
      );
    };
  });

  describe("Root Node Click Performance", () => {
    test("Tree 의 root 노드 체크박스 클릭 시간을 측정한다", async () => {
      render(<TestTreeComponent />);

      const rootNode = screen.getByTestId("node-node-00001");
      expect(rootNode).toBeInTheDocument();
      const rootArrow = screen.getByTestId("arrow-node-00001");
      expect(rootArrow).toHaveAttribute("data-expanded", "false");

      const rootCheckbox = screen
        .getByTestId("checkbox-node-00001")
        .querySelector("input");
      expect(rootCheckbox).toBeInTheDocument();

      let clickTime: number;
      let stateUpdateTime: number;

      await act(async () => {
        clickTime = measureTime(() => {
          fireEvent.click(rootCheckbox!);
        });
      });

      await act(async () => {
        const startTime = performance.now();
        await waitForStateUpdate();
        stateUpdateTime = performance.now() - startTime;
      });

      await waitFor(() => {
        expect(rootCheckbox).toBeChecked();
      });

      console.log(`체크박스 클릭 시간: ${clickTime!.toFixed(2)}ms`);
      console.log(`상태 반영 시간: ${stateUpdateTime!.toFixed(2)}ms`);
      console.log(
        `총 처리 시간: ${(clickTime! + stateUpdateTime!).toFixed(2)}ms`,
      );

      expect(stateUpdateTime!).toBeLessThan(100);
    });

    test("initial expand 및 check state 있는 Tree 의 root 노드 체크박스 클릭 시간을 측정한다", async () => {
      let treeControllerWithInitial: ReturnType<typeof useTree<TreeData>>;
      const TestTreeComponentWithInitial: React.FC = () => {
        treeControllerWithInitial = useTree<TreeData>({
          idField: "id",
          childrenField: "subnode",
          initialExpandedState: getTreeExpandedState(
            data,
            ["node-01556"],
            "subnode",
            "id",
          ),
          initialCheckedState: ["node-01556"],
        });

        return (
          <Tree<TreeData>
            data={data}
            textField="name"
            childrenField="subnode"
            idField="id"
            tree={treeControllerWithInitial}
            renderNode={({
              node,
              collapsed,
              checked,
              indeterminate,
              elementProps,
              tree,
            }) => {
              const id = String(node.id);
              return (
                <div
                  {...elementProps}
                  role="treeitem"
                  aria-expanded={
                    node.subnode.length > 0 ? collapsed : undefined
                  }
                  data-testid={`node-${id}`}
                >
                  {node.subnode.length > 0 && (
                    <span
                      data-testid={`arrow-${id}`}
                      data-expanded={collapsed ? "false" : "true"}
                    >
                      {collapsed ? "▶" : "▼"}
                    </span>
                  )}
                  <span data-testid={`checkbox-${id}`}>
                    <Checkbox
                      size="sm"
                      aria-label={`check ${node.name}`}
                      checked={indeterminate ? "indeterminate" : checked}
                      onCheckedChange={(checked) => {
                        if (checked) tree.checkNode(node);
                        else tree.uncheckNode(node);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </span>
                  <span data-testid={`text-${id}`}>{node.name}</span>
                </div>
              );
            }}
          />
        );
      };

      render(<TestTreeComponentWithInitial />);

      const rootNode = screen.getByTestId("node-node-00001");
      expect(rootNode).toBeInTheDocument();

      const rootArrow = screen.getByTestId("arrow-node-00001");
      expect(rootArrow).toHaveAttribute("data-expanded", "true");

      const rootCheckbox = screen
        .getByTestId("checkbox-node-00001")
        .querySelector("input");
      expect(rootCheckbox).toBeInTheDocument();

      let clickTime: number;
      let stateUpdateTime: number;

      await act(async () => {
        clickTime = measureTime(() => {
          fireEvent.click(rootCheckbox!);
        });
      });

      await act(async () => {
        const startTime = performance.now();
        await waitForStateUpdate();
        stateUpdateTime = performance.now() - startTime;
      });

      await waitFor(() => {
        expect(rootCheckbox).toBeChecked();
      });

      console.log(
        `initial 있는 체크박스 클릭 시간: ${clickTime!.toFixed(2)}ms`,
      );
      console.log(
        `initial 있는 상태 반영 시간: ${stateUpdateTime!.toFixed(2)}ms`,
      );
      console.log(
        `initial 있는 총 처리 시간: ${(clickTime! + stateUpdateTime!).toFixed(
          2,
        )}ms`,
      );
    });
  });
});
