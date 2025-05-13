import { SvgIcons } from "./svg";

interface CheckboxIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  indeterminate?: boolean | undefined;
  size?: string | number;
}

export function CheckboxIcon({
  indeterminate,
  size,
  style,
  ...rest
}: CheckboxIconProps) {
  const _style = size ? { width: size, height: size, ...style } : style;
  if (indeterminate) {
    return <SvgIcons.indeterminate style={_style} {...rest} />;
  }
  return <SvgIcons.check style={_style} {...rest} />;
}
