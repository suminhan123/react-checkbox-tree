// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FilterPropsRes<T extends Record<string, any>> = {
  [Key in keyof T]-?: T[Key] extends undefined ? never : T[Key];
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function filterProps<T extends Record<string, any>>(props: T) {
  return Object.keys(props).reduce<FilterPropsRes<T>>((acc, key: keyof T) => {
    if (props[key] !== undefined) {
      acc[key] = props[key];
    }
    return acc;
  }, {} as FilterPropsRes<T>);
}

export function useProps<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, any>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  K extends Record<string, any>,
>(component: string, defaultProps: K, props: T): T {
  // TODO: theme 추가해 component 에 따른 default style 및 props 설정
  return {
    ...defaultProps,
    ...filterProps<T>(props),
  };
}
