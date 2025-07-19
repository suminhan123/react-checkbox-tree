export type TreeData = {
  label: string;
  id: number;
  children?: TreeData[];
};
export const data = [
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
